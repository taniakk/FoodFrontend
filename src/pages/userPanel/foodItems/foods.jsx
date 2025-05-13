import { useContext, useEffect, useState } from "react";
import "./foods.css";
import axios from "axios";
// import AuthContext from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import cartContext from "../../../context/cartContext";

function Foods() {
  const [data, setData] = useState([]);
  
  const userDetail = localStorage?.getItem("userInfo");

  const authentication = JSON?.parse(userDetail);
  console.log(authentication, "authentication");
  const navigate = useNavigate();
  const {fetchCartData} =useContext(cartContext)

  useEffect(() => {
    if (authentication === null) {
      navigate("/login");
    }
  }, [authentication?.token, navigate]);

  useEffect(() => {
    async function fetchFoods() {
      const response = await axios.get("https://foodbackend-hfrx.onrender.com/read");
      console.log(response);
      setData(response.data);
    }
    fetchFoods();
  }, []);

  const handleSubmit = async (food) => {
    const quantity = document.getElementById(`quantity-${food._id}`).value;
    if (!quantity) {
      toast.error("Please enter quantity");
      return;
    }
    // console.log(food)
    const formPayload = {
      foodId: food._id,
      quantity,
      price: food.price,
    };

    try {
      const response = await axios.post(
        "https://foodbackend-hfrx.onrender.com/addCart",
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${authentication?.token}`,
          },
        }
      );
      
      fetchCartData()
      console.log(response);
      toast.success("Added to Cart");
    } catch (error) {
      console.error(error);
      alert("Error adding to cart");
    }
  };

  return (
    <>
      {data.map((d) => (
        <div key={d._id} className="cardContainer">
          
          <div className="cardbox2">
            <h2 className="cardh1">{d.foodName}</h2>
            <h5>Price: ₹ {d.price}</h5>
            <h4 className="cardh1">Food Ingredients</h4>
            <h6 className="cardh1">{d.foodIngredients}</h6>
          </div>
          <div className="cardbox1">
            <img
              src={d.image}
              alt="food image"
              height={"200px"}
              width={"200px"}
            />
          </div>
          <div className="cardbox3">
            <input
              id={`quantity-${d._id}`}
              className="cardinput"
              type="number"
              placeholder="Qty"
              min="1"
          />
            <button
              className="button"
              type="button"
              onClick={() => handleSubmit(d)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
      <ToastContainer />
    </>
  );
}

export default Foods;
