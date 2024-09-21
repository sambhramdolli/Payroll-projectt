import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import './Employeelogin.css';
import googleLogo from '../../assets/icons8-google-logo-48.png';
import yourLogo from '../../assets/image (2).png';
import { HiOutlineMailOpen } from "react-icons/hi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const EmployeeLoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLoginSuccess = (response) => {
    console.log('Custom Login Success:', response);
    navigate('/employee');
  };

  const handleLoginFailure = (response) => {
    console.log('Custom Login Failed:', response);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === 'user@example.com' && password === 'password123') {
      navigate('/employee');
    } else {
      setErrorMessage('Wrong password. Try again or click Forgot password to reset it.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-page">
      <div className="logo-side">
        <img src={yourLogo} alt="Your Logo" className="full-page-logo" />
      </div>
      <div className="form-side">
        <div className="custom-login-container">
          <form className="custom-login-form" onSubmit={handleSubmit}>
            <h1 className="log-in">Sign in to Employee Portal</h1>
            {errorMessage && <p className="custom-error-message">{errorMessage}</p>}
            
            <div className="custom-form-group">
              <label className="email-emp" htmlFor="email">Email</label>
              <div className="custom-input-container">
                <HiOutlineMailOpen className="custom-input-icon" />
                <input type="email" id="email" name="email" required />
              </div>
            </div>

            <div className="custom-form-group">
              <label className="email-emp" htmlFor="password">Password</label>
              <div className="custom-input-container">
                <input 
                  type={passwordVisible ? "text" : "password"} 
                  id="password" 
                  name="password" 
                  required 
                />
                <span className="custom-input-icon" onClick={togglePasswordVisibility}>
                  {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
            </div>

            <div className="custom-form-group remember-forgot-group">
              
              <button type="button" className="custom-forgot-password-button">Forgot password</button>
            </div>

            <button type="submit" className="custom-sign-in-button">LOGIN</button>

            {/* OR divider */}
            <div className="or-divider">
              <span className="line"></span>
              <span className="or-text">OR</span>
              <span className="line"></span>
            </div>

            {/* Google login */}
            <div className="custom-button-group">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                  <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="custom-google">
                    <img src={googleLogo} alt="Google Logo" className="custom-google-logo" />
                    Sign in with Google
                  </button>
                )}
              />
            </div>
          </form>
          
          {/* Admin Login Box */}
          <div className="admin-login-box">
            <p>Are you an Admin? <a href="/login">Sign In Here</a></p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLoginPage;
