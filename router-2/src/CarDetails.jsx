import React from 'react';
import { useParams, NavLink } from 'react-router-dom';

// Dữ liệu giả lập (để có thể hiển thị tên xe nếu muốn)
const cars = [
  { id: 1, name: 'Toyota Camry' },
  { id: 2, name: 'Honda Civic' },
  { id: 3, name: 'VinFast VF8' },
  { id: 4, name: 'Ford Ranger' }
];

function CarDetails() {
  // 1. Sử dụng hook useParams để lấy các tham số từ URL
  const params = useParams();
  
  // 2. Lấy giá trị 'carId' từ object params. 
  // Tên 'carId' phải khớp với tên bạn đặt trong Route (ví dụ: path="/car/:carId")
  const carId = params.carId;

  // (Tùy chọn) Tìm thông tin xe dựa trên ID
  const selectedCar = cars.find(car => car.id === parseInt(carId));

  return (
    <div>
      <h1>Chi tiết xe</h1>
      <h2>ID của loại xe được chọn là: {carId}</h2>
      
      {selectedCar ? (
        <h3>Tên xe: {selectedCar.name}</h3>
      ) : (
        <h3>Không tìm thấy thông tin xe.</h3>
      )}

      <NavLink to="/" className="back-link">Quay lại trang chọn xe</NavLink>
    </div>
  );
}

export default CarDetails;