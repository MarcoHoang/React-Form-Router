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
            Không cần tham số động vì dữ liệu được truyền qua 'state', không qua URL.
          */}
          <Route path="/car-details" element={<CarDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;