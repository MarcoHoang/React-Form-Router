import React, { useState } from "react";
import "./App.css";

const initialFormState = {
  email: "",
  password: "",
};

export default function App() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        if (!/^[a-zA-Z0-9+_-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
          return "Email is not valid.";
        }
        return null;

      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) {
          return "Password must be at least 6 characters.";
        }
        if (!/^[a-zA-Z0-9!@#$%^&+=._-]+$/.test(value)) {
          return "Password contains invalid characters.";
        }
        return null;

      default:
        return null;
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });

    const errorMessage = validateField(name, value);
    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    let hasError = false;
    const newErrors = {};

    for (const field in form) {
      const errorMessage = validateField(field, form[field]);
      if (errorMessage) {
        hasError = true;
        newErrors[field] = errorMessage;
      }
    }
    
    setErrors(newErrors);

    if (hasError) {
      alert("Please fill out all the fields!!!");
    } else {
      alert("Login successfully!!!");
      setForm(initialFormState);
      setErrors({});
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} noValidate>
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
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}