import React, { useState } from 'react';
import styles from './DonateUs.module.css'; // Importing the new CSS module
import { loadStripe } from '@stripe/stripe-js';
import donationImage from '../images/donation.png'; // Update the correct path

const DonateUs = () => {
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.location.href = "https://buy.stripe.com/test_bIY4gXaXI2D34lW8wx";

    const stripe = await loadStripe("pk_test_51O3juaSFUzG000TSlpVlPO1QSykakaeTkfxpdn2Hfsu9BPO0zhA7W7tIWRKVt6xzOIWx7MMzb3Cedxh4S1KBELsn00NAGy31cm");
    
    const body = { amount: 1000 };
    const headers = { "Content-type": "application/json" };

    try {
      const response = await fetch("http://localhost:5000/api/create-checkout-session", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });
      const session = await response.json();
      console.log('Session:', session);
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error('Stripe Error:', result.error);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Left Column - Image */}
        <div className={styles.imageContainer}>
          <img src={donationImage} alt="Donate" className={styles.image} />
        </div>

        {/* Right Column - Donation Form */}
        <div className={styles.formContainer}>
          <h1 className={styles.headerText}>Helping Hands, Changing Lives.</h1>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Your Name"
            className={styles.inputField}
            type="text"
          />
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            className={styles.inputField}
            type="number"
          />
          <button onClick={handleSubmit} type="submit" className={styles.submitBtn}>
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateUs;
