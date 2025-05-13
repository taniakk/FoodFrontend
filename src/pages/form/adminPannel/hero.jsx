import './hero.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  const userDetail = localStorage.getItem("userInfo");
  const authentication = JSON.parse(userDetail);

  useEffect(() => {
    if (!authentication) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="admin-hero-container">
      <div className="admin-hero-header">
        <h1 className='heroh1'>Welcome to the Admin Panel</h1>
        <p className="sub-heading">Control your canteen with ease and confidence.</p>
      </div>

      <div className="admin-hero-body">
        <div className="hero-image" />
        <div className="hero-text">
          <h2>Food Fascination Admin Dashboard</h2>
          <p>
            This is your central hub for managing the food ordering system — from updating menus and monitoring orders
            to analyzing customer feedback and optimizing service. Use this panel to stay in control, boost efficiency,
            and deliver top-notch dining experiences.
          </p>
          <ul>
            <li>📦 Manage inventory & dishes</li>
            <li>📊 View analytics & orders</li>
            <li>💬 Monitor user feedback</li>
            <li>🎯 Launch promotions & offers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Hero;
