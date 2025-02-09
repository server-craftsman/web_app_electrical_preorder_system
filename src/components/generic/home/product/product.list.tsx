import React, { useEffect, useState } from 'react';
import ProductCard from './product.card';
import { ProductService } from '../../../../services/product/product.service';
import { GetAllCategoryResponseModel } from '../../../../models/api/response/product.res.model';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<GetAllCategoryResponseModel[]>([]);

  useEffect(() => {
    ProductService.getAll({})
      .then((response) => {
        if (Array.isArray(response?.data?.data?.content)) {
          setProducts(response.data.data.content);
        } else {
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Đặt hàng sớm cùng Elecee</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
