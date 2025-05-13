import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cards from "../../../components/card/card";
import axios from "axios";
import "./showfood.css";

function FoodPage() {
  const { id } = useParams();
  const [foodData, setfoodData] = useState([]);

  useEffect(() => {
    const fetchSubCategoryData = async () => {
      try {
        const response = await axios.get(
          `https://foodbackend-hfrx.onrender.com/subcategories/${id}`
        );
        console.log(response);
        setfoodData(response.data);
      } catch (error) {
        console.log("Error fetching subcategory data", error);
      }
    };
    fetchSubCategoryData();
  }, [id]);

  return (
    <div className="SubCatMain">
      <h1 className="SubCath1">Food Details</h1>

      <div className="subCatbox" style={{ width: "100%" }}>
        {foodData.map((data) => (
          <Link
            className="cardFood"
            to={`/single/${data._id}`}
            key={data._id}
            style={{ textDecoration: "none" }}
          >
            <div style={{ cursor: "pointer", width: "300px" }}>
              <Cards
                img={data.image}
                heading={data.foodName}
                para={data.description}
                he={"40vh"}
                wi={"100%"}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default FoodPage;
