import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';

import Button from '../Button';
import FormInputField from '../FormInputField/FormInputField';
import CurrencyFormatter from '../CurrencyFormatter';

import * as styles from './OrderSummary.module.css';
import { db } from '../firebase/config';
import firebase from '../firebase/config'; // Adjust the path to where you configure your Firebase app


const OrderSummary = ({itemNames, totalCost,itemSize,itemQuantity, itemType, subtotal}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode , setPincode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const amount = 50000;
  const currency = 'INR';
  const receiptId = 'qwsaq1';
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [couponCode, setCouponCode] = useState('');
const [couponMessage, setCouponMessage] = useState('');
const [discountAmount, setDiscountAmount] = useState(0); // Holds the amount discounted by the coupon

const applyCoupon = async () => {
  setIsLoading(true);
  setCouponMessage('');

  const couponRef = db.collection('coupens').doc(couponCode.toUpperCase());
  const couponSnapshot = await couponRef.get();

  if (couponSnapshot.exists && !couponSnapshot.data().used) {
    const couponData = couponSnapshot.data();
    // Assuming couponData.discount represents the percentage discount
    const discountPercentage = couponData.discount;
    // Calculate the discount amount based on the percentage
    const calculatedDiscountAmount = (subtotal * discountPercentage) / 100;
    setDiscountAmount(calculatedDiscountAmount);
    setCouponMessage(`Coupon applied: ${discountPercentage}% off`);

    // Subtract the calculated discount from the total cost
    // Note: Make sure to adjust your state or props accordingly if you are tracking the final total elsewhere
    // totalCost = subtotal - calculatedDiscountAmount; (Handle this according to your state management)

    // Update the Firestore document to mark the coupon as used
   //await couponRef.update({ used: true });
  } else {
    setCouponMessage('Invalid or already used coupon code.');
  }
  setIsLoading(false);
};



  const handleSubscribe = async (jsonRes) => {
    setShowSuccessModal(true); 
    // Validate form inputs
    if (!name || !email || !phone || !address || !pincode) {
      setError('All fields are required');
      return;
    }
    setIsLoading(true); // Start loading
    try {
      await db.collection('dd_product').add({ name, email, phone,address,pincode,itemNames, totalCost,itemSize,itemQuantity, itemType,jsonRes });
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setPincode('');
      setMessage('Thanks for shopping , You will get the email of your order within 15 minutes.');
      setError(''); // Clear the error message on success
    } catch (error) {
      console.error('Error adding email: ', error);
      setMessage('Failed to subscribe. Try again later.');
    }
    setIsLoading(false); // Stop loading regardless of the result
  };

  const paymentHandler = async () => {
    if (!name || !email || !phone || !address || !pincode) {
      setError('Please fill in all fields before checking out.');
      return; // Exit the function early if any field is empty
    }

    setIsLoading(true);

    const amount = (totalCost -discountAmount) *100;
    console.log(amount)
    try {
     
      const response = await fetch('https://serversidedd.onrender.com/order', {
        method: 'POST',
        body: JSON.stringify({
        amount,
          currency,
          receipt: receiptId,
          notes: [
            name, email, phone
          ]
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const order = await response.json();
      console.log(order);

      var options = {
        key: 'rzp_live_TeRhknmBrnM8KE',
        amount,
        currency,
        name: 'Deepak Dua',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        order_id: order.id,
        handler: async function (response) {
          const body = {
            ...response,
          };

          const validateRes = await fetch('https://serversidedd.onrender.com/order/validate', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const jsonRes = await validateRes.json();
          console.log(jsonRes);
          handleSubscribe(jsonRes);
          
        },
        // redirect_url: 'https://www.google.com/',
        callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
        prefill: {
          name: 'Deepak Dua',
          email: 'beformofficial@gmail.com',
          contact: '9680046943',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error in paymentHandler:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadRazorpayScript = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;

        script.onload = () => {
          setRazorpayLoaded(true);
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading Razorpay script:', error);
      }
    };

    // Call the function to load the script
    loadRazorpayScript();
  }, []);


  return (
    <div className={styles.root}>
      {showSuccessModal && <SuccessModal onClose={() => {
  setShowSuccessModal(false);
  setTimeout(() => {
    navigate('/'); // Redirect to home page after a delay
  }, 2000); // 2000 milliseconds delay
}} />}
      <div className={styles.orderSummary}>
        <span className={styles.title}>order summary</span>
        <div className={styles.calculationContainer}>
          <div className={styles.labelContainer}>
            <span>Subtotal</span>
            <span>
              <CurrencyFormatter amount={subtotal} appendZero />
            </span>
          </div>
          {/* <div className={styles.labelContainer}>
            <span>Shipping</span>
            <span>---</span>
          </div>
          <div className={styles.labelContainer}>
            <span>Tax</span>
            <span>
              <CurrencyFormatter amount={0} appendZero />
            </span>
          </div> */}
        </div>
        <div className={styles.couponContainer}>
          <span>Name</span>
          <FormInputField
            value={name}
            handleChange={(_, name) => setName(name)}
            id={'couponInput'}
            type='text'
          />
          <span>Email</span>
          <FormInputField
            value={email}
            handleChange={(_,email) => setEmail(email)}
            id={'couponInput'}
            type='email'
          />
          <span>Phone No.</span>
          <FormInputField
            value={phone}
            handleChange={(_,phone) => setPhone(phone)}
            id={'couponInput'}
            type='number'
          />
          <span>Address</span>
          <FormInputField
            value={address}
            handleChange={(_,address) => setAddress(address)}
            id={'couponInput'}
            type='text'
          />
          <span>Pincode</span>
          <FormInputField
            value={pincode}
            handleChange={(_,pincode) => setPincode(pincode)}
            id={'couponInput'}
            type='number'
          />
  <FormInputField
    label="Coupon Code"
    value={couponCode}
    handleChange={(_, newCouponCode) => setCouponCode(newCouponCode)}
    id={'couponInput'}
    type='text'
  />
  <Button onClick={applyCoupon} level={'secondary'}>Apply Coupon</Button>
  {couponMessage && <div className={styles.couponMessage}>{couponMessage}</div>}
        </div>
        <br />
        <div className={styles.deliveryCharge}>
  Delivery Charge: Rs. 45
</div>
<div className={styles.totalContainer}>
  {discountAmount > 0 && (
    <div>
      <span>Original Total: </span>
      <CurrencyFormatter amount={totalCost} appendZero />
    </div>
  )}
  <div>
    <span>Total: </span>
    <CurrencyFormatter amount={totalCost - discountAmount} appendZero />
  </div>
</div>

      </div>
      <div className={styles.actionContainer}>
        <Button
      
      //  onClick={handleSubscribe}  
          onClick={paymentHandler}
          fullWidth
          level={'primary'}
        >
           {isLoading ? 'Payment is Processing...' : 'Buy now!'} {/* Change text based on loading state */}
        </Button>
        <h3>{message}</h3>
        {error && <h3>{error}</h3>}
        <div className={styles.linkContainer}>
          <Link to={'/'}>CONTINUE SHOPPING</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

const SuccessModal = ({ onClose }) => (
  <div style={{
    position: 'fixed', /* Stay in place */
    zIndex: 1, /* Sit on top */
    left: 0,
    top: 0,
    width: '100%', /* Full width */
    height: '100%', /* Full height */
    overflow: 'auto', /* Enable scroll if needed */
    backgroundColor: 'rgba(0,0,0,0.4)', /* Black w/ opacity */
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <div style={{
      backgroundColor: '#fefefe',
      margin: 'auto',
      padding: '20px',
      border: '1px solid #888',
      width: '80%',
      maxWidth: '500px'
    }}>
       <span style={{ float: 'right', fontSize: '25px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => {
    onClose();
    navigate('/'); // Redirect to home page
  }}>&times;</span>
      <p>Your payment was successful!</p>
      <p>You will get the email of your order within 15 minutes</p>
    </div>
  </div>
);

