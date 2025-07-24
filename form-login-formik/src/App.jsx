import React from "react";
import { useFormik } from "formik";
import "./App.css";

// Hàm validate bây giờ sẽ được Formik quản lý
const validate = (values) => {
  const errors = {};

  // Validate Email
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[a-zA-Z0-9+_-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
    errors.email = "Email is not valid.";
  }

  // Validate Password (Thêm vào để form hoàn chỉnh)
  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

export default function App() {
  // Sử dụng hook useFormik để quản lý toàn bộ form
  const formik = useFormik({
    // 1. Giá trị khởi tạo cho form
    initialValues: {
      email: "",
      password: "",
    },

    // 2. Hàm validate
    validate,

    // 3. Hàm xử lý khi submit (chỉ được gọi khi form hợp lệ)
    onSubmit: (values, { resetForm }) => {
      alert("Login successfully!!!");
      resetForm(); // Tự động reset form sau khi submit thành công
    },
  });

  return (
    <div className="login-container">
      <h1>Login</h1>
      {/* Formik cung cấp sẵn hàm handleSubmit */}
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="custom-input">
          <label>Email</label>
          <input
            type="email"
            name="email"
            // Các thuộc tính này được cung cấp bởi Formik
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // Quan trọng để validate khi người dùng rời khỏi ô input
            value={formik.values.email}
            // Thêm class lỗi nếu trường đã được chạm vào VÀ có lỗi
            className={formik.touched.email && formik.errors.email ? "input-error" : ""}
          />
          {/* Hiển thị lỗi nếu trường đã được chạm vào VÀ có lỗi */}
          {formik.touched.email && formik.errors.email ? (
            <p className="error-message">{formik.errors.email}</p>
          ) : null}
        </div>

        <div className="custom-input">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={formik.touched.password && formik.errors.password ? "input-error" : ""}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="error-message">{formik.errors.password}</p>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}