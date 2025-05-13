import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./subcategory.css";
// import Nav from "../../components/adminNav/navbar";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Subcategory = () => {
  const [Subcategory_name, setSubcategory_name] = useState('Soups');
  const [Category, setCategory] = useState('Appetizers');
  const [categoryData, setCategoryData] = useState([]);
  const tokenData = localStorage.getItem('userInfo');
  const authentication = JSON.parse(tokenData);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication == null) {
      navigate('/login');
    }
  }, [authentication, navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = authentication?.token;
        if (token) {
          const catResponse = await axios.get('https://foodbackend-hfrx.onrender.com/catRead', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(catResponse.data)
          setCategoryData(catResponse.data); 
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'subcategory_name') {
      setSubcategory_name(value);
    } else if (name === 'category') {
      setCategory(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://foodbackend-hfrx.onrender.com/subCreate', {
        Subcategory_name,
        Category
      });
      toast.success('Sub-Category Added Successfully');
      setSubcategory_name('Soups');
      setCategory('Appetizers');
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      {/* <Nav /> */}
      <div className="subbox">
        <div className="subbox1">
          {/* <h2 className="subCatH2">Add Sub Category</h2> */}
          <div className="subbox4"></div>
        </div>
        <div className="subbox2">
          <div className="subbox3">
            <form onSubmit={handleSubmit} className="subcatForm">
              <h2 className="subFormH2">Add Sub-Category</h2>
              <select
                className="subcatSelect"
                name="subcategory_name"
                value={Subcategory_name}
                onChange={handleChange}>
                <option value="Soups">Soups</option>
                <option value="Salads">Salads</option>
                <option value="Finger Foods">Finger Foods</option>
                <option value="Vegetarian Dishes">Vegetarian Dishes</option>
                <option value="Non-Vegetarian Dishes">Non-Vegetarian Dishes</option>
                <option value="Rice and Pasta">Rice and Pasta</option>
                <option value="Curries and Gravies">Curries and Gravies</option>
                <option value="Breads">Breads</option>
                <option value="Fries and Chips">Fries and Chips</option>
                <option value="Hot Beverages">Hot Beverages</option>
                <option value="Cold Beverages">Cold Beverages</option>
                <option value="Smoothies and Shakes">Smoothies and Shakes</option>
                <option value="Alcoholic Drinks">Alcoholic Drinks</option>
                <option value="Cake and Pastries">Cake and Pastries</option>
                <option value="Ice-Cream and Frozen Desserts">Ice-Cream and Frozen Desserts</option>
                <option value="Indian Sweets">Indian Sweets</option>
                <option value="Burgers and Sandwiches">Burgers and Sandwiches</option>
                <option value="Pizza and Pasta">Pizza and Pasta</option>
                <option value="Tacos and Wraps">Tacos and Wraps</option>
              </select>
              <select
                className="subcat1"
                name="category"
                value={Category}
                onChange={handleChange}>
                  <option value="">Please Select Category..</option>
                {
                  categoryData.map((catData) => (
                    <option key={catData._id} value={catData.Category}>
                      {catData.Category}
                    </option>
                  ))
                }
              </select>
              <button className="subbtn">Submit</button>
              <Link className="subLink" to="/category">Click here to add category</Link>
            </form>
          </div>
        </div>

        <ToastContainer
          position='top-right'
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default Subcategory;
