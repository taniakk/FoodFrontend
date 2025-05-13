import {data, useParams} from "react-router-dom";
import axios from "axios";
import Cards from "../../../components/card/card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Card from "../../../components/card/card";
import './subCat.css'
function SubCategoryPage() {
    const {id} = useParams();
    const [subCategoryData, setSubCategoryData] = useState([]);

    const imageMap = {
        "Soups": '/images/soup3.jpg',
        "Salads": '/images/salad3.jpg',
        "Finger Foods": '/images/potatowedges.jpg',
        "Vegetarian Dishes": '/images/veg3.jpg',
        "Non-Vegetarian Dishes": '/images/non-veg.jpg',
        "Rice and Pasta": '/images/veg2.jpg',
        "Curries and Gravies": '/images/curries&gravies1.jpg',
        "Breads": '/images/garlicbread.jpg',
        "Fries and Chips": '/images/potatowedges.jpg',
        "Hot Beverages": '/images/hotbeverages1.jpg',
        "Cold Beverages": '/images/mocktail.jpg',
        "Smoothies and Shakes": '/images/11.jpg',
        "Alcoholic Drinks": '/images/beer.jpeg',
        "Cake and Pastries": '/images/13.jpg',
        "Ice-Cream and Frozen Desserts": '/images/desserts.jpg',
        "Indian Sweets": '/images/gulabjamun.jpeg',
        "Burgers and Sandwiches": '/images/chikenburger.jpg',
        "Pizza and Pasta": '/images/4.jpg',
        "Tacos and Wraps": '/images/vegtaco.jpg'
      }

    useEffect(() => {
        const fetchSubCategoryData = async () => {
            try{
                const response = await axios.get(`https://foodbackend-hfrx.onrender.com/categories/${id}`);
                console.log(response)
                setSubCategoryData(response.data);
            } catch (error) {
                console.error('Error fetching subcategory data', error);
            }
        };
        fetchSubCategoryData();
    }, [id]);

    return (
        <div className="subMain">
            {/* <h1 className="subCath1">Subcategory Details</h1> */}
           <div className="subCatBox" style={{width:"100%"}}>
                {
                    subCategoryData.map((data) => (
                        <Link className="cardFood" to ={`/food/${data._id}`} key={data._id} style={{ textDecoration: 'none'}}>
                        <div style={{cursor: 'pointer', width: "300px"}}>
                            <Cards
                            he={"50vh"}
                            wi={"100%"}
                            img={imageMap[data.Subcategory_name]}
                            heading={data.Subcategory_name}/>

                        </div>
                        </Link>
                    ))
                    }
            </div>
        </div>
        
    )
};

export default SubCategoryPage

