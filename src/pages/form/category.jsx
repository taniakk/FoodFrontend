import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './category.css'
// import Nav from "../../components/adminNav/navbar";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const Category = () => {
    const [Category, setCategory] = useState('Appetizers');

    const navigate = useNavigate();
        const userDetail = localStorage.getItem("userInfo")
        const authentication = JSON.parse(userDetail)
        console.log(authentication)
        useEffect(() => {
            if(authentication == null) {
              navigate('/login')
            }
        }, [])


    const handleChange=(e) =>{
      setCategory(e.target.value);
    };

    const handleSubmit = async (e) =>{
      e.preventDefault();
      try {
        const response = await axios.post('https://foodbackend-hfrx.onrender.com/catCreate', {Category});
        toast.success('Category Added Successfully');
        setCategory('Veg');
        
      } catch (error) {
        toast.error(error.response.data)
        
      }
    };

    return(
        <>
        {/* <Nav/> */}
        <div className="catbox">
      
      <div className="catbox1">
        {/* <h2 className="catH2">Add Category</h2> */}
        <div className="catbox4"></div>
      </div>
      <div className="catbox2">
        <div className="catbox3">
          <form onSubmit={handleSubmit} className="catForm">
            <h2 className="catFormH2">Add Category</h2>
            <select
            className="catSelect"
            name="Category"
            value={Category}
            onChange={handleChange}
            >

                <option value="Appetizers">Appetizers</option>
                <option value="Main Course">Main Course</option>
                <option value="Side Dishes">Side Dishes</option>
                <option value="Beverages">Beverages</option>
                <option value="Desserts">Desserts</option>
                <option value="Fast Food">Fast Food</option>
            </select>
            
            <button className="catbtn">Submit</button>
            <Link  to={"/subcat"}>Click here to add sub-category</Link>
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
    )
}
export default Category