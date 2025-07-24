import React, { useState } from "react";
import "./App.css";

const initialFormState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function App() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // Hàm validate cho từng trường, trả về message lỗi hoặc null nếu hợp lệ
  const validateField = (name, value, currentForm) => {
    switch (name) {
      case "username":
        if (!value) return "Username is required";
        if (!/^[a-zA-Z]{2,}$/.test(value)) {
          return "Username must be at least 2 characters and contain only letters.";
        }
        return null;

      case "email":
        if (!value) return "Email is required";
        // Regex theo yêu cầu: name@domain.tld
        // name: a-z, A-Z, 0-9, +, -
        // domain: a-z, A-Z, 0-9, -
        if (!/^[a-zA-Z0-9+_-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
          return "Email is not valid.";
        }
        return null;

      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) {
          return "Password must be at least 6 characters.";
        }
        // Regex cho các kí tự cho phép
        if (!/^[a-zA-Z0-9!@#$%^&+=._-]+$/.test(value)) {
          return "Password contains invalid characters.";
        }
        return null;

      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== currentForm.password) {
          return "Passwords do not match.";
        }
        return null;
        
      default:
        return null;
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    
    // Cập nhật giá trị form
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    // Validate trường vừa thay đổi
    const errorMessage = validateField(name, value, updatedForm);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
    
    // Nếu người dùng thay đổi password, validate lại cả confirmPassword
    if (name === "password" && form.confirmPassword) {
      const confirmPasswordError = validateField("confirmPassword", form.confirmPassword, updatedForm);
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: confirmPasswordError,
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    let hasError = false;
    const newErrors = {};

    // Validate tất cả các trường một lần cuối trước khi submit
    for (const field in form) {
      const errorMessage = validateField(field, form[field], form);
      if (errorMessage) {
        hasError = true;
        newErrors[field] = errorMessage;
      }
    }
    
    setErrors(newErrors);

    if (hasError) {
      alert("Please fill out all the fields!!!");
    } else {
      alert("Sign up successfully!!!");
      setForm(initialFormState); // Reset form
      setErrors({}); // Xóa hết lỗi
    }
  }

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="custom-input">
          <label>Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className={errors.username ? "input-error" : ""}
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>

        <div className="custom-input">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="custom-input">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="custom-input">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "input-error" : ""}
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}