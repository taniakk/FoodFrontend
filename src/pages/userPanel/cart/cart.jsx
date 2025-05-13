import React, { useContext, useMemo, useState } from "react";
import "./cart.css";
import cartContext from "../../../context/cartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Cart() {
  const {
    cart,
    incrementItem,
    decrementItem,
    removeItem,
    count,
    fetchCartData,
  } = useContext(cartContext);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const totalPrice = useMemo(() => {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((acc, item) => {
      const price = Number(item?.price) || 0;
      const quantity = Number(item?.quantity) || 0;
      return acc + price * quantity;
    }, 0);
  }, [cart]);

  const handleIncrement = (id) => incrementItem(id);
  const handleDecrement = (id) => decrementItem(id);
  const openAddressModal = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address.trim()) return setError("Address is required");
    if (!pinCode.trim()) return setError("Pin code is required");
    if (!/^[0-9]{6}$/.test(pinCode)) return setError("Invalid pin code");

    setIsSubmitting(true);
    const cartItemsForOrder = cart.map((item) => ({
      foodId: item.foodId,
      quantity: Number(item.quantity),
      price: Number(item.price),
    }));

    try {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      if (!token) {
        setError("Authentication required.");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post(
        "https://foodbackend-hfrx.onrender.com/addOrder",
        { cartItems: cartItemsForOrder, address, pinCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        toast.success("Order placed successfully!");
        closeModal();
        fetchCartData();
        setTimeout(() => {
          navigate(`/pay/${response.data.order._id}`);
        }, 1000);
      }
    } catch (error) {
      setError(error.response?.data || "Order failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-box">
        <h1 className="cart-title">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-message">Your cart is empty.</div>
        ) : (
          cart.map((item, index) => {
            const price = Number(item?.price);
            const quantity = Number(item?.quantity);
            const itemTotal = price * quantity;
            return (
              <div className="cart-item" key={item._id || index}>
                <img src={item.image} alt={item.foodName} className="cart-item-img" />
                <div className="cart-item-details">
                  <h3>{item.foodName}</h3>
                  <p className="cart-price">Rs. {price.toFixed(2)}</p>
                  <p className="cart-ingredients">{item.foodIngredients}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrement(item._id)} disabled={quantity <= 1}>−</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={() => handleIncrement(item._id)}>+</button>
                  </div>
                  <div className="cart-item-footer">
                    <div>Total: Rs. {itemTotal.toFixed(2)}</div>
                    <button className="remove-btn" onClick={() => removeItem(item._id)}>Remove</button>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div className="cart-summary">
          <h4>Total Items: {count || 0}</h4>
          <h4>Total Price: Rs. {totalPrice.toFixed(2)}</h4>
          <button className="buy-btn" onClick={openAddressModal}>Buy</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Enter Delivery Details</h2>
            {error && <div className="error-msg">{error}</div>}
            <form onSubmit={handleSubmit}>
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <label htmlFor="pinCode">Pin Code</label>
              <input
                type="text"
                id="pinCode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                maxLength={6}
                required
              />
              <div className="modal-actions">
                <button type="button" onClick={closeModal} className="cancel-btn">Cancel</button>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
