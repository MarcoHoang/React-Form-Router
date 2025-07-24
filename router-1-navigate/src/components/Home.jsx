import React, { useEffect } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user;

  useEffect(() => {
    if (!user) {
      alert("Please login to access this page.");
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="home-page">
      <h1>Welcome to the Home Page!</h1>
      <p>You are logged in as:</p>
      <h2>{user.email}</h2>
      <NavLink to="/" className="logout-button">Logout</NavLink>
    </div>
  );
}

export default Home;