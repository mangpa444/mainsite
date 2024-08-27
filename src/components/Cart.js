import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../DarkModeContext'; // Import the dark mode context
import './Cart.css'; // Ensure you import the updated CSS
import CancelIcon from '@mui/icons-material/Cancel';
import box from '../assets/empty-box.png';
import np from '../assets/no.jpg';
import CryptoJS from 'crypto-js'; // Import MD5 from crypto-js
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { darkMode } = useDarkMode(); // Get dark mode state

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const printPage = () => {
    window.print();
  };

  return (
    <div className={`container mt-5 cart-container ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="container-fluid mt-100">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body cart">
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <img src={box} alt="EMPTY CART" width="130" height="130" className="img-fluid mb-4 mr-3" />
                    <h3><strong>Your Cart is Empty</strong></h3>
                    <h4>🛠️ Start adding items to build your perfect order!</h4>
                    <a href="/" className="btn btn-primary cart-btn-transform m-3" data-abc="true">continue shopping</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
        <ul className="list-group">
        {cartItems.map(item => (
          <li key={item.id} className="list-group-item">
            <div className="row align-items-center">

              {/* Image and Product Details */}
              <div className="col-md-4 img-container">
                <Link to={`/product/${item.id}`}  className="no-link">
                  <img 
                    src={item.imageUrls[0]} 
                    alt={item.name} 
                    className="img-fluid" 
                    onError={(e) => e.target.src = np}  
                  />
                </Link>
              </div>

               {/* Product Details */}
              <div className="col-md-4 item-details">
                <h3>
                  <Link to={`/product/${item.id}`} className="no-link">
                    {item.name.length > 50 ? `${item.name.substring(0, 20)}...` : item.name}
                  </Link>
                </h3>
                <p>
                  <Link to={`/product/${item.id}`} className="no-link">
                    Item ID: {item.id} | Category: {item.category}
                  </Link>
                </p>
                <p>
                  <Link to={`/product/${item.id}`} className="no-link">
                    Price: BDT {item.price}
                  </Link>
                </p>
              </div>

                  {/* Quantity and Buttons */}
                  <div className="col-auto">
                    <div className="quantity-control">
                      <button
                        className="btn btn-warning px-3 me-2 bold-button minus-button"
                        onClick={() => {
                          const hashedId = CryptoJS.MD5(item.id.toString()).toString();
                          console.log(`Hashed ID: ${hashedId}`);
                          updateQuantity(item.id, item.quantity - 1);
                        }}
                      >
                        <RemoveIcon />
                      </button>
                      <input type="text" className="form-control quantity" value={item.quantity} readOnly />
                      <button
                        className="btn btn-success px-3 ms-2 bold-button plus-button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <AddIcon />
                      </button>
                      
                    <button className="btn btn-danger btn-remove" onClick={() => removeItem(item.id)}>
                      <CancelIcon />
                    </button>
                  
                    </div>
                  </div>
                  
                  
                </div>
                
                <div className="divider"></div>
              </li>
            ))}
          </ul>

          <div className="last-page-list">
            <button onClick={printPage} className="btn btn-primary mb-3 btn-print">
              Print Cart
            </button>
            <h2>Cart Summary</h2>
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  Item ID: {item.id} : Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Contact information for print mode */}
      <div className="contact-info">
        <p>Contact Us</p>
        <p>Email: info@trustglobal.com.bd</p>
        <p>Phone: +880 1938775447</p>
        <p>Facebook: <a href="https://www.facebook.com/realtrustglobal/">facebook Page</a></p>
      </div>
    </div>
  );
};

export default Cart;
