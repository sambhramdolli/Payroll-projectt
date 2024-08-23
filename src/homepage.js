import React from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css'; // Ensure this matches your actual file name
import img1 from './assets/S.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  const handleEmployeeLoginClick = () => {
    navigate('/Employeelogin');
  };

  return (
    <main className="homepage-container">
      <div className="homepage-box-container">
        <div className="homepage-logo-container">
          <img src={img1} alt="Company Logo" className="homepage-logo" />
        </div>
        <h1 className="homepage-title">SYLIQON SOFTWARE MANAGEMENT</h1>
        <button className="homepage-button1" onClick={handleButtonClick}>LOGIN as Admin</button>
        <button className="homepage-button2" onClick={handleEmployeeLoginClick}>LOGIN as Employee</button>
      </div>
    </main>
  );
}

export default HomePage;