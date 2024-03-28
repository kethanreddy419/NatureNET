import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import lockIcon from './lock.png';
import { GoogleLogin } from '@react-oauth/google';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username, password);
        // You should add your logic for handling username/password login here
        // And navigate to '/logs' if login is successful
    };

    const handleSignUp = () => {
        navigate('/signup'); // Navigates to sign up page
    };

    const handleGoogleLoginSuccess = (response) => {
        console.log('Login Success:', response);
        navigate('/logs'); // Navigates to the logs page upon successful Google login
    };

    const handleGoogleLoginError = (error) => {
        console.error('Login Failed:', error);
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                // You might want to specify additional props as per your requirements
                />
                <div className="input-group">
                    <label htmlFor="username" className="input-label">Name</label>
                    <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="input-field" />
                </div>
                <div className="input-group">
                    <label htmlFor="password" className="input-label">Password</label>
                    <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
                </div>
                <button type="submit" className="login-button">
                    <img src={lockIcon} alt="Lock" className="icon-lock" />
                    Log in
                </button>
                <button type="button" onClick={handleSignUp} className="signup-button">Sign Up</button>
            </form>
        </div>
    );
}

export default LoginPage;
