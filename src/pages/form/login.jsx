import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../context/authContext";
import cartContext from "../../context/cartContext";
import profileContext from "../../context/profileContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const { auth, setAuth,setToken } = useContext(AuthContext);
  const { fetchCartData } = useContext(cartContext);
  const { fetchProfile } = useContext(profileContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);

      const response = await axios.post(
        "https://foodbackend-hfrx.onrender.com/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      const obj = {
        token: response.data.token,
        authType: response.data.authType,
      };
      setAuth(obj.authType);
      setToken(obj.token)

      const stringfiedobj = JSON.stringify(obj);

      localStorage.setItem("userInfo", stringfiedobj);

      // localStorage.setItem('token',response.data.token)
      toast.success("Login Successfull");

      setMessage("Login Successfully!");
      setFormData({
        email: "",
        password: "",
      });

      setTimeout(() => {
        if (response.data.authType === "Owner") {
          navigate("/hero");
          fetchProfile()
        } else {
            fetchCartData();
            fetchProfile();
          navigate("/");
        }
      }, 3000);
    } catch (error) {
      // setMessage(
      //   "Error during login:" + (error.response?.data?.message || error.message)
      // );
      toast.error(
        "Login Failed: " + (error.response?.data?.message || error.message)
      );
    }
  };
  return (
    <div className="loginContainer">
      <div className="loginbox1">
        <form className="loginformbox" onSubmit={handleSubmit}>
          <p>{message}</p>
          <h1 className="loginh1">Login</h1>

          {/* <label htmlFor="email">Email: </label><br /> */}
          <input
            className="loginInput"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <br></br>
          <br />
          {/* <label htmlFor="password">Password: </label><br /> */}
          <input
            className="loginInput"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <button className="loginButton">submit</button>

          <Link to={"/register"}>click here for Register</Link>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rt1={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
export default Login;
