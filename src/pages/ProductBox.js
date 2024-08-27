import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import box from '../assets/no.jpg';

// Helper function to add ImageKit transformations
const addImageKitTransformations = (url, transformations) => {
  const baseUrl = url.split('?')[0];
  const existingParams = url.includes('?') ? url.split('?')[1] : '';
  const separator = existingParams ? '&' : '?';
  return `${baseUrl}${separator}tr=${transformations}`;
};

const ProductBox = ({ product }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [imageLoaded, setImageLoaded] = useState(false);

  const imageSizes = [300, 600, 900];

  return (
    <div
      ref={ref}
      className={`col-6 col-md-4 col-lg-3 mb-4 animate-on-scroll ${inView ? 'is-visible' : ''}`}
    >
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="card product-card">
          <div className="product-image-container">
            {inView && (
              <>
                {!imageLoaded && (
                  <img
                    src={addImageKitTransformations(product.imageUrls[0], 'w-20,h-20,bl-30,q-50')}
                    alt={product.name}
                    className="card-img-top product-image placeholder"
                    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', filter: 'blur(10px)'}}
                  />
                )}
                <img
                  srcSet={imageSizes.map(size => `${addImageKitTransformations(product.imageUrls[0], `w-${size},f-webp`)} ${size}w`).join(', ')}
                  sizes="(max-width: 576px) 50vw, (max-width: 768px) 33vw, 25vw"
                  src={addImageKitTransformations(product.imageUrls[0], 'w-300,f-webp')}
                  className="card-img-top product-image"
                  alt={product.name}
                  onError={(e) => {e.target.onerror = null; e.target.src = box;}}
                  onLoad={() => setImageLoaded(true)}
                  style={{opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.3s'}}
                  loading="lazy"
                />
              </>
            )}
          </div>
          <div className="card-body">
            <h5 className="card-title product-name">{product.name}</h5>
            <p className="card-text"><strong>Price: BDT {product.price}</strong></p>
            <p className="card-text"><small className="text--muted">Category: {product.category}</small></p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductBox;