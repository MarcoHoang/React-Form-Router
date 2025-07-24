import React from 'react';
import { useNavigate } from 'react-router-dom';

// Dữ liệu giả lập về các loại xe, có thể thêm thông tin khác
const cars = [
  { id: 1, name: 'Toyota Camry', price: '750.000.000 VND', color: 'Đen' },
  { id: 2, name: 'Honda Civic', price: '800.000.000 VND', color: 'Trắng' },
  { id: 3, name: 'VinFast VF8', price: '1.129.000.000 VND', color: 'Xanh' },
  { id: 4, name: 'Ford Ranger', price: '965.000.000 VND', color: 'Cam' }
];

function CarSelection() {
  const navigate = useNavigate();

  const handleCarChange = (event) => {
    const selectedCarId = event.target.value;
    
    if (selectedCarId) {
      // 1. Tìm toàn bộ object của chiếc xe đã được chọn
      const selectedCarObject = cars.find(car => car.id === parseInt(selectedCarId));

      // 2. Sử dụng navigate để chuyển hướng.
      // - Đối số thứ nhất là đường dẫn đến trang mới.
      // - Đối số thứ hai là một object, với key là `state` và value là dữ liệu bạn muốn gửi.
      navigate('/car-details', { state: selectedCarObject });
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