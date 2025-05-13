import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./food.css";
import { ThreeCircles } from 'react-loader-spinner';


const Food = () => {
  const [formData, setFormData] = useState({
    categoryId: "",
    subCategoryName: "",
    foodName: "",
    foodIngredients: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const tokenData = localStorage.getItem("userInfo");
  const authentication = JSON.parse(tokenData);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication == null) {
      navigate("/login");
    }

    axios
      .get("https://foodbackend-hfrx.onrender.com/catRead")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    if (formData.categoryId) {
      console.log(formData.categoryId)
      axios
        .get(`https://foodbackend-hfrx.onrender.com/categories/${formData.categoryId}/subcategories`, {
          headers: { Authorization: `Bearer ${authentication?.token}` },
        })
        .then((response) => setSubcategories(response.data))
        .catch((error) => console.error("Error fetching subcategories:", error));
    } else {
      setSubcategories([]);
    }
  }, [formData.categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader

    const data = new FormData();
    data.append("subCategoryName", formData.subCategoryName);
    data.append("foodName", formData.foodName);
    data.append("foodIngredients", formData.foodIngredients);
    data.append("price", formData.price);
    data.append("image", image);

    try {
      const token = authentication?.token;

      await axios.post("https://foodbackend-hfrx.onrender.com/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Food added successfully!");
      setFormData({
        categoryId: "",
        subCategoryName: "",
        foodName: "",
        foodIngredients: "",
        price: "",
      });
      setImage(null);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false); // Hide loader
    }

  };

  return (
    <div className="foodboxContainer1">
      <div className="foodbox1">
        <form onSubmit={handleSubmit}>
          <h1>Add Food</h1>

          {/* Category Dropdown */}
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.Category}
              </option>
            ))}
          </select>

          {/* Subcategory Dropdown */}
          <label htmlFor="subcategory">Subcategory:</label>
          <select
            id="subcategory"
            name="subCategoryName"
            value={formData.subCategoryName}
            onChange={handleChange}
            required
          >
            <option value="">Select a subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory.Subcategory_name}>
                {subcategory.Subcategory_name}
              </option>
            ))}
          </select>

          {/* Food Name */}
          <label htmlFor="name">Food Name:</label>
          <input
            type="text"
            id="name"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            required
          />

          {/* Food Ingredients */}
          <label htmlFor="ingredients">Food Ingredients:</label>
          <input
            type="text"
            id="ingredients"
            name="foodIngredients"
            value={formData.foodIngredients}
            onChange={handleChange}
            required
          />

          {/* Price */}
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          {/* Image */}
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            className="imageinput"
            onChange={handleFileChange}
            required
          />

          {loading ? (
            <ThreeCircles
              visible={true}
              height="50"
              width="50"
              color="#4fa94d"
              ariaLabel="three-circles-loading"
              wrapperStyle={{ display: "flex", justifyContent: "center" }}
              wrapperClass=""
            />
          ) : (
            <button className="foodbtn">Submit</button>
          )}

        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Food;
