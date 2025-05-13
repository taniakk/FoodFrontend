import { createContext, useEffect, useState } from "react";
import axios from "axios";

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  console.log(count)

  const userDetail = localStorage?.getItem("userInfo");
  const authentication = JSON?.parse(userDetail);

  async function fetchCartData() {
    try {
      const response = await axios.get("https://foodbackend-hfrx.onrender.com/getUserCart", {
        headers: { Authorization: `Bearer ${authentication?.token}` },
      });
  
      const data = response.data;
      console.log("Cart data fetched:", data);
  
      if (Array.isArray(data)) {
        setCart(data);
        setCount(data.length);
      } else if (typeof data === 'object' && data.message) {
        // If backend sends a message like "Cart is empty"
        setCart([]);
        setCount(0);
      } else {
        // Unknown format, default to empty
        setCart([]);
        setCount(0);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setCart([]);
      setCount(0);
    }
  }
  

  async function incrementItem(id) {
    try {
      // Find the current item
      const currentItem = cart.find(item => item._id === id);
      if (!currentItem) return;
      
      const newQuantity = (currentItem.quantity || 0) + 1;
      
      // Optimistically update the cart
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        )
      );
      
      // Make the server request
      await axios.patch(`https://foodbackend-hfrx.onrender.com/increment/${id}`, null, {
        headers: { Authorization: `Bearer ${authentication?.token}` },
      });
      
      // If needed, refresh the cart data to ensure sync with server
      // Comment this out if you're confident in the optimistic update
      // await fetchCartData();
    } catch (error) {
      console.error("Error incrementing item quantity:", error);
      // Roll back by fetching fresh data
      fetchCartData();
    }
  }
  
  async function decrementItem(id) {
    try {
      // Find the current item
      const currentItem = cart.find(item => item._id === id);
      if (!currentItem) return;
      
      // Don't decrement below 1
      if ((currentItem.quantity || 0) <= 1) return;
      
      const newQuantity = (currentItem.quantity || 0) - 1;
      
      // Optimistically update the cart
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        )
      );
      
      // Make the server request
      await axios.patch(`https://foodbackend-hfrx.onrender.com/decrement/${id}`, null, {
        headers: { Authorization: `Bearer ${authentication?.token}` },
      });
      
      // If needed, refresh the cart data to ensure sync with server
      // Comment this out if you're confident in the optimistic update
      // await fetchCartData();
    } catch (error) {
      console.error("Error decrementing item quantity:", error);
      // Roll back by fetching fresh data
      fetchCartData();
    }
  }
    
  async function removeItem(id) {
    try {
      // Optimistically remove the item
      setCart((prevCart) => prevCart.filter((item) => item._id !== id));
      setCount((prevCount) => prevCount - 1);
      
      // Make the server request
      await axios.delete(`https://foodbackend-hfrx.onrender.com/remove/${id}`, {
        headers: { Authorization: `Bearer ${authentication?.token}` },
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      // Roll back by fetching fresh data
      fetchCartData();
    }
  }

  useEffect(() => {
    if (authentication?.token) {
      fetchCartData();
      console.log("fetch dta is hit")
    }
  }, [authentication?.token]);

  return (
    <cartContext.Provider value={{ cart, count, incrementItem, decrementItem, removeItem, fetchCartData }}>
      {children}
    </cartContext.Provider>
  );
};

export default cartContext;