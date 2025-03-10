import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AddAdmin.module.css'; // Importing styles from CSS module
import { useNavigate } from 'react-router-dom';
import useForm from './useForm';
import cllg from "../../images/events.avif"
const EventsAdmin = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [values, handleChange] = useForm({
        club: '',
        title: '',
        desc: '',
        image: null 
    });

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const key in values) {
            formData.append(key, values[key]);
        }

        const endpoints = {
            spc: 'http://localhost:5000/api/events/spc',
            ku: 'http://localhost:5000/api/events/ku',
            hhc: 'http://localhost:5000/api/events/hhc',
            sahyog: 'http://localhost:5000/api/events/sahyog',
        };

        const endpoint = endpoints[values.club];

        if (!endpoint) {
            console.log('Invalid club type');
            return;
        }

        try {
            const res = await axios.post(endpoint, formData, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(res.data);
            if (res.data.message === 'No token provided.' || res.data.message === 'Failed to authenticate token.') {
                localStorage.removeItem('token');
                navigate('/');
            } else {
                setMessage('Event uploaded successfully!');
                handleChange({ target: { name: 'club', value: '' } });
                handleChange({ target: { name: 'title', value: '' } });
                handleChange({ target: { name: 'desc', value: '' } });
                handleChange({ target: { name: 'image', value: null } });
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.adminTable}>
                
                {/* Left Column - Image */}
                <div className={styles.imageContainer}>
                    <img src={cllg} alt="Event" className={styles.adminImage} />
                </div>

                {/* Right Column - Form */}
                <div className={styles.formContainer}>
                    <h2 className={styles.title}>Add Event</h2>
                    <form onSubmit={handleSubmit}>
                        <select name='club' value={values.club} onChange={handleChange} className={styles.inputField} required>
                            <option value="">Select Club</option>
                            <option value="spc">SPC</option>
                            <option value="ku">KU</option>
                            <option value="hhc">HHC</option>
                            <option value="sahyog">Sahyog</option>
                        </select>
                        <input name='title' value={values.title} onChange={handleChange} placeholder='Title' className={styles.inputField} required />
                        <input name='desc' value={values.desc} onChange={handleChange} placeholder='Description' className={styles.inputField} required />
                        <input name='image' className={styles.inputField} type="file" onChange={(e) => handleChange({ target: { name: 'image', value: e.target.files[0] } })} required />
                        <button type="submit" className={styles.submitBtn}>Add Event</button>
                    </form>
                    {message && <p className={styles.successMessage}>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default EventsAdmin;
