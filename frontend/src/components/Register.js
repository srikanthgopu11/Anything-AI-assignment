import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            
            await axios.post('https://task-manager-api-wkgn.onrender.com/api/v1/auth/register', { 
                email, 
                password, 
                role 
            });
            setMessage("Registration Successful! Redirecting...");
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setMessage(err.response?.data?.error || "Registration Failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create Account</h2>
                {message && <p style={{ color: message.includes('Successful') ? 'green' : 'red', textAlign: 'center' }}>{message}</p>}
                <form onSubmit={handleRegister}>
                    <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    <select onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User Role</option>
                        <option value="admin">Admin Role</option>
                    </select>
                    <button type="submit">Register</button>
                </form>
                <p style={{textAlign: 'center'}}>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;