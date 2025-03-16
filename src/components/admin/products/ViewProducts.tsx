import { Table, Button, Tag, Typography, Empty, Tooltip, Space } from 'antd';
import Pagination from '../../pagination';
import { useState, useEffect, useRef } from 'react';
import { GetAllProductResponseModel } from '../../../models/api/response/product.res.model';
import { ProductService } from '../../../services/product/product.service';
import { useNavigate } from 'react-router-dom';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { ROUTER_URL } from '../../../const';
import EditProducts from './ModalEdit';
import ModalDelete from './ModalDelete';
import { helper } from '../../../utils';
import type { Breakpoint } from 'antd/es/_util/responsiveObserver';
import type { FixedType } from 'rc-table/lib/interface';

const { Title, Text } = Typography;

interface ViewProductProps {
  refresh: boolean;
  searchTerm: string;
  refreshKey: number;
  sortBy: string;
  sortDirection: string;
  category: string;
  minPrice?: number;
  maxPrice?: number;
}

const ViewProducts = ({
  refresh,
  searchTerm,
  refreshKey,
  sortBy,
  sortDirection,
  category,
  minPrice,
  maxPrice,
}: ViewProductProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<GetAllProductResponseModel[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const pageSize = 10;

  const navigate = useNavigate();
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(
    null
  );
  const editProductRef = useRef<{ handleOpenModal: (slug: string) => void }>(
    null
  );
  const deleteProductRef = useRef<{ handleOpenModal: (slug: string) => void }>(
    null
  );

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getAll({
        page: currentPage - 1,
        size: pageSize,
        query: searchTerm || undefined,
        sortBy: sortBy || 'createdAt',
        sortDirection: sortDirection || 'desc',
        categoryId: category || undefined,
        minPrice,
        maxPrice,
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
    }
  };

  const handleEditProduct = (slug: string) => {
    setSelectedProductSlug(slug);
    if (editProductRef.current) {
      editProductRef.current.handleOpenModal(slug);
    }
  };

  const handleProductUpdated = () => {
    fetchProducts();
  };

  const handleDeleteProduct = (slug: string) => {
    setSelectedProductSlug(slug);
    if (deleteProductRef.current) {
      deleteProductRef.current.handleOpenModal(slug);
    }
  };

  const handleProductDeleted = () => {
    fetchProducts();
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on search or refresh
  }, [refreshKey]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, refreshKey, refresh]);

  const getStatusTag = (quantity: number) => {
    if (quantity > 10) {
      return <Tag color="success">Còn hàng</Tag>;
    } else if (quantity > 0) {
      return <Tag color="warning">Sắp hết</Tag>;
    } else {
      return <Tag color="error">Hết hàng</Tag>;
    }
  };

  const columns = [
    {
      title: 'Mã SP',
      dataIndex: 'productCode',
      key: 'productCode',
      width: 100,
      render: (text: string) => (
        <span className="font-medium text-gray-700">{text}</span>
      ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (text: string) => (
        <Tooltip placement="topLeft" title={text}>
          <span className="font-medium text-gray-800">{text}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 250,
      ellipsis: {
        showTitle: false,
      },
      render: (text: string) => (
        <Tooltip placement="topLeft" title={text}>
          <div className="text-gray-600 line-clamp-2">
            {text && text.length > 100 ? `${text.substring(0, 100)}...` : text}
          </div>
        </Tooltip>
      ),
      responsive: ['lg', 'xl'] as Breakpoint[],
    },
    {
      title: 'SL',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      render: (quantity: number) => (
        <div className="flex items-center">
          <span className="font-medium mr-2">{quantity}</span>
          {getStatusTag(quantity)}
        </div>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (text: number) => (
        <span className="text-blue-600 font-medium">
          {helper.formatCurrency(text)}
        </span>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: ['category', 'name'],
      key: 'category',
      width: 120,
      render: (text: string) => (
        <Tag color="blue" className="px-2 py-1">
          {text}
        </Tag>
      ),
      responsive: ['md', 'lg', 'xl'] as Breakpoint[],
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 120,
      fixed: 'right' as FixedType,
      render: (_: string, record: GetAllProductResponseModel) => (
        <Space size="small">
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all duration-200"
            onClick={() =>
              navigate(`${ROUTER_URL.ADMIN.PRODUCT}/${record.slug}`)
            }
          >
            <EyeOutlined className="text-lg" />
          </button>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all duration-200"
            onClick={() => handleEditProduct(record.slug)}
            title="Chỉnh sửa"
          >
            <EditOutlined className="text-lg" />
          </button>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200"
            onClick={() => handleDeleteProduct(record.slug)}
            title="Xóa"
          >
            <DeleteOutlined className="text-lg" />
          </button>
        </Space>
      ),
    },
  ];

  const [ids, setIds] = useState<React.Key[]>([]);

  const handleDeleteMultiple = async () => {
    try {
      if (ids.length === 0) {
        helper.notificationMessage(
          'Không có sản phẩm nào được chọn',
          'warning'
        );
        return;
      }

      const queryParams = ids.map((id) => `ids=${id}`).join('&');
      await ProductService.deleteMultiple(queryParams);
      helper.notificationMessage('Xóa sản phẩm thành công', 'success');
      setIds([]);
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete products:', error);
      helper.notificationMessage('Xóa sản phẩm thất bại', 'error');
    }
  };

  const rowSelection = {
    selectedRowKeys: ids,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setIds(newSelectedRowKeys);
    },
  };

  const renderEmptyState = () => (
    <Empty
      image={<InboxOutlined style={{ fontSize: 60 }} />}
      imageStyle={{ height: 80 }}
      description={<Text className="text-gray-500">Không có sản phẩm nào</Text>}
    />
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 overflow-hidden">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 gap-2">
        <div>
          <Title level={5} className="m-0">
            Danh sách sản phẩm
          </Title>
          <Text type="secondary">Tổng cộng: {totalProducts} sản phẩm</Text>
        </div>
        {ids.length > 0 && (
          <Button
            type="primary"
            danger
            onClick={handleDeleteMultiple}
            className="flex items-center self-end md:self-auto"
            size="middle"
          >
            <DeleteOutlined />
            <span className="ml-1">Xóa {ids.length} sản phẩm</span>
          </Button>
        )}
      </div>

      <div className="relative overflow-x-auto">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={products}
          pagination={false}
          locale={{ emptyText: renderEmptyState() }}
          rowKey="id"
          className="border border-gray-100 rounded-lg"
          rowClassName="hover:bg-gray-50 transition-colors"
          // scroll={{ x: 'max-content' }}
          size="middle"
        />

        {totalProducts > 0 && (
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalProducts / pageSize)}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>

      <EditProducts
        ref={editProductRef}
        onProductUpdated={handleProductUpdated}
        slug={selectedProductSlug || ''}
      />
      <ModalDelete
        ref={deleteProductRef}
        onProductDeleted={handleProductDeleted}
        slug={selectedProductSlug || ''}
      />
    </div>
  );
};

export default ViewProducts;
