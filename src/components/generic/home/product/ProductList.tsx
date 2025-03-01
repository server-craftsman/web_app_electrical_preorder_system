import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { ProductService } from '../../../../services/product/product.service';
import { GetAllProductResponseModel } from '../../../../models/api/response/product.res.model';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<GetAllProductResponseModel[]>([]);

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
      <div className=" mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center -mt-4">Đặt hàng sớm cùng Elecee</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
