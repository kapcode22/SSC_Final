import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ListAdmin.css";
import { useNavigate } from 'react-router-dom';

const ListAdmin = () => {
    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('type') !== 'ADMIN') {
            navigate('/admin/login');
        }
    }, [navigate]);

    useEffect(() => {
        axios.get('https://ssc-final-backend.onrender.com/admin/admins')
            .then((res) => {
                console.log(res.data);
                setAdmins(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleAddAdmin = () => {
        navigate('/admin/add');
    };

    console.log(admins); // Check if admins state has data

    return (
        <div className='admin-container'>
            <button className='add-admin-button' onClick={handleAddAdmin}>ADD Admin</button>
            <table className='admin-table'>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Type</th>
                        <th>Status</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {admins.length > 0 && admins.map((adminItem, adminIndex) => (
                        <tr key={adminIndex}>
                            <td>{adminItem.username}</td>
                            <td>{adminItem.password}</td>
                            <td>{adminItem.type}</td>
                            <td>{adminItem.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListAdmin;
