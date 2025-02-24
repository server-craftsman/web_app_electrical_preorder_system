import { Table } from 'antd';
import Pagination from '../../pagination';
import { useState, useEffect } from 'react';
import { GetAllProductResponseModel } from '../../../models/api/response/product.res.model';
import { ProductService } from '../../../services/product/product.service';

interface ViewProductProps {
  refresh: boolean;
  searchTerm: string;
  refreshKey: number;
}

const CustomEyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5c-4.97 0-9 3.582-9 8s4.03 8 9 8 9-3.582 9-8-4.03-8-9-8zm0 14c-3.866 0-7-2.686-7-6s3.134-6 7-6 7 2.686 7 6-3.134 6-7 6zm0-10.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"
    />
  </svg>
);

const ViewProducts = ({ refresh, searchTerm, refreshKey }: ViewProductProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<GetAllProductResponseModel[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await ProductService.getAll({
        searchTerm,
        page: page - 1, // Adjust if API uses 1-based indexing
        size: pageSize,
      });
      const content = response?.data?.data?.content;
      const total = response?.data?.data?.page?.totalElements;

      if (Array.isArray(content)) {
        setProducts(content);
        setTotalProducts(total || 0);
      } else {
        setProducts([]);
        setTotalProducts(0);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on search or refresh
  }, [refreshKey]);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, refresh, refreshKey]);

  const columns = [
    { title: 'Mã sản phẩm', dataIndex: 'productCode', key: 'productCode' },
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Giá', dataIndex: 'price', key: 'price' },
    { title: 'Danh mục', dataIndex: ['category', 'name'], key: 'category' },
    {
      title: 'Hành động',
      key: 'action',
      render: () => (
        <span className="flex space-x-2">
          <button className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700">
            <CustomEyeIcon />
          </button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        pagination={false}
        locale={{ emptyText: 'Không có sản phẩm nào' }}
        rowKey="productCode"
        footer={() => (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalProducts / pageSize)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      />
    </div>
  );
};

export default ViewProducts;