import React, { createContext, useState, useCallback, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import cartService from '../services/cartService';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  // 1. Refresh Cart
  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart({ items: [] });
      return;
    }

    setLoading(true);
    try {
      const res = await cartService.getCart();
      if (res.success) {
        setCart(res.data || { items: [] });
      }
    } catch (error) {
      console.error('Cart refresh error:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Effect to automatically refresh cart on login/logout state change
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  // 2. Add to Cart
  const addToCart = useCallback(async (bookId, rentalDuration = 7) => {
    if (!isAuthenticated) {
      toast.warn('Please login to add items to cart');
      return;
    }

    try {
      const res = await cartService.addToCart(bookId, rentalDuration);
      if (res.success) {
        setCart(res.data || { items: [] });
        toast.success('Added to cart');
      } else {
        toast.error(res.message || 'Could not add to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Something went wrong while adding to cart');
    }
  }, [isAuthenticated]);

  // 3. Remove from Cart
  const removeFromCart = useCallback(async (bookId) => {
    if (!isAuthenticated) {
      toast.warn('Please login to modify cart');
      return;
    }

    try {
      const res = await cartService.removeFromCart(bookId);
      if (res.success) {
        setCart(res.data || { items: [] });
        toast.info('Removed from cart');
      } else {
        toast.error(res.message || 'Could not remove from cart');
      }
    } catch (error) {
      console.error('Remove from cart error:', error);
      toast.error('Something went wrong while removing from cart');
    }
  }, [isAuthenticated]);

  // 4. Clear Cart
  const clearCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart({ items: [] });
      return;
    }

    try {
      const res = await cartService.clearCart();
      if (res.success) {
        setCart(res.data || { items: [] });
        toast.info('Cart cleared');
      } else {
        toast.error(res.message || 'Could not clear cart');
      }
    } catch (error) {
      console.error('Clear cart error:', error);
      toast.error('Something went wrong while clearing cart');
    }
  }, [isAuthenticated]);

  const itemCount = cart.items?.length || 0;

  const value = {
    cart,
    loading,
    itemCount,
    addToCart,
    removeFromCart,
    clearCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;