import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AddAdmin.module.css'; // Importing CSS module
import { useNavigate } from 'react-router-dom';
import useForm from './useForm';
import cllg from "../../images/social4.jpeg"
const PostHoldersAdmin = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [values, handleChange] = useForm({
        club: '',
        name: '',
        post: '',
        instaLink: '',
        facebookLink: '',
        linkdinLink: '',
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
            spc: 'https://ssc-final-backend.onrender.com/api/postHolders/spc',
            ku: 'https://ssc-final-backend.onrender.com/api/postHolders/ku',
            hhc: 'https://ssc-final-backend.onrender.com/api/postHolders/hhc',
            sahyog: 'https://ssc-final-backend.onrender.com/api/postHolders/sahyog',
            council: 'https://ssc-final-backend.onrender.com/api/postHolders/council'
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
                setMessage('Post Holder added successfully!');
                handleChange({ target: { name: 'club', value: '' } });
                handleChange({ target: { name: 'name', value: '' } });
                handleChange({ target: { name: 'post', value: '' } });
                handleChange({ target: { name: 'instaLink', value: '' } });
                handleChange({ target: { name: 'facebookLink', value: '' } });
                handleChange({ target: { name: 'linkdinLink', value: '' } });
                handleChange({ target: { name: 'image', value: null } });
            }
        } catch (err) {
            console.error('Error adding post holder:', err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.adminTable}>
                
                {/* Left Column - Image */}
                <div className={styles.imageContainer}>
                    <img src={cllg} alt="Post Holder" className={styles.adminImage} />
                </div>

                {/* Right Column - Form */}
                <div className={styles.formContainer}>
                    <h2 className={styles.title}>Add Post Holder</h2>
                    <form onSubmit={handleSubmit}>
                        <select name='club' value={values.club} onChange={handleChange} className={styles.inputField} required>
                            <option value="">Select Club</option>
                            <option value="spc">SPC</option>
                            <option value="ku">KU</option>
                            <option value="hhc">HHC</option>
                            <option value="sahyog">Sahyog</option>
                            <option value="council">Council</option>
                        </select>
                        <input name='name' value={values.name} onChange={handleChange} placeholder='Name' className={styles.inputField} required />
                        <input name='post' value={values.post} onChange={handleChange} placeholder='Post' className={styles.inputField} required />
                        <input name='instaLink' value={values.instaLink} onChange={handleChange} placeholder='Instagram Link' className={styles.inputField} />
                        <input name='facebookLink' value={values.facebookLink} onChange={handleChange} placeholder='Facebook Link' className={styles.inputField} />
                        <input name='linkdinLink' value={values.linkdinLink} onChange={handleChange} placeholder='LinkedIn Link' className={styles.inputField} />
                        <input name='image' className={styles.inputField} type="file" onChange={(e) => handleChange({ target: { name: 'image', value: e.target.files[0] } })} required />
                        <button type="submit" className={styles.submitBtn}>Add Post Holder</button>
                    </form>
                    {message && <p className={styles.successMessage}>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default PostHoldersAdmin;
