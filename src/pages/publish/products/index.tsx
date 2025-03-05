import React, { useEffect, useState } from 'react';
import { ProductService } from '../../../services/product/product.service';
import { GetAllProductResponseModel } from '../../../models/api/response/product.res.model';
import ProductCard from '../../../components/generic/home/product/ProductCard';
import { CategoryService } from '../../../services/category/category.service';
import { GetAllCategoryResponseModel } from '../../../models/api/response/category.res.model';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<GetAllProductResponseModel[]>([]);
  const [categories, setCategories] = useState<GetAllCategoryResponseModel[]>([]);
  const [category, setCategory] = useState<GetAllCategoryResponseModel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<GetAllProductResponseModel[]>([]);

  // API ở đây 
  
  useEffect(() => {
    ProductService.getAll({})
      .then((response) => {
        const productList = response?.data?.data?.content;
        if (Array.isArray(productList)) {
          setProducts(productList);
          setFilteredProducts(productList);
        } else {
          setProducts([]);
          setFilteredProducts([]);
        }
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    CategoryService.getAll({})
      .then((response) => {
        const categoryList = response?.data?.data;
        
        if (Array.isArray(categoryList)) {
          setCategories(categoryList);
        } else {
          setCategories([]);
        }
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  // Lọc sản phẩm nè ní
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((product) => product?.category?.id === category.id);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, category, products]);

  return (
    <div className="bg-white py-8">
      <div className="mx-auto">
        <h2 className="text-2xl font-bold text-center mt-4 mb-8">
          Đặt hàng sớm cùng Elecee
        </h2>

        <div className="flex justify-center items-center gap-4 flex-col md:flex-row w-full">
          {/* Ô tìm kiếm */}
          <div className="flex justify-center mb-4 w-1/2">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="border px-4 py-2 rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Ô lọc sản phẩm */}
          <div className="flex justify-center mb-6 w-1/2">
            <select
              className="border px-4 py-2 rounded-lg w-full"
              value={category?.id || ''}
              onChange={(e) => {
                const selectedCategory = categories?.find((c) => c.id === e.target.value) || null;
                setCategory(selectedCategory);
              }}
            >
              <option value="">Tất cả danh mục</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Danh sách */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="text-center text-gray-500 col-span-4">Không tìm thấy sản phẩm nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
