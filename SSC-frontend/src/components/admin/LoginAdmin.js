import React, { useState, useContext } from 'react';
import lstyle from "./LoginAdmin.module.css"; 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from "../../index";  // ✅ Import Context
import { toast } from "react-hot-toast";  // ✅ Toast for feedback

const LoginAdmin = () => {
    const navigate = useNavigate();
    const { setIsAuthorized, setUser } = useContext(Context); // ✅ Get Context
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = async (e) => {
        e.preventDefault(); 
        
        const adminData = { username, password };

        try {
            const res = await axios.post('http://localhost:5000/admin/login', adminData, {
                withCredentials: true,  // ✅ Ensure credentials are sent
            });

            console.log("Login Response:", res.data);

            // ✅ Store data in Context & LocalStorage
            localStorage.setItem('type', res.data.type);
            localStorage.setItem('token', res.data.token);
            
            setIsAuthorized(true);  // ✅ Update global state
            setUser({ role: res.data.type });  // ✅ Set user role

            toast.success("Login Successful!");
            navigate('/'); 
        } catch (err) {
            console.log("Login Error:", err.response?.data?.message || err);
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className={lstyle.main}>
            <div className={lstyle.container}>
                <div className={lstyle['login-box']}>
                    <h2>Login</h2>
                    <form onSubmit={handleClick}>
                        <div className={lstyle['input-box']}>
                            <input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='User Name'
                                className="custom-input"
                                type="text"
                                required
                            />
                            <label>User name</label>
                        </div>
                        <div className={lstyle['input-box']}>
                            <input
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                className="custom-input"
                                type="password"
                                required
                            />
                            <label>Password</label>
                        </div>
                       
                        <button type="submit" className={lstyle.btn}>Login</button>
                        <div className={lstyle['signup-link']}>
                            <Link to="/home">Logout</Link>
                        </div>
                    </form>
                </div>
                {/* Span elements for decorative purposes */}
                {[...Array(50)].map((_, i) => (
                    <span key={i} style={{ '--i': i }}></span>
                ))}
            </div>
        </div>
    );
};

export default LoginAdmin;
