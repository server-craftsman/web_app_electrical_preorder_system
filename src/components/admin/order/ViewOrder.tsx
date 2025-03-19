import React, { useEffect, useState } from 'react';
import { Table, Tag, Select, Pagination, Empty, Card, message, Spin } from 'antd';
import { OrderService } from '../../../services/order/order.service';
import { OrderViewResModel } from '../../../models/api/response/order.res.model';
import { formatCurrency } from '../../../utils/helper';
import { OrderStatus } from '../../../app/enums';
import moment from 'moment';
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import ModalOrder from './ModalOrder';

const { Option } = Select;

const ViewOrder: React.FC = () => {
  // Existing state variables
  const [orders, setOrders] = useState<OrderViewResModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('PENDING');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [totalAmount, setTotalAmount] = useState(0);
  
  // New state variables for modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderViewResModel | null>(null);

  // Existing functions
  const fetchOrders = async (page = 1, orderStatus = 'PENDING') => {
    try {
      setLoading(true);
      const response = await OrderService.viewOrderByAdmin(orderStatus, page - 1, pagination.pageSize);
      
      if (response?.data?.data) {
        const { orders, totalAmount, currentPage, totalElements } = response.data.data;
        setOrders(orders ?? []);
        setTotalAmount(totalAmount ?? 0);
        setPagination({
          ...pagination,
          current: (currentPage ?? 0) + 1,
          total: totalElements ?? 0,
        });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      message.error('Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (value: string) => {
    setStatus(value);
    fetchOrders(1, value);
  };

  const handlePageChange = (page: number) => {
    fetchOrders(page, status);
  };

  const getStatusColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      PENDING: 'orange',
      CONFIRMED: 'blue',
      SHIPPED: 'cyan',
      DELIVERED: 'green',
      CANCELLED: 'red',
    };
    return colors[status] || 'default';
  };

  // New functions for modal
  const showOrderDetail = (order: OrderViewResModel) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <span className="font-medium">{text.substring(0, 8)}...</span>,
    },
    {
      title: 'Khách hàng',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => (
        <div>
          <div className="font-medium">{user.fullname}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
          {user.phoneNumber && <div className="text-xs text-gray-500">{user.phoneNumber}</div>}
        </div>
      ),
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'campaign',
      key: 'product',
      render: (campaign: any) => (
        <div>
          <div className="font-medium">{campaign.product.name}</div>
          <div className="text-xs text-gray-500">Chiến dịch: {campaign.name}</div>
        </div>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number) => <span>{quantity}</span>,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => (
        <span className="font-medium text-red-500">{formatCurrency(amount)}</span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderStatus) => (
        <Tag color={getStatusColor(status)}>
          {status === 'PENDING' && 'Chờ xác nhận'}
          {status === 'CONFIRMED' && 'Đã xác nhận'}
          {status === 'SHIPPED' && 'Đang giao hàng'}
          {status === 'DELIVERED' && 'Đã giao hàng'}
          {status === 'CANCELLED' && 'Đã hủy'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => <span>{moment(date).format('DD/MM/YYYY HH:mm')}</span>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 180,
      align: 'center' as const,
      render: (_: any, record: OrderViewResModel) => (
        <div className="flex justify-center space-x-2">
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all duration-200"
            onClick={() => showOrderDetail(record)}
            title="Xem chi tiết"
          >
            <EyeOutlined className="text-lg" />
          </button>
          
          {record.status === 'PENDING' && (
            <>
              <button
                className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200"
                onClick={() => {/* Update order function */}}
                title="Cập nhật trạng thái"
              >
                <EditOutlined className="text-lg" />
              </button>
              
              <button
                className="flex items-center justify-center w-9 h-9 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200"
                onClick={() => {/* Cancel order function */}}
                title="Hủy đơn hàng"
              >
                <DeleteOutlined className="text-lg" />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="admin-order-view p-6">
      <Card title="Quản lý đơn hàng" className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="mr-2">Trạng thái:</span>
            <Select
              value={status}
              onChange={handleStatusChange}
              style={{ width: 200 }}
              className="mr-4"
            >
              <Option value="all">Tất cả</Option>
              <Option value="PENDING">Chờ xác nhận</Option>
              <Option value="CONFIRMED">Đã xác nhận</Option>
              <Option value="SHIPPED">Đang giao hàng</Option>
              <Option value="DELIVERED">Đã giao hàng</Option>
              <Option value="CANCELLED">Đã hủy</Option>
            </Select>
          </div>
          <div className="text-lg font-medium">
            Tổng doanh thu: <span className="text-red-500">{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : orders.length > 0 ? (
          <>
            <Table
              columns={columns}
              dataSource={orders}
              rowKey="id"
              pagination={false}
              className="mb-4"
            />
            <div className="flex justify-end mt-4">
              <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </>
        ) : (
          <Empty description="Không có đơn hàng nào" />
        )}
      </Card>

      {/* Order Detail Modal */}
      <ModalOrder 
        visible={isModalVisible}
        onClose={handleCloseModal}
        orderData={selectedOrder}
      />
    </div>
  );
};

export default ViewOrder
