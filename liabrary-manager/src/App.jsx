import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './App.css';

function App() {
  // State để lưu trữ danh sách các cuốn sách
  const [books, setBooks] = useState([]);
  // State để lưu trữ thông tin sách đang được chọn để chỉnh sửa
  const [selectedBook, setSelectedBook] = useState(null);

  // Giá trị khởi tạo cho form. Sẽ thay đổi tùy thuộc vào việc
  // chúng ta đang "thêm mới" hay "chỉnh sửa"
  const initialValues = {
    title: selectedBook ? selectedBook.title : '',
    quantity: selectedBook ? selectedBook.quantity : ''
  };

  // Hàm validate cho Formik
  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Required';
    }

    if (!values.quantity) {
      errors.quantity = 'Required';
    } else if (!/^\d+$/.test(values.quantity)) {
      // Kiểm tra xem có phải là số hay không
      errors.quantity = 'Quantity must be a number';
    } else if (parseInt(values.quantity) < 1) {
      errors.quantity = 'Quantity must be at least 1';
    }
    
    return errors;
  };
  
  // Hàm xử lý khi submit form (cả thêm mới và cập nhật)
  const handleSubmit = (values, { resetForm }) => {
    if (selectedBook) {
      // --- Logic CẬP NHẬT ---
      setBooks(books.map(book => 
        book.id === selectedBook.id ? { ...book, ...values } : book
      ));
      alert('Updated successfully!');
    } else {
      // --- Logic THÊM MỚI ---
      // Tạo một cuốn sách mới với ID duy nhất (sử dụng timestamp)
      const newBook = { id: Date.now(), ...values };
      setBooks([...books, newBook]);
      alert('Added successfully!');
    }
    
    // Reset form và trạng thái đang chọn
    setSelectedBook(null);
    resetForm();
  };

  // Hàm xử lý khi nhấn nút "Edit"
  const handleEdit = (book) => {
    setSelectedBook(book);
  };

  // Hàm xử lý khi nhấn nút "Delete"
  const handleDelete = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(book => book.id !== bookId));
    }
  };

  return (
    <div className="container">
      <h1>Book Management</h1>

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
        // Prop này rất quan trọng: nó cho phép Formik reset lại giá trị
        // khi `initialValues` thay đổi (khi chúng ta nhấn "Edit")
        enableReinitialize 
      >
        <Form>
          <div className="form-group">
            <label htmlFor="title">Tiêu đề</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage name="title" component="p" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Số lượng</label>
            <Field type="text" id="quantity" name="quantity" />
            <ErrorMessage name="quantity" component="p" className="error-message" />
          </div>

          <button type="submit">
            {selectedBook ? 'Update' : 'Submit'}
          </button>
        </Form>
      </Formik>

      <hr />

      <h2>Book List</h2>
      <table>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Số lượng</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.quantity}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(book)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No books available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;