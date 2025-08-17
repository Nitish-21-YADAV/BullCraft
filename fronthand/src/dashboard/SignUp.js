import React, { useState } from 'react';
import '../dashboard.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Util';

function SignUp() {
    const navigate = useNavigate();
    const [signInfo, setSignInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = signInfo;
        if (!name || !email || !password) {
            return handleError('Name, Email, and Password are required');
        }
        try {
            const url = `${process.env.REACT_APP_Backhand_URL}/sign`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signInfo) 
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/dashboard/UserForm');
                }, 3000);
            } else {
                handleError(error?.details?.[0]?.message || message);
            }
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="signup-container">
            <div className="welcome-section">
                <h2>Welcome Back!</h2>
                <p>To keep connected with us, please login with your personal info</p>
                <Link to="../dashboard/LoginUp" className="signin-btn">Sign In</Link>
            </div>
            <div className="form-section">
                <h2>Create Account</h2>
                <form className="signup-form" onSubmit={handleSignUpSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={signInfo.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={signInfo.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={signInfo.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <span id="login-link">
                    Already have an account? 
                     <Link to="../dashboard/LoginUp">Sign up</Link>
                
                </span>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SignUp;
