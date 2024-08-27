// Header.js
import React, { useState, useEffect, useCallback  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import DarkModeToggle from './DarkModeToggle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import ListItemText from '@mui/material/ListItemText';
import { useDarkMode } from '../DarkModeContext';
import './Header.css';

const Header = () => {
  const [query, setQuery] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

 const headerRef = useCallback(node => {
  if (node !== null) {
      const updateBodyPadding = () => {
        const headerHeight = node.offsetHeight;
        document.body.style.paddingTop = `${headerHeight}px`;
      };

      updateBodyPadding();
      window.addEventListener('resize', updateBodyPadding);

      return () => {
        window.removeEventListener('resize', updateBodyPadding);
      };
    }
  }, []);
  useEffect(() => {
    const updateCartItemCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
      setCartItemCount(itemCount);
     };

    const handleScroll = () => {
      const header = document.querySelector('.sticky-header');
      if (header) {
        if (window.scrollY > 0) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };
    

    // Initial calls
    updateCartItemCount();
    handleScroll();

    // Event listeners
    window.addEventListener('storage', updateCartItemCount);
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('storage', updateCartItemCount);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <header ref={headerRef} className={`sticky-header site-header ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3">
            <Link to="/" className="logo-link">
              <img src={logo} alt="Trust Global Logo" className="logo" />
            </Link>
          </div>
          <div className="col-md-8">
            <div className="search-container">
              <form onSubmit={handleSearch} className="search-form">
                <div className="input-group">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="form-control"
                    placeholder="Search our site..."
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary btn-search" type="submit">Search</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-1 d-flex justify-content-end align-items-center">
            <IconButton onClick={handleMenuOpen} color="inherit">
              <DensityMediumIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => { navigate('/cart'); handleMenuClose(); }}>
                <ListItemIcon>
                  <Badge badgeContent={cartItemCount} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary="Cart" />
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <DarkModeToggle />
                </ListItemIcon>
                <ListItemText primary="Toggle Theme" />
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;