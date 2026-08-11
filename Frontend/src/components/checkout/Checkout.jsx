import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks';
import cartService from '../../services/cartService';
import DeliveryInfo from './DeliveryInfo';
import PaymentMethod from './PaymentMethod';
import CartSummary from '../cart/CartSummary';
import Loading from '../common/Loading';
import styles from '../cart/Cart.module.css';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    pincode: '',
  });

  const handlePlaceOrder = async () => {
    if (!address.fullName || !address.phone || !address.street || !address.pincode) {
      alert('Please fill in all delivery details.');
      return;
    }

    setLoading(true);
    try {
      const res = await cartService.checkout({
        deliveryAddress: address,
        paymentMethod,
      });

      if (res.success) {
        clearCart();
        navigate('/orders', { state: { newRentalId: res.rentalId } });
      } else {
        alert(res.message || 'Checkout failed');
      }
    } catch (err) {
      alert('An error occurred during checkout');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="Processing your rental order..." fullScreen />;

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.pageHeader}>Checkout</h2>
      <div className={styles.checkoutLayout}>
        <div className={styles.checkoutFormArea}>
          <DeliveryInfo addressData={address} onChange={setAddress} />
          <PaymentMethod selectedMethod={paymentMethod} onSelectMethod={setPaymentMethod} />
        </div>
        <div className={styles.summaryArea}>
          <CartSummary cart={cart} onCheckout={handlePlaceOrder} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;