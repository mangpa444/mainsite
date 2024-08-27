import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <footer className="site-footer mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: info@trustglobal.com.bd</p>
            <p>Phone: +880 1938775447</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/about">About Us</Link></li>
              <li><a href="https://www.facebook.com/realtrustglobal/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="http://instagram.com/thetrustglobal/" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://www.facebook.com/realtrustglobal/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Newsletter</h5>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Your email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">Subscribe</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;