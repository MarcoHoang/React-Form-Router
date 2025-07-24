import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EmployeeDetail() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const employee = location.state?.employee;

  useEffect(() => {
    if (!employee) {
      alert("No employee data found. Returning to the list.");
      navigate('/employee'); 
    }
  }, [employee, navigate]);
  
  const handleGoBack = () => {
    navigate(-1); 
  };

  if (!employee) {
    return null;
  }

  return (
    <div className="detail-page">
      <h1>Employee Detail</h1>
      <div className="detail-card">
        <p><strong>ID:</strong> {employee.id}</p>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Age:</strong> {employee.age}</p>
      </div>
      <button onClick={handleGoBack} className="back-button">
        Back to Employee List
      </button>
    </div>
  );
}

export default EmployeeDetail;