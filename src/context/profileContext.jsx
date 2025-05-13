import axios from "axios";
import { createContext, useEffect, useState } from "react";

const profileContext = createContext();
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const userDetail = localStorage?.getItem("userInfo");

  const authentication = JSON?.parse(userDetail);
  console.log(authentication, "authentication");
  const token = authentication?.token

 
  async function fetchProfile(e) {
    // e.preventDefault()
    const response = await axios?.get("https://foodbackend-hfrx.onrender.com/getLog", {
      headers: {
        Authorization: `Bearer ${authentication?.token}`,
      },
    });
    // console.log(response);
    setProfile(response.data);
  }
  
  useEffect(()=>{
    if (token) {
      fetchProfile()
    }
  },[token])

  return (
    <profileContext.Provider value={{ profile ,fetchProfile}}>
      {children}
    </profileContext.Provider>
  );
};

export default profileContext;
