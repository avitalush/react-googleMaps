
import React from 'react';
import Product from './product';

const Category = ({ title, products }) => {
  return (
    <div>
      <h2>{title}-{calcaulateSum()}</h2>
      {products.map((product) => (
        <Product key={product.id} name={product.name} quanity={product.quanity} />
      ))}
    </div>
  );
};

export default Category;
 