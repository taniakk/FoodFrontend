import { useEffect, useState } from "react";
import "./payment.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const [formData, setFormData] = useState({
    payment_type: "",
    amount: "",
    card_number: "",
    card_type: "",
    cvc_code: "",
  });

  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://foodbackend-hfrx.onrender.com/getOrderByID/${id}`
        );
        setTotalAmount(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if (totalAmount.totalAmount) {
      setFormData((prev) => ({
        ...prev,
        amount: totalAmount.totalAmount,
      }));
    }
  }, [totalAmount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(typeof (formData.amount))

    if (!formData.payment_type) {
      setMessage("Please select a payment method.");
      return;
    }

    if (formData.payment_type === "Online") {
      if (!formData.card_type || !formData.card_number || !formData.cvc_code) {
        setMessage("All card fields are required for online payment.");
        return;
      }
    }

    try {
      const response = await axios.post(
        `https://foodbackend-hfrx.onrender.com/addPayment/${id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setMessage("Payment successful");

      // Reset form
      setFormData({
        payment_type: "",
        amount: "",
        card_number: "",
        card_type: "",
        cvc_code: "",
      });

      
        navigate("/thanks");
     
    } catch (error) {
      setMessage(
        "Error during payment: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="paymentContainer">
      <div className="paymentBox">
        <form onSubmit={handleSubmit}>
          {message && <p className="paymentMessage">{message}</p>}

          <h1 className="paymentH1">Payment</h1>

          <select
            className="inputPayment"
            id="payment_type"
            name="payment_type"
            value={formData.payment_type}
            onChange={handleChange}
          >
            <option value="">Select payment method</option>
            <option value="Online">Online</option>
            <option value="COD">Cash on Delivery</option>
          </select>

          <input
            className="inputPayment"
            id="amount"
            name="amount"
            value={`Rs. ${formData.amount}`}
            placeholder="Enter amount"
            type="text"
            readOnly
          />

          {formData.payment_type === "Online" && (
            <>
              <input
                className="inputPayment"
                id="card_number"
                name="card_number"
                placeholder="Enter card number"
                type="text"
                maxLength={16}
                value={formData.card_number}
                onChange={handleChange}
              />

              <select
                className="inputPayment"
                id="card_type"
                name="card_type"
                value={formData.card_type}
                onChange={handleChange}
              >
                <option value="">Select card type</option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="RuPay">RuPay</option>
                <option value="American Express">American Express</option>
              </select>

              <input
                className="inputPayment"
                id="cvc_code"
                name="cvc_code"
                placeholder="Enter CVV code"
                type="password"
                maxLength={3}
                value={formData.cvc_code}
                onChange={handleChange}
              />
            </>
          )}

          <span>
            <button type="submit" className="PaymentSubmitBttn">
              Submit
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Payment;
