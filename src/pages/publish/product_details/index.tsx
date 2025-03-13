import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from '../../../services/product/product.service';
import { Product } from '../../../models/modules/Product';
import ProductDetail from '../../../components/generic/home/product_details/ProductDetail';

const ProductDetails: React.FC = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductService.getBySlug(slug || '');
        setProduct(response.data.data.product as any);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [slug]);

  return product ? <ProductDetail /> : <div>Product not found</div>;
};

export default ProductDetails;
