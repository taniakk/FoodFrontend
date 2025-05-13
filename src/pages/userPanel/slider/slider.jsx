import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './slider.css';

function Slider() {
  const images = [
    "/images/burgerslider.jpg",
    "/images/pastaslider.jpg",
    "/images/paneertikkaslider.jpg",
    "/images/drinksslider.jpg",
    "/images/vegthalislider.jpg",
    "/images/redvelvetslider.jpg",
    "/images/dessertsslider.jpg",
    "/images/cheesepizza.jpg",
    "/images/fishfry.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="sliderContainer">
      <AnimatePresence mode="wait">
        <motion.div
          key={images[currentIndex]}
          className="sliderImage"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
          initial={{ scale: 1.5 }}
          animate={{ scale: .9 }}
          exit={{ scale: 0.95 }}
          transition={{ duration: 1.5 }}
        >
          <div className="sliderContent">
            <motion.h1
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Fresh. Fast. Flavorful.
            </motion.h1>
            <motion.p
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Order delicious meals from your campus canteen in just a few clicks.
            </motion.p>
            <motion.button
              className="sliderBtn"
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link className='food_link' to = {'/foods'}>Order Now</Link>
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Slider;
