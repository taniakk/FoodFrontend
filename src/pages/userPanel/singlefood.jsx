import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/authContext";
import cartContext from "../../context/cartContext";
import { toast, ToastContainer } from "react-toastify";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import "./singlefood.css";
import { FaStar, FaRegStar } from "react-icons/fa"; // solid and outline star

export default function FoodListing() {
  const [Food, setFood] = useState({});
  const { token } = useContext(AuthContext);
  const { fetchCartData } = useContext(cartContext);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    foodId: "",
    quantity: 1,
    price: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: "",
    comment: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const fetchSingleFood = async (id) => {
    try {
      const response = await axios.get(
        `https://foodbackend-hfrx.onrender.com/getsinglefood/${id}`
      );
      setFood(response.data);
      setFormData({
        ...formData,
        foodId: response.data._id,
        price: response.data.price,
      });
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  useEffect(() => {
    fetchSingleFood(id);
  }, [id]);
  async function fetchReviw() {
    try {
      const response = await axios.get(
        `https://foodbackend-hfrx.onrender.com/getRatingByID/${id}`
      );
      console.log(response.data);
      setReviews(response.data);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  }
  useEffect(() => {
   
    fetchReviw();
  }, [id]);

  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {
    async function fetchSuggestion() {
      try {
        const response = await axios.get("https://foodbackend-hfrx.onrender.com/getSuggestion");
        const filterData = response.data.filter((data) => data._id !== id);
        setSuggestion(filterData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSuggestion();
  }, [id]);

  const submitReview = async () => {
    try {
      const response = await axios.post(
        `https://foodbackend-hfrx.onrender.com/AddRating`,
        {
          foodId: Food._id,
          rating: reviewData.rating,
          review: reviewData.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Review submitted!");
        fetchReviw()
        setShowModal(false);
        setReviewData({ rating: "", comment: "" });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review.");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `https://foodbackend-hfrx.onrender.com/addCart`,
        {
          foodId: formData.foodId,
          quantity: formData.quantity,
          price: formData.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchCartData();
        toast.success("Item added to cart!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding to cart. Please try again.");
    }
  };

  const handleAddToCart = async (foodId, price) => {
    try {
      const response = await axios.post(
        `https://foodbackend-hfrx.onrender.com/addCart`,
        {
          foodId,
          quantity: 1,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchCartData();
        toast.success("Item added to cart!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding to cart. Please try again.");
    }
  };

  return (
    <>
      <div className="container">
        <ToastContainer />

        <main className="content">
          <div className="image-section">
            <img
              src={Food?.image}
              alt="Fooderty"
              className="Fooderty-image"
              height={400}
              width={"100%"}
            />
            <div className="image-overlay">
              <span className="price">Rs {Food?.price}</span>
            </div>
          </div>

          <section className="description">
            <h2>{Food?.foodName}</h2>
            <p className="text">{Food?.foodIngredients}</p>
            <button className="singleFoodbtn" onClick={handleSubmit}>
              Add to cart
            </button>
            <button
              className="singleFoodbtn"
              style={{ marginLeft: "10px" }}
              onClick={() => setShowModal(true)}
            >
              Leave a Review
            </button>
          </section>
        </main>

        <main className="content">
          <h1 className="reviewh1">Reviews</h1>
          <div className="singleBox">
            {reviews.map((item, index) => {
              const stars = Array.from({ length: 5 }, (_, i) =>
                i < item.rating ? (
                  <FaStar key={i} color="#FFD700" />
                ) : (
                  <FaRegStar key={i} color="#ccc" />
                )
              );

              return (
                <div key={index} className="reviewBox">
                  <div className="star">{stars}</div>
                  <h3>Name: {item.userId.name}</h3>
                  <h6>Message: {item.review|| 'Good'}</h6>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* MUI Modal for Review */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Write a Review
          </Typography>

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={reviewData.rating}
              label="Rating"
              onChange={(e) =>
                setReviewData({ ...reviewData, rating: e.target.value })
              }
            >
              {[1, 2, 3, 4, 5].map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Review"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={reviewData.comment}
            onChange={(e) =>
              setReviewData({ ...reviewData, comment: e.target.value })
            }
          />

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={() => setShowModal(false)} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={submitReview}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Suggestion Section */}
      <div className="container-fluid">
        <h1 className="suggesth1">Suggestions for You</h1>
        <div
          className="allfoods"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          {suggestion.map((d) => (
            <div
              className="suggestCard"
              key={d._id}
              style={{
                width: "250px",
                padding: "15px",
                border: "2px solid black",
                borderRadius: "10px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <img
                src={d.image}
                alt={d.foodName}
                width={200}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "5px",
                }}
              />
              <h2>{d.foodName}</h2>
              <h3>Rs {d.price}</h3>
              <button
                className="singleFoodbtn"
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "8px 15px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
                onClick={() => handleAddToCart(d._id, d.price)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
