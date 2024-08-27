import React, { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Import the CSS file for styling

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Use navigate instead of history.push
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Page Not Found</p>
      <Link to="/" className="not-found-link">Go back to Home</Link>
    </div>
  );
}

export default NotFound;

