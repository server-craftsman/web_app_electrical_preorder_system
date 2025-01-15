import React from 'react';
import { Carousel } from 'antd';
import products from '../../../data/product.json';

const cover = () => {
  // Sort products by quantity sold in descending order and take the top 4
  const topSellingProducts = products
    .sort((a, b) => b.quantity_sold - a.quantity_sold)
    .slice(0, 4);

  return (
    <div className="w-full max-w-10xl mx-auto">
      <Carousel autoplay>
        {topSellingProducts.map((product) => (
          <div key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-[500px] object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default cover;
