import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CarSelection from './CarSelection';
import CarDetails from './CarDetails';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Route cho trang chọn xe (trang chủ) */}
          <Route path="/" element={<CarSelection />} />

          {/* 
            Route cho trang chi tiết.
            - :carId là một "dynamic segment" (đoạn động). 
            - Nó có nghĩa là bất kỳ URL nào có dạng /car/1, /car/2, /car/abc,... sẽ khớp với route này.
            - Giá trị thực tế (1, 2, abc) sẽ được lưu vào params với key là 'carId'.
          */}
          <Route path="/car/:carId" element={<CarDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;