import { Table } from 'antd';
import Pagination from '../../pagination';
import { useState, useEffect } from 'react';
import { GetAllProductResponseModel } from '../../../models/api/response/product.res.model';
import { ProductService } from '../../../services/product/product.service';

interface ViewProductProps {
  refresh: boolean;
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

const ViewProducts = ({ refresh }: ViewProductProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<GetAllProductResponseModel[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getAll({});
      if (Array.isArray(response.data?.data?.content)) {
        setProducts(response.data.data.content);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  const columns = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'productCode',
      key: 'productCode',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Danh mục',
      dataIndex: ['category', 'name'],
      key: 'category',
    },
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

  const data = [
    {
      key: '1',
      productCode: 'P001',
      name: 'Product 1',
      description: 'Description of Product 1',
      quantity: 10,
      price: 100,
      category: 'Category 1',
    },
    // Add more product data here
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={products}
        pagination={false}
        footer={() => (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(products.length / 10)}
            onPageChange={setCurrentPage}
          />
        )}
      />
    </div>
  );
};

export default ViewProducts;
