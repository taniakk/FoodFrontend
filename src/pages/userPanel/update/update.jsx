import { useContext, useEffect, useState } from "react";
import "./update.css";
import profileContext from "../../../context/profileContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function Update() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile_number: ''
        
    })
    const {id} = useParams()
  const { profile } = useContext(profileContext);
  console.log(profile);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData); // Debug: Check form data before submitting
        const response = await axios.put(`https://foodbackend-hfrx.onrender.com/update/${id}`, formData, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);

        // setMessage('Updated successfully');
        setFormData({
            name: '',
            email: '',
            password: '',
            mobile_number: '',
        });
        navigate('/profile')


    } catch (error) {
        console.log('Error in updation: ' + (error.response?.data?.message || error.message));
    }
};



  useEffect(() => {
    setFormData((prevFormData) => ({
        name: profile.name,
        email: profile.email,
        password: profile.password,
        mobile_number: profile.mobile_number
        
    }));
}, []);

  return (
    <>
      <div className="updatecontainer">
        <div className="updatebox">
          <form className="updatebox1" onSubmit={handleSubmit}>
            <h2 className="updateh1">Update User</h2>
            <input
              className="updateinput"
              type="text"
              name="name"
              placeholder="Enter name"
              id="name"
              value={formData?.name}
              onChange={handleChange}
            />
            <br />
            <input
              className="updateinput"
              type="email"
              name="email"
              placeholder="Enter email"
              id="email"
              value={formData?.email}
              onChange={handleChange}
            />
            <br />
            <input
              className="updateinput"
              type="password"
              name="password"
              placeholder="Enter password"
              id="password"
              value={formData?.password}
              onChange={handleChange}
            />
            <br />
            <PhoneInput
              country={"us"}
              value={formData.mobile_number}
              onChange={(value) =>
                setFormData({ ...formData, mobile_number: value })
              }
              placeholder="Enter your Phone number"
              inputProps={{
                name: "mobileno",
                required: true,
                autoFocus: true,
              }}
              inputStyle={{ width: "100%" }}
              containerStyle={{ width: "270px", borderRadius: "20px" }}
            />
            <br />

            <button className="updatebtn">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Update;
