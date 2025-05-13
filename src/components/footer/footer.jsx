import './footer.css';

function MyFooter() {
  return (
    <footer className="footer-container">
      <div className="footer-logo-section">
        <img src="/image/foodlogo2.png" alt="Food Fascination Logo" className="footer-logo" />
      </div>

      <div className="footer-links-section">
        

        <div className="footer-column">
          <h4>About</h4>
          <ul>
            <li>Our Team</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Connect</h4>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>
          <ul>
            <li>ffasination@gmail.com</li>
            <li>+91 89789 87656</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default MyFooter;
