import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Fab from '@mui/material/Fab';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Fuse from 'fuse.js';
import { fetchProducts } from '../utils/dataFetcherSer';
import SEO from './SEO';
import np from '../assets/no.jpg';

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const resultsPerPage = 12;
  const [fuse, setFuse] = useState(null);
  console.log('pag',page)
const initializeFuse = useCallback(async () => {
  try {
    console.log('Fetching all products...');
    const products = await fetchProducts(0, Infinity);  // Fetch all products
    
    
    if (!Array.isArray(products) || products.length === 0) {
      console.error('No products fetched or invalid data structure');
      return null;
    }

    console.log('Creating Fuse instance with', products.length, 'products');
    const newFuse = new Fuse(products, {
      keys: ['id', 'name', 'description', 'keywords'],
      threshold: 0.3
    });
    setFuse(newFuse);
    return newFuse;
  } catch (error) {
    console.error('Error in initializeFuse:', error);
    return null;
  }
}, []);

 const performSearch = useCallback((fuseInstance, pageNumber) => {
  if (!fuseInstance) {
    console.error('Fuse instance is not initialized');
    setLoading(false);
    return;
  }

  const results = fuseInstance.search(query);
  const startIndex = pageNumber * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const newResults = results.slice(startIndex, endIndex).map(result => result.item);
  
  setSearchResults(prevResults => {
    const resultSet = new Set(prevResults.map(p => p.id));
    const uniqueNewResults = newResults.filter(p => !resultSet.has(p.id));
    return [...prevResults, ...uniqueNewResults];
  });
  
  setHasMore(endIndex < results.length);
  setLoading(false);
  }, [query, resultsPerPage]);

  useEffect(() => {
    const loadSearchResults = async () => {
      setLoading(true);
      setSearchResults([]);
      setPage(0);
      setHasMore(true);

      try {
        const fuseInstance = fuse || await initializeFuse();
        performSearch(fuseInstance, 0);
      } catch (error) {
        console.error('Error loading search results:', error);
        setHasMore(false);
        setLoading(false);
      }
    };

    loadSearchResults();
  }, [query, initializeFuse, performSearch, fuse]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadMore = () => {
    if (!loading && hasMore && fuse) {
      setPage(prevPage => {
        const newPage = prevPage + 1;
        performSearch(fuse, newPage);
        return newPage;
      });
    }
  };

  const ProductBox = ({ product }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <div
        ref={ref}
        className={`col-6 col-md-4 col-lg-3 mb-4 animate-on-scroll ${inView ? 'is-visible' : ''}`}
      >
        <Link to={`/product/${product.id}`} className="product-link">
          <div className="card product-card">
            <div className="product-image-container">
              <img src={product.imageUrls[0]} className="card-img-top product-image" alt={product.name} onError={(e) => e.target.src=np} />
            </div>
            <div className="card-body">
              <h5 className="card-title product-name">{product.name}</h5>
              <p className="card-text"><strong>Price: {product.price}</strong></p>
              <p className="card-text"><small className="text--muted">Category: {product.category}</small></p>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  const ProductSkeleton = () => (
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <div className="card product-card">
        <Skeleton height={200} />
        <div className="card-body">
          <Skeleton count={3} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <SEO title={`Search Results for "${query}"`} />
      <h1 className="mb-4">Search Results for "{query}"</h1>
      <InfiniteScroll
        dataLength={searchResults.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<div className="row">{[...Array(4)].map((_, i) => <ProductSkeleton key={i} />)}</div>}
      >
        <div className="row">
          {searchResults.map((product) => (
            <ProductBox key={product.id} product={product} />
          ))}
        </div>
      </InfiniteScroll>
      {searchResults.length === 0 && !loading && (
        <p>No products found. Please try a different search term.</p>
      )}
      {showScrollTop && (
        <Fab color="primary" size="small" onClick={scrollToTop} style={{ position: 'fixed', bottom: 16, left: 16 }}>
          <KeyboardDoubleArrowUpIcon />
        </Fab>
      )}
    </div>
  );
};

export default Search;