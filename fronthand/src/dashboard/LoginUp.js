import React, { useState } from 'react';
import '../dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Util';

function LoginUp() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;
    setLoginInfo(copyloginInfo);
  };

  const handleLoginUpSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError('Email and Password are required');
    }

    try {
      const url = `${process.env.REACT_APP_Backhand_URL}/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();

      const { success, message, error, jwtToken, name, _id } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token:', jwtToken);
        localStorage.setItem('loggedInUser', name);
        localStorage.setItem('UserId', _id);
        setTimeout(() => {
          navigate('/dashboard/HomeIndex');
        }, 3000);
      } else if (error) {
        let detail = error?.details[0]?.message||'An error occurred.';
        handleError(detail);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="signup-container">
      <div className="welcome-section">
        <h1>Welcome Back!</h1>
        <p>To stay connected with us, please log in with your personal info</p>
       <Link to="../dashboard/SignUp" className="signin-btn">Sign Up</Link>
      </div>

      <div className="form-section">
        <h1>Log In</h1>
        <form onSubmit={handleLoginUpSubmit} className="signup-form">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={loginInfo.email}
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginInfo.password}
          />
          <button className="form-btn">Log In</button>
          <span id="login-link">
            Don’t have an account? <Link to="../dashboard/SignUp">Sign up</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginUp;
