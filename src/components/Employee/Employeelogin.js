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
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

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
    <div className="custom-login-page">
      <div className="custom-login-container">
        <form className="custom-login-form" onSubmit={handleSubmit}>
          <div className="custom-form-logo">
            <img src={yourLogo} alt="Your Logo" className="custom-your-logo" />
          </div>
          <h1 className='log-in'>Employee Login</h1> 
          {errorMessage && <p className="custom-error-message">{errorMessage}</p>}
          
          <div className="custom-form-group">
            <label className='email-emp' htmlFor="email">Email:</label>
            <div className="custom-input-container">
              <HiOutlineMailOpen className="custom-input-icon" />
              <input type="email" id="email" name="email" required />
            </div>
          </div>
          
          <div className="custom-form-group">
            <label className='email-emp' htmlFor="password">Password:</label>
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
          
          <button type="button" className="custom-forgot-password-button">Forgot password?</button>
          <button type="submit" className="custom-sign-in-button">Login</button>
          
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
      </div>
    </div>
  );
}

export default EmployeeLoginPage;