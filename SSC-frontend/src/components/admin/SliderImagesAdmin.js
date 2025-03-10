import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AddAdmin.module.css'; // Importing CSS module
import { useNavigate } from 'react-router-dom';
import useForm from './useForm';
import cllg from "../../images/Social3.jpeg"
const SliderImagesAdmin = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [values, handleChange] = useForm({
        club: '',
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
        formData.append('image', values.image);

        const endpoints = {
            spc: 'http://localhost:5000/api/sliderImages/spc',
            ku: 'http://localhost:5000/api/sliderImages/ku',
            hhc: 'http://localhost:5000/api/sliderImages/hhc',
            sahyog: 'http://localhost:5000/api/sliderImages/sahyog',
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
                setMessage('Slider Image uploaded successfully!');
                handleChange({ target: { name: 'club', value: '' } });
                handleChange({ target: { name: 'image', value: null } });
            }
        } catch (err) {
            console.error('Error adding slider image:', err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.adminTable}>
                
                {/* Left Column - Image */}
                <div className={styles.imageContainer}>
                    <img src={cllg} alt="Slider Upload" className={styles.adminImage} />
                </div>

                {/* Right Column - Form */}
                <div className={styles.formContainer}>
                    <h2 className={styles.title}>Add Slider Image</h2>
                    <form onSubmit={handleSubmit}>
                        <select name='club' value={values.club} onChange={handleChange} className={styles.inputField} required>
                            <option value="">Select Club</option>
                            <option value="spc">SPC</option>
                            <option value="ku">KU</option>
                            <option value="hhc">HHC</option>
                            <option value="sahyog">Sahyog</option>
                        </select>
                        <input name='image' className={styles.inputField} type="file" onChange={(e) => handleChange({ target: { name: 'image', value: e.target.files[0] } })} required />
                        <button type="submit" className={styles.submitBtn}>Add Slider Image</button>
                    </form>
                    {message && <p className={styles.successMessage}>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default SliderImagesAdmin;
