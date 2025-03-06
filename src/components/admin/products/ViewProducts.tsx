import { Table, Button } from 'antd';
import Pagination from '../../pagination';
import { useState, useEffect, useRef } from 'react';
import { GetAllProductResponseModel } from '../../../models/api/response/product.res.model';
import { ProductService } from '../../../services/product/product.service';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ROUTER_URL } from '../../../const';
import EditProducts from './ModalEdit';
import ModalDelete from './ModalDelete';
import { helper } from '../../../utils';
interface ViewProductProps {
  refresh: boolean;
  searchTerm: string;
  refreshKey: number;
}

const ViewProducts = ({
  refresh,
  searchTerm,
  refreshKey,
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

  const fetchProducts = async (page: number, searchTerm: string) => {
    try {
      const response = searchTerm
        ? await ProductService.search(searchTerm, page - 1, pageSize)
        : await ProductService.getAll({ page: page - 1, size: pageSize });

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
      console.log('fetchProducts');
    }
  };

  const handleEditProduct = (slug: string) => {
    setSelectedProductSlug(slug);
    // Call the ref method directly without checking isEditModalVisible first
    if (editProductRef.current) {
      editProductRef.current.handleOpenModal(slug);
    }
  };

  const handleProductUpdated = () => {
    fetchProducts(currentPage, searchTerm);
  };

  const handleDeleteProduct = (slug: string) => {
    setSelectedProductSlug(slug);
    if (deleteProductRef.current) {
      deleteProductRef.current.handleOpenModal(slug);
    }
  };

  const handleProductDeleted = () => {
    fetchProducts(currentPage, searchTerm);
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on search or refresh
  }, [refreshKey]);

  useEffect(() => {
    fetchProducts(currentPage, searchTerm);
  }, [currentPage, refresh, refreshKey, searchTerm]);

  const columns = [
    { title: 'Mã sản phẩm', dataIndex: 'productCode', key: 'productCode' },
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => text.slice(0, 100),
    },
    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text: number) => (
        <span className="text-green-600 font-mono">
          {helper.formatCurrency(text)}
        </span>
      ),
    },
    { title: 'Danh mục', dataIndex: ['category', 'name'], key: 'category' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: string, record: GetAllProductResponseModel) => (
        <span className="flex space-x-2">
          <button
            className="bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700"
            onClick={() =>
              navigate(`${ROUTER_URL.ADMIN.PRODUCT}/${record.slug}`)
            }
          >
            <EyeOutlined className="text-xl" />
          </button>
          <button
            className="bg-green-600 text-white p-2 rounded-lg shadow-lg hover:bg-green-700"
            onClick={() => handleEditProduct(record.slug)}
          >
            <EditOutlined className="text-xl" />
          </button>
          <button
            className="bg-red-600 text-white p-2 rounded-lg shadow-lg hover:bg-red-700"
            onClick={() => handleDeleteProduct(record.slug)}
          >
            <DeleteOutlined className="text-xl" />
          </button>
        </span>
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

      // Format the IDs as query parameters in the format ids=id1&ids=id2
      const queryParams = ids.map((id) => `ids=${id}`).join('&');
      await ProductService.deleteMultiple(queryParams);
      helper.notificationMessage('Xóa sản phẩm thành công', 'success');
      setIds([]);
      fetchProducts(currentPage, searchTerm);
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

  return (
    <div>
      {ids.length > 0 && (
        <div className="mb-4 flex justify-end">
          <Button
            type="primary"
            danger
            onClick={handleDeleteMultiple}
            className="bg-red-600 text-white"
          >
            Xóa {ids.length} sản phẩm đã chọn
          </Button>
        </div>
      )}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={products}
        pagination={false}
        locale={{ emptyText: 'Không có sản phẩm nào' }}
        rowKey="id"
        footer={() => (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalProducts / pageSize)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      />

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
