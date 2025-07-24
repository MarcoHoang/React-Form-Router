import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const employees = [
  { id: 1, name: "Hoàng", age: 20 },
  { id: 2, name: "Marco", age: 25 },
  { id: 3, name: "Reus", age: 22 },
];

function EmployeeList() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  useEffect(() => {
    if (!user) {
      alert("Please login to access this page.");
      navigate('/');
    }
  }, [user, navigate]);

  const handleDetailClick = (employee) => {
    // Chuyển sang trang chi tiết và truyền toàn bộ object employee
    navigate('/employee-detail', { state: { employee: employee } });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="employee-page">
      <h1>Employee List</h1>
      <p>Welcome, {user.email}!</p>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.age}</td>
              <td>
                <button className="btn-detail" onClick={() => handleDetailClick(emp)}>
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="logout-button">Logout</Link>
    </div>
  );
}

export default EmployeeList;