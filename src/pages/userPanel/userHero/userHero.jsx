import React from "react";
import NewFood from "../NewFood/newFood.jsx";
import Slider from "../slider/slider";

import AboutUser from "../about/about.jsx";
import PopularFood from "../popularFood/popularFood.jsx";
import MyFooter from "../../../components/footer/footer.jsx";
import TopOffers from "../offerslider.jsx";
import { Link } from "react-router-dom";



function UserHero() {
  return(
    <div className="hero">
    <NewFood/>
    <TopOffers/>

    
    <AboutUser/>
    <Slider/>
    <PopularFood/>
    {/* <ContactUs/> */}
    <Link to={'/assistent'}> <div className="assistant" style={{
                width: "100px",
                height: "100px",
                border: "2px solid black",
                borderRadius: "50px",
                position: "fixed",
                zIndex: "10",
                right: "10px",
                bottom: "10px",
                overflow: "hidden", // ensures the gif stays within the circle
                boxShadow:"2px 2px 5px gray"

            }}>
                <img
                    src="/images/assistant.gif"
                    alt="Assistant"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // ensures the gif covers the div nicely
                        background:"#143D60"
                    }}
                />
            </div>
            </Link>
    <MyFooter />
    
    </div>
  )
}
export default UserHero;
