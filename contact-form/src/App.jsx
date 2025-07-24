import React from 'react';
import { useFormik } from 'formik';
import './App.css';

// Hàm validate được Formik sử dụng để kiểm tra lỗi
const validate = (values) => {
  const errors = {};

  // Validate Name
  if (!values.name) {
    errors.name = 'Required';
  }

  // Validate Email
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[a-zA-Z0-9+_-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
    // Thông báo lỗi cụ thể hơn cho định dạng email sẽ tốt cho trải nghiệm người dùng
    errors.email = 'Invalid email address';
  }

  // Validate Phone
  if (!values.phone) {
    errors.phone = 'Required';
  }

  return errors;
};

function App() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      alert('Add contact successfully!!!');
      console.log(values); // In dữ liệu ra console để kiểm tra
      resetForm();
    },
  });

  return (
    <div className="contact-container">
      <h1>Contact Form</h1>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={formik.touched.name && formik.errors.name ? 'input-error' : ''}
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="error-message">{formik.errors.name}</p>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="error-message">{formik.errors.email}</p>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className={formik.touched.phone && formik.errors.phone ? 'input-error' : ''}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <p className="error-message">{formik.errors.phone}</p>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;