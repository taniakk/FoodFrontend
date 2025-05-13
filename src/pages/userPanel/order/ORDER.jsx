import { useEffect, useState } from "react";
import "./ORDER.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

function OrderFood() {
  const [order, setOrder] = useState([]);
  const userDetail = localStorage?.getItem("userInfo");
  const authentication = JSON?.parse(userDetail);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://foodbackend-hfrx.onrender.com/getOrder", {
          headers: {
            Authorization: `Bearer ${authentication.token}`,
          },
        });
        console.log(response.data);
        setOrder(response.data.orders); // Store only the orders array
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const cancelOrder = async (orderId) => {
    // Use SweetAlert2 to ask for confirmation before canceling the order
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to cancel this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.put(
          `https://foodbackend-hfrx.onrender.com/cancelOrder/${orderId}`,
          { status: "Cancelled" }, // Send "Cancelled" status in the body
          {
            headers: {
              Authorization: `Bearer ${authentication.token}`,
            },
          }
        );
        console.log("Order canceled:", response.data);
        // Update the state to reflect the canceled order
        setOrder((prevOrders) =>
          prevOrders.map((orderItem) =>
            orderItem._id === orderId
              ? { ...orderItem, status: "Cancelled" }
              : orderItem
          )
        );

        // Success alert
        Swal.fire(
          'Cancelled!',
          'Your order has been canceled.',
          'success'
        );
      } catch (error) {
        console.log("Error canceling order:", error);
        // Error alert
        Swal.fire(
          'Error!',
          'There was an error canceling your order.',
          'error'
        );
      }
    } else {
      // User clicked "No, keep it" or dismissed the dialog
      Swal.fire(
        'Cancelled',
        'Your order was not canceled.',
        'info'
      );
    }
  };

  return (
    <>
      <div className="ordercontainer">
        {order.map((orderItem) => (
          <div key={orderItem._id} className="orderfoodbox">
            <div className="divv">
              <div className="orderfoodbox1">
                <div
                  className="foodinsidebox1"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h4>Items</h4>
                  {orderItem.items.map((item, idx) => (
                    <p key={idx}>Item: {item.foodId?.foodName || "N/A"}</p>
                  ))}
                </div>
                <div className="foodinsidebox2">
                  <h4>Quantity</h4>
                  {orderItem.items.map((item, idx) => (
                    <p key={idx}>{item.quantity}</p>
                  ))}
                </div>
              </div>

              {orderItem.status === "Pending" ? (
                <div className="orderfoodbox2">
                  <div className="foodinsidebox3">
                    <h4>Total Price</h4>
                    <h4>₹{orderItem.totalAmount}</h4>
                  </div>
                  <div className="foodinsidebox4">
                    <Link to={`/pay/${orderItem._id}`}>
                      <button className="orderfoodbtn">Pay</button>
                    </Link>
                    <button
                      className="orderfoodbtn cancelbtn"
                      onClick={() => cancelOrder(orderItem._id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="orderfoodbox2"
                  style={{
                    textAlign: "center",
                    fontSize: "2vw",
                  }}
                >
                  <p>
                    Status: {orderItem.status}{" "}
                    {orderItem.status !== "Cancelled" && (
                      <button
                        className="orderfoodbtn"
                        onClick={() => cancelOrder(orderItem._id)}
                      >
                        Cancel
                      </button>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default OrderFood;
