import axios from "axios";
import { useEffect, useState } from "react";
import Cards from '../../../components/card/card';
import { Link } from "react-router-dom";
import './newFood.css';

function NewFood() {
  const [category, setCategory] = useState([]);

  const imageMap = {
    'Appetizers': '/images/appetizers.jpeg',
    'Main Course': '/images/indianfood.jpg',
    'Side Dishes': '/images/frenchfries.jpg',
    'Beverages': '/images/coffee.jpg',
    'Desserts': '/images/13.jpg',
    'Fast Food': '/images/pizza.jpg',
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://foodbackend-hfrx.onrender.com/catRead');
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="newFoodContainer">
      <div className="newFoodHeader">
        <h1 className="tagline">🍟Explore Delicious Categories at Our Cafeteria🍟</h1>
        <p className="subTagline">Fresh, Fast, and Flavorful – Pick your favorite now!</p>
      </div>

      <div className="newFoodGrid">
        {category.map((da) => (
          <Link to={`/subcategory/${da._id}`} key={da._id} style={{ textDecoration: 'none' }}>
            <div className="foodCardWrapper">
              <Cards
                img={imageMap[da.Category]}
                heading={da.Category}
                he={"20vh"}
                wi={"100%"}
                borderRad={"400px"}
                bodywi={"60%"}
                
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NewFood;
