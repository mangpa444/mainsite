import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

import { fetchProductById } from '../utils/dataFetcherpro';
import box from '../assets/no.jpg';
import ProductSEO from './ProductSEO.js';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [browsingHistory, setBrowsingHistory] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const historyRef = useRef(null);
  const relatedRef = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    fetchProductById(id).then(fetchedProduct => {
      setProduct(fetchedProduct);
      setLoading(false);

      const history = JSON.parse(localStorage.getItem('browsingHistory')) || [];
      if (!history.some(item => item.id === fetchedProduct.id)) {
        history.push(fetchedProduct);
        if (history.length > 10) history.shift();
        localStorage.setItem('browsingHistory', JSON.stringify(history));
      }
      setBrowsingHistory(history);
    });
  }, [id]);

  useEffect(() => {
    const productId = parseInt(id);
    const relatedProductIds = [];
    for (let i = productId - 2; i <= productId + 30; i++) {
      if (i !== productId) {
        relatedProductIds.push(i);
      }
    }
    const promises = relatedProductIds.map(id => fetchProductById(id));
    Promise.all(promises).then(fetchedProducts => {
      setRelatedProducts(fetchedProducts.filter(product => product !== null));
    });
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  const handleImageError = (e) => {
    e.target.src = box; // Fallback image URL
  };

  const scrollLeft = () => {
    if (historyRef.current) {
      historyRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (historyRef.current) {
      historyRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollLeftRelated = () => {
    if (relatedRef.current) {
      relatedRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRightRelated = () => {
    if (relatedRef.current) {
      relatedRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const truncateName = (name) => {
    return name.length > 15 ? name.substring(0, 15) + '...' : name;
  };
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div className="container mt-5">Loading product details...</div>;
  }

  if (!product) {
    return <div className="container mt-5">Product not found</div>;
  }

  return (
    <div className="container mt-5">
      <ProductSEO product={product} />

      <div className="row">
        <div className="col-md-6">
          <div className="product-image-container">
            <img 
              src={product.imageUrls[currentImageIndex]} 
              alt={`${product.name} - ${currentImageIndex + 1}`} 
              className="img-fluid product-image"
              onError={handleImageError}
            />
          </div>
          <div className="mt-3 d-flex justify-content-center">
            {product.imageUrls.map((url, index) => (
              <img 
                key={index}
                src={url} 
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`thumbnail-image ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
                onError={handleImageError}
              />
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p className="text--muted">Category: {product.category}</p>
          <p className="text--muted">ID: {product.id}</p>
          <p>{product.description}</p>
          <h3>Price: BDT {product.price}</h3>
          <button className="btn btn-primary mt-3" onClick={addToCart}>Add to Cart</button>

          <br></br>
          
        </div>
        <p>Exciting News from <a href={`https://store.trustglobal.com.bd/product/${Number(product.id) + 1}`}>
Trust Global</a> !</p>

<p>We're thrilled to announce that <strong>{product.name}</strong> is now available in Bangladesh!</p>

<p>Don't Miss Out! 
Get your hands on the amazing {product.name} today. Whether you're ready to buy or just have questions, <a href="https://trustglobal.com.bd/">Trust Global</a> is here to help!</p>

<p>
  <br />
  Call Now: +880 1938775447<br />
  Email Us: info@trustglobal.com.bd
  <br />
</p>
      </div>

      {/* Browsing History Section */}
      <div className="browsing-history mt-5">
        <h4>Related Products</h4>
        <div className="history-container">
          <button onClick={scrollLeftRelated} className="btn btn-secondary scroll-btn">←</button>
          <div className="history-items" ref={relatedRef}>
            {relatedProducts.map(relatedProduct => (
              <Link to={`/product/${relatedProduct.id}`} key={relatedProduct.id} onClick={handleLinkClick} className="history-item-card">
                <div className="card">
                  <img 
                    src={relatedProduct.imageUrls[0]} 
                    className="card-img-top" 
                    alt={relatedProduct.name}
                    onError={handleImageError}
                  />
                  <div className="card-body">
                    <h5 className="card-title" title={relatedProduct.name}>
                      {truncateName(relatedProduct.name)}
                    </h5>
                    <p className="card-text">Price: BDT {relatedProduct.price}</p>
                    <p className="card-text">Category: {relatedProduct.category}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <button onClick={scrollRightRelated} className="btn btn-secondary scroll-btn">→</button>
        </div>
      </div>


      {/* Browsing History Section */}
      <div className="browsing-history mt-5">
        <h4>Recently Viewed Products</h4>
        <div className="history-container">
          <button onClick={scrollLeft} className="btn btn-secondary scroll-btn">←</button>
          <div className="history-items" ref={historyRef}>
            {browsingHistory.map(historyProduct => (
              <Link to={`/product/${historyProduct.id}`} key={historyProduct.id} onClick={handleLinkClick} className="history-item-card">
                <div className="card">
                  <img 
                    src={historyProduct.imageUrls[0]} 
                    className="card-img-top" 
                    alt={historyProduct.name}
                    onError={handleImageError}
                  />
                  <div className="card-body">
                    <h5 className="card-title" title={historyProduct.name}>
                      {truncateName(historyProduct.name)}
                    </h5>
                    <p className="card-text">Price: BDT {historyProduct.price}</p>
                    <p className="card-text">Category: {historyProduct.category}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <button onClick={scrollRight} className="btn btn-secondary scroll-btn">→</button>
        </div>
      </div>

      {/* Related Products Section */}
      
    </div>
  );
};

export default ProductDetails;