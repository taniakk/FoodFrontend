import './about.css';
import { motion } from 'framer-motion';

function AboutUser() {
  return (
    <div className="aboutContainer">
      <motion.div
        className="aboutBox1"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/images/veg3.jpg"
          alt="Canteen food"
          className="aboutImage"
        />
      </motion.div>

      <motion.div
        className="aboutBox2"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className='aboutboxh1'>About Us</h1>
        <p className='aboutboxp'>
          We’re on a mission to make food ordering as easy and satisfying as that first bite of your favorite dish.
          Whether you're craving a hot meal on a rainy day, planning a group lunch, or just too busy to cook, we’ve got you covered.
          With a wide selection of local favorites and popular cuisines, we bring your favorite meals from your favorite places
          straight to your door.
        </p>

        <motion.div
          className="whyChooseUs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <h3>Why Choose Us?</h3>
          <ul>
            <li>🍔 <strong>Wide Variety:</strong> From traditional favorites to international cuisines.</li>
            <li>🚀 <strong>Fast Delivery:</strong> Meals delivered hot and fresh—right when you need them.</li>
            <li>💳 <strong>Secure Payments:</strong> Multiple secure payment options for your convenience.</li>
            <li>💬 <strong>Support:</strong> Friendly and responsive customer care, always ready to help.</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AboutUser;
