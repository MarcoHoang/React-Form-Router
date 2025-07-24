import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';

function CarDetails() {
  // 1. Sử dụng hook useLocation
  const location = useLocation();
  
  // 2. Lấy dữ liệu từ thuộc tính `state` của object location.
  const selectedCar = location.state;

  // 3. Xử lý trường hợp người dùng truy cập trực tiếp vào trang này mà không có dữ liệu
  if (!selectedCar) {
    return (
      <div>
        <h2>Vui lòng chọn một chiếc xe trước.</h2>
        <NavLink to="/" className="back-link">Quay lại trang chọn xe</NavLink>
      </div>
    );
  }

  // 4. Hiển thị thông tin từ object đã nhận được
  return (
    <div>
      <h1>Chi tiết xe</h1>
      <h2>Tên xe: {selectedCar.name}</h2>
      <p><strong>ID:</strong> {selectedCar.id}</p>
      <p><strong>Giá:</strong> {selectedCar.price}</p>
      <p><strong>Màu sắc:</strong> {selectedCar.color}</p>
      
      <NavLink to="/" className="back-link">Quay lại trang chọn xe</NavLink>
    </div>
  );
}

export default CarDetails;