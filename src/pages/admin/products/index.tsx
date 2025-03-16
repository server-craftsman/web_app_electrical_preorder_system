import { useState, useRef, useEffect, ChangeEvent } from 'react';
import Search from '../../../components/search';
import ViewProducts from '../../../components/admin/products/ViewProducts';
import CreateProducts from '../../../components/admin/products/CreateProducts';
import { CategoryService } from '../../../services/category/category.service';
import { GetAllCategoryResponseModel } from '../../../models/api/response/category.res.model';
import {
  Typography,
  Select,
  Input,
  Button,
  Card,
  Row,
  Col,
  Collapse,
} from 'antd';
import {
  PlusOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

// Định nghĩa interface cho các filter
interface FilterState {
  sortBy: string;
  sortDirection: string;
  category: string;
  minPrice?: number;
  maxPrice?: number;
  searchTerm: string;
}

const Products = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const createProductRef = useRef<{ handleOpenModal: () => void } | null>(null);
  const [refreshProducts, setRefreshProducts] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // State cho filter đã áp dụng (sẽ được truyền xuống ViewProducts)
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    sortBy: 'position',
    sortDirection: 'asc',
    category: '',
    minPrice: undefined,
    maxPrice: undefined,
    searchTerm: '',
  });

  // State tạm thời cho filter (chỉ áp dụng khi nhấn nút "Áp dụng")
  const [tempFilters, setTempFilters] = useState<FilterState>({
    sortBy: 'position',
    sortDirection: 'asc',
    category: '',
    minPrice: undefined,
    maxPrice: undefined,
    searchTerm: '',
  });

  const [categories, setCategories] = useState<GetAllCategoryResponseModel[]>(
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAll({});
        if (Array.isArray(response.data?.data)) {
          setCategories(response.data.data);
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
    setRefreshProducts((prev) => !prev);
    setRefreshKey((prev) => prev + 1);
  };

  // Cập nhật state tạm thời
  const updateTempFilter = (key: keyof FilterState, value: any) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Áp dụng tất cả các filter
  const applyFilters = () => {
    setAppliedFilters({ ...tempFilters });
    setRefreshKey((prev) => prev + 1);
  };

  // Đặt lại tất cả các filter
  const handleResetFilters = () => {
    const resetFilters = {
      sortBy: 'position',
      sortDirection: 'asc',
      category: '',
      minPrice: undefined,
      maxPrice: undefined,
      searchTerm: '',
    };
    setTempFilters(resetFilters);
    setAppliedFilters(resetFilters);
    setRefreshKey((prev) => prev + 1);
  };

  // Xử lý tìm kiếm nhanh (áp dụng ngay)
  const handleQuickSearch = (value: string) => {
    const newFilters = {
      ...appliedFilters,
      searchTerm: value,
    };
    setTempFilters(newFilters);
    setAppliedFilters(newFilters);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-md rounded-xl">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
          <div className="w-full md:w-2/3">
            <Title level={4} className="m-0">
              Quản lý sản phẩm
            </Title>
            <div className="mt-1">
              <Search
                placeholder="Tìm kiếm sản phẩm..."
                onSearch={handleQuickSearch}
              />
            </div>
          </div>

          <button
            onClick={handleCreateProduct}
            className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <PlusOutlined />
            <span>Tạo sản phẩm</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          <Button
            type={showFilters ? 'primary' : 'default'}
            icon={<FilterOutlined />}
            onClick={() => setShowFilters(!showFilters)}
            className={`${showFilters ? 'bg-blue-600 border-none' : ''}`}
            size="middle"
          >
            Bộ lọc nâng cao
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleResetFilters}
            size="middle"
          >
            Đặt lại
          </Button>
        </div>

        {showFilters && (
          <Collapse
            defaultActiveKey={['1']}
            className="mt-4 border border-gray-200 rounded-lg overflow-hidden"
          >
            <Panel header="Tùy chọn lọc nâng cao" key="1">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <div className="text-gray-700 mb-2 font-medium flex items-center">
                    <SortAscendingOutlined className="mr-2" />
                    Sắp xếp theo
                  </div>
                  <Select
                    value={tempFilters.sortBy}
                    onChange={(value) => updateTempFilter('sortBy', value)}
                    className="w-full mb-2"
                    size="middle"
                  >
                    <Option value="position">Vị trí</Option>
                    <Option value="price">Giá</Option>
                    <Option value="name">Tên sản phẩm</Option>
                  </Select>
                  <Select
                    value={tempFilters.sortDirection}
                    onChange={(value) =>
                      updateTempFilter('sortDirection', value)
                    }
                    className="w-full"
                    size="middle"
                  >
                    <Option value="asc">Tăng dần</Option>
                    <Option value="desc">Giảm dần</Option>
                  </Select>
                </Col>

                <Col xs={24} md={8}>
                  <div className="text-gray-700 mb-2 font-medium">Danh mục</div>
                  <Select
                    value={tempFilters.category}
                    onChange={(value) => updateTempFilter('category', value)}
                    className="w-full"
                    size="middle"
                    placeholder="Chọn danh mục"
                  >
                    <Option value="">Tất cả danh mục</Option>
                    {categories.map((cat) => (
                      <Option key={cat.id} value={cat.name}>
                        {cat.name}
                      </Option>
                    ))}
                  </Select>
                </Col>

                <Col xs={24} md={8}>
                  <div className="text-gray-700 mb-2 font-medium">
                    Khoảng giá
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="number"
                      placeholder="Giá tối thiểu"
                      value={tempFilters.minPrice}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateTempFilter(
                          'minPrice',
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                      size="middle"
                      className="w-full sm:w-1/2"
                    />
                    <Input
                      type="number"
                      placeholder="Giá tối đa"
                      value={tempFilters.maxPrice}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateTempFilter(
                          'maxPrice',
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                      size="middle"
                      className="w-full sm:w-1/2"
                    />
                  </div>
                </Col>
              </Row>

              <div className="flex justify-end mt-4">
                <Button
                  type="primary"
                  onClick={applyFilters}
                  className="bg-blue-600 hover:bg-blue-700 border-none"
                  size="middle"
                >
                  Áp dụng bộ lọc
                </Button>
              </div>
            </Panel>
          </Collapse>
        )}
      </Card>

      <ViewProducts
        refresh={refreshProducts}
        searchTerm={appliedFilters.searchTerm}
        refreshKey={refreshKey}
        sortBy={appliedFilters.sortBy}
        sortDirection={appliedFilters.sortDirection}
        category={appliedFilters.category}
        minPrice={appliedFilters.minPrice}
        maxPrice={appliedFilters.maxPrice}
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
