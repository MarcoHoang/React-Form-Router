import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import EmployeeDetail from './components/EmployeeDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employee" element={<EmployeeList />} />
          <Route path="/employee-detail" element={<EmployeeDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;