import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AddAdmin.module.css'; // Importing CSS module
import { useNavigate } from 'react-router-dom';
import cllg from "../../images/Social2.jpeg"
const UpdatesAdmin = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', desc);
        formData.append('image', image);

        try {
            const res = await axios.post('http://localhost:5000/api/services', formData, {
                headers: {
                    'authorization': localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data.code === 403 && res.data.message === 'Token Expired') {
                localStorage.removeItem('token');
                navigate('/');
            } else {
                setMessage('Update added successfully!');
                setTitle('');
                setDesc('');
                setImage(null);
            }
        } catch (err) {
            console.error('Error adding update:', err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.adminTable}>
                
                {/* Left Column - Image */}
                <div className={styles.imageContainer}>
                    <img src={cllg} alt="Updates" className={styles.adminImage} />
                </div>

                {/* Right Column - Form */}
                <div className={styles.formContainer}>
                    <h2 className={styles.title}>Add Update</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className={styles.inputField}
                            required
                        />
                        <input
                            type="text"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Description"
                            className={styles.inputField}
                            required
                        />
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className={styles.inputField}
                            required
                        />
                        <button type="submit" className={styles.submitBtn}>Add Update</button>
                    </form>
                    {message && <p className={styles.successMessage}>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default UpdatesAdmin;
