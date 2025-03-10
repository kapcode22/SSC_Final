import React, { useState } from 'react';
import styles from './AddAdmin.module.css'; // Importing styles from CSS module
import axios from 'axios';
import { toast } from "react-hot-toast";
import cllg from "../../images/IITBHU.jpeg"
const AddAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const adminData = { username, password, status, type };

        try {
            const res = await axios.post('http://localhost:5000/admin/add', adminData);
            console.log(res.data);
            toast.success("Admin Added Successfully!");
        } catch (err) {
            console.log(err);
            toast.error("Failed to Add Admin!");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.adminTable}>
                
                {/* Left Column - Image */}
                <div className={styles.imageContainer}>
                    <img src={cllg} alt="Admin Panel" className={styles.adminImage} />
                </div>

                {/* Right Column - Form */}
                <div className={styles.formContainer}>
                    <h2 className={styles.title}>Add Admin</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='User Name'
                            className={styles.inputField}
                            type="text"
                            required
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            className={styles.inputField}
                            type="password"
                            required
                        />
                        
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={styles.inputField}
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="BLOCK">BLOCK</option>
                            <option value="DELETE">DELETE</option>
                        </select>

                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className={styles.inputField}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="SUBADMIN">SUBADMIN</option>
                        </select>

                        <button type="submit" className={styles.submitBtn}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAdmin;
