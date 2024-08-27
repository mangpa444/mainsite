import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Fab from '@mui/material/Fab';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { fetchProducts } from '../utils/dataFetcher';
import SEO from './SEO';

const ProductBox = lazy(() => import('./ProductBox'));
const ProductSkeleton = lazy(() => import('./ProductSkeleton'));

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const productsPerPage = 12;

  const loadProducts = useCallback(async (pageNumber) => {
    setLoading(true);
    try {
      const newProducts = await fetchProducts(pageNumber, productsPerPage);
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setAllProducts(prevProducts => [...prevProducts, ...newProducts]);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [productsPerPage]);

  useEffect(() => {
    loadProducts(page);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, loadProducts]);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="container mt-5">
      <SEO />
      <h1 className="mb-4">Our Products</h1>
      <InfiniteScroll
        dataLength={allProducts.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="row">
            {[...Array(4)].map((_, i) => (
              <Suspense key={i} fallback={<Skeleton height={200} />}>
                <ProductSkeleton />
              </Suspense>
            ))}
          </div>
        }
      >
        <div className="row">
          {allProducts.map((product) => (
            <Suspense key={product.id} fallback={<Skeleton height={200} />}>
              <ProductBox product={product} />
            </Suspense>
          ))}
        </div>
      </InfiniteScroll>
      {showScrollTop && (
        <Fab color="primary" size="small" onClick={scrollToTop} style={{ position: 'fixed', bottom: 16, left: 16 }}>
          <KeyboardDoubleArrowUpIcon />
        </Fab>
      )}
    </div>
  );
};

export default Home;
