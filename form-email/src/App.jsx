import React from 'react';
import { useFormik } from 'formik';
import './App.css';

// Hàm validate cho Formik
const validate = (values) => {
  const errors = {};

  // Validate To
  if (!values.to) {
    errors.to = 'Required';
  } else if (!/^[a-zA-Z0-9+_-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.to)) {
    errors.to = 'Invalid email address';
  }

  // Validate Title
  if (!values.title) {
    errors.title = 'Required';
  }

  // Validate Message
  if (!values.message) {
    errors.message = 'Required';
  }
  
  return errors;
};

function App() {
  const formik = useFormik({
    initialValues: {
      to: '',
      title: '',
      message: '',
      attachments: null // Sẽ lưu trữ đối tượng File
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      // Trong ứng dụng thực tế, bạn sẽ gửi 'values' (bao gồm cả file) đến server
      // bằng cách sử dụng FormData.
      console.log('Form data:', values);
      alert('Sent successfully!!!');
      resetForm();
    },
  });

  return (
    <div className="email-container">
      <h1>Compose Email</h1>
      <form onSubmit={formik.handleSubmit} noValidate>
        {/* Trường "To" */}
        <div className="form-group">
          <label htmlFor="to">To</label>
          <input
            type="email"
            id="to"
            name="to"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.to}
            className={formik.touched.to && formik.errors.to ? 'input-error' : ''}
          />
          {formik.touched.to && formik.errors.to ? (
            <p className="error-message">{formik.errors.to}</p>
          ) : null}
        </div>

        {/* Trường "Title" */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className={formik.touched.title && formik.errors.title ? 'input-error' : ''}
          />
          {formik.touched.title && formik.errors.title ? (
            <p className="error-message">{formik.errors.title}</p>
          ) : null}
        </div>

        {/* Trường "Message" */}
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="8"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className={formik.touched.message && formik.errors.message ? 'input-error' : ''}
          />
          {formik.touched.message && formik.errors.message ? (
            <p className="error-message">{formik.errors.message}</p>
          ) : null}
        </div>

        {/* Trường "Attachments" */}
        <div className="form-group">
          <label htmlFor="attachments">Attachments</label>
          <input
            id="attachments"
            name="attachments"
            type="file"
            // Xử lý upload file đặc biệt, không dùng formik.handleChange
            onChange={(event) => {
              // setFieldValue là hàm của Formik để cập nhật giá trị của một trường cụ thể
              formik.setFieldValue("attachments", event.currentTarget.files[0]);
            }}
          />
          {/* (Tùy chọn) Hiển thị tên file đã chọn */}
          {formik.values.attachments && (
            <div className="file-info">
              Selected file: {formik.values.attachments.name}
            </div>
          )}
        </div>

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;