import React from 'react';
import Skeleton from 'react-loading-skeleton';

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

export default ProductSkeleton;
