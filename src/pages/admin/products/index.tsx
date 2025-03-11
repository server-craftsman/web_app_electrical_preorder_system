import { useState, useRef, useEffect } from 'react';
import Search from '../../../components/search';
import ViewProducts from '../../../components/admin/products/ViewProducts';
import CreateProducts from '../../../components/admin/products/CreateProducts';
import { CategoryService } from '../../../services/category/category.service';
import { GetAllCategoryResponseModel } from '../../../models/api/response/category.res.model';

const Products = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const createProductRef = useRef<{ handleOpenModal: () => void } | null>(null);
  const [refreshProducts, setRefreshProducts] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  // State cho filter và sort
  const [sortBy, setSortBy] = useState('position');
  const [sortDirection, setSortDirection] = useState('asc');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<GetAllCategoryResponseModel[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAll({});
        if (Array.isArray(response.data?.data)) {
          setCategories(response.data.data); // Lưu danh mục vào state
        }
      } catch (error) {
        console.error('Lỗi khi tải danh mục:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCreateProduct = () => {
    setIsModalVisible(true);
    if (createProductRef.current) {
      createProductRef.current.handleOpenModal();
    }
  };

  const handleProductCreated = () => {
    setRefreshProducts((prev) => !prev); // Trigger refresh
    setRefreshKey((prev) => prev + 1); // Ensure re-fetch
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setRefreshKey((prev) => prev + 1); // Trigger re-fetch in ViewProducts
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Search onSearch={handleSearch} placeholder="Tìm kiếm sản phẩm..." />
        
        {/* Sắp xếp */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="position">Vị trí</option>
          <option value="price">Giá</option>
          <option value="name">Tên sản phẩm</option>
        </select>
        <select
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="asc">Tăng dần</option>
          <option value="desc">Giảm dần</option>
        </select>

        {/* Filter Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Filter Giá */}
        <input
          type="number"
          placeholder="Giá tối thiểu"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="border px-4 py-2 rounded-lg w-28"
        />
        <input
          type="number"
          placeholder="Giá tối đa"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="border px-4 py-2 rounded-lg w-28"
        />

        <button onClick={handleCreateProduct} className="btn-submit">
          Tạo sản phẩm
        </button>
      </div>
      <ViewProducts
        refresh={refreshProducts}
        searchTerm={searchTerm}
        refreshKey={refreshKey}
        sortBy={sortBy}
        sortDirection={sortDirection}
        category={category}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
      <CreateProducts
        ref={createProductRef}
        isOpen={isModalVisible}
        onProductCreated={handleProductCreated}
      />
    </div>
  );
};

export default Products;
