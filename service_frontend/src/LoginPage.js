import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import lockIcon from './lock.png';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'; // Import axios to make HTTP requests
import { useUser } from './UserContext'; // Import useUser


function LoginPage() {
    const navigate = useNavigate();
    const { setProfile } = useUser(); // Use setProfile from context
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (user && user.access_token) {
            console.log(user.access_token)
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    const userProfile = res.data;
                    setProfile(userProfile); // Store user profile information in context

                    // Save user email in local storage for later use
                    localStorage.setItem('userEmail', userProfile.email);

                    const postData = {
                        email: userProfile.email,
                        username: userProfile.name,
                        phone: 'xxx' // Placeholder phone number
                    };

                    return axios.post('http://localhost:3000/user/', postData);
                })
                .then((response) => {
                    // Make POST request to update user status
                    const statusData = {
                        userEmail: localStorage.getItem("userEmail")
                    };
    
                    return axios.post('http://localhost:3000/user/status', statusData);
                })
                .then(() => {
                    navigate('/logs'); // Navigate after the post request is successful
                })
                .catch((err) => {
                    console.log(err);

                    navigate('/logs');
                });
        }
    }, [user, navigate, setProfile]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser({ access_token: codeResponse.access_token });
        },
        onError: (error) => alert('Login Failed: ' + error)
    });



    const handleSubmit = (event) => {
        event.preventDefault();
        // Your login logic for username/password
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <button type="button" onClick={login} className="login-button">
                    <img src={lockIcon} alt="Lock" className="icon-lock" />
                    Log in with Google
                </button>
                <button type="button" onClick={handleSignUp} className="signup-button">Sign Up</button>
            </form>

        </div>
    );
}

export default LoginPage;
