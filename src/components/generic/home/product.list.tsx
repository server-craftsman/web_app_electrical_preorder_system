import React from 'react';
import ProductCard from './product.cart';
import products from '../../../data/product.json';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  quantity_sold: number;
  created_at: string;
  updated_at: string;
  description: string;
  status: string;
  is_deleted: boolean;
  categories_id: number;
}

const ProductList: React.FC = () => {
  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Đặt hàng sớm cùng Elecee</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
