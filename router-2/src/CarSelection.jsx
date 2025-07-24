import React from 'react';
import { useNavigate } from 'react-router-dom';

// Dữ liệu giả lập về các loại xe
const cars = [
  { id: 1, name: 'Toyota Camry' },
  { id: 2, name: 'Honda Civic' },
  { id: 3, name: 'VinFast VF8' },
  { id: 4, name: 'Ford Ranger' }
];

function CarSelection() {
  // 1. Khởi tạo hook useNavigate
  const navigate = useNavigate();

  // 2. Hàm xử lý sự kiện khi người dùng chọn một giá trị trong dropdown
  const handleCarChange = (event) => {
    const selectedCarId = event.target.value;
    
    // Chỉ điều hướng khi người dùng chọn một chiếc xe cụ thể (không phải option mặc định)
    if (selectedCarId) {
      // 3. Sử dụng navigate để chuyển hướng đến trang chi tiết với ID được chọn
      navigate(`/car/${selectedCarId}`);
    }
  };

  return (
    <div>
      <h1>Chọn loại xe bạn yêu thích</h1>
      <select onChange={handleCarChange} className="car-select">
        <option value="">-- Vui lòng chọn --</option>
        {cars.map(car => (
          <option key={car.id} value={car.id}>
            {car.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CarSelection;