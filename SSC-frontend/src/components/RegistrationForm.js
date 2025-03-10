import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import rstyles from './RegistrationForm.module.css';

const RegistrationForm = () => {
  // state and hooks 
  const { club, event } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: ''
  });
  const [error, setError] = useState('');


  // function for handlechange omn input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  // funtion for handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    //try-catch block
    try {
      // api api requset based on paremeter 
      await axios.post(`https://ssc-final-backend.onrender.com/api/registration/${club}/${event}`, formData);
      alert('Registration successful!');
    } catch (err) {
      console.error('Error registering:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };



  return (
    <div>
      <div className={rstyles.heading}>
        <h2>Register for {event} in {club}</h2>
      </div>
      <div className={rstyles.registrationForm}>

        <div className={rstyles.formContainer}>
          {error && <p className={rstyles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="branch"
              placeholder="Branch"
              value={formData.branch}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default RegistrationForm;
