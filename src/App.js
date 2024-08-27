import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ProductDetails from './pages/ProductDetails';
import Home from './pages/Home';
import About from './pages/About';

import Search from './pages/Search';
import NotFound from './pages/NotFound';


import { DarkModeProvider } from './DarkModeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  return (
   <DarkModeProvider>
      <Router>
      
        <div className="App">
          <Header className="sticky-header" />
          <div className="content-wrapper">
            <main className="site-main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/search" element={<Search />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;