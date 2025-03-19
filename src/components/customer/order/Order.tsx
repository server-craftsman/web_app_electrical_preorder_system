import { useEffect, useState } from 'react';
import { Table, Tag, Space, Select, Pagination, Empty, Button } from 'antd';
import { OrderService } from '../../../services/order/order.service';
import { OrderViewResModel } from '../../../models/api/response/order.res.model';
import { formatCurrency } from '../../../utils/helper';
import { OrderStatus } from '../../../app/enums';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

// Add import
import DetailModal from './DetailModal';

const OrderComponents = () => {
  // Add navigate
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState<OrderViewResModel[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderViewResModel | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [status, setStatus] = useState('all');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchOrders = async (page = 1, orderStatus = 'all') => {
    try {
      const response = await OrderService.viewOrder(orderStatus, page - 1, pagination.pageSize);
      console.log(response);
      if (response?.data?.data) {
        const { orders, totalAmount, currentPage, totalElements } = response.data.data;
        // Ensure orders is always an array
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

  const handleViewDetail = (record: OrderViewResModel) => {
    setSelectedOrder(record);
    setIsDetailModalVisible(true);
  };

  const handlePayment = (record: OrderViewResModel) => {
    if (record.status === 'PENDING') {
      // We're sending both URL params and state data
      navigate(`/checkout?campaignId=${record.campaign.id}&orderId=${record.id}`, {
        state: {
          orderData: {
            campaignId: record.campaign.id,
            orderId: record.id,
            quantity: record.quantity,
            totalAmount: record.totalAmount,
            buyerName: record.user.fullname,
            buyerPhone: record.user.phoneNumber,
            buyerAddress: record.user.address,
            productName: record.campaign.product.name,
            campaignName: record.campaign.name,
            productPrice: record.campaign.product.price
          }
        }
      });
    }
  };

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <span className="font-medium">{text.slice(0, 8)}...</span>,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'campaign',
      key: 'product',
      render: (campaign: any) => (
        <div>
          <div className="font-medium">{campaign.product.name}</div>
          <div className="text-sm text-gray-500">{campaign.name}</div>
        </div>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number) => <span className="font-medium">{quantity}</span>,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => <span className="font-medium">{formatCurrency(amount)}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderStatus) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => moment(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: OrderViewResModel) => (
        <Space>
          <Button type="link" onClick={() => handleViewDetail(record)}>
            Xem chi tiết
          </Button>
          {record.status === 'PENDING' && (
            <Button 
              type="primary"
              onClick={() => handlePayment(record)}
              className="bg-blue-500"
            >
              Thanh toán
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-md rounded-2xl p-6 -mt-10 min-h-[590px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Đơn hàng của tôi</h2>
        <Space>
          <span className="text-gray-600">Lọc theo trạng thái:</span>
          <Select
            defaultValue="all"
            style={{ width: 150 }}
            onChange={handleStatusChange}
          >
            <Option value="all">Tất cả</Option>
            <Option value="PENDING">Đang chờ</Option>
            <Option value="CONFIRMED">Đã xác nhận</Option>
            <Option value="SHIPPED">Đang giao</Option>
            <Option value="DELIVERED">Đã giao</Option>
            <Option value="CANCELLED">Đã hủy</Option>
          </Select>
        </Space>
      </div>

      {orders.length > 0 ? (
        <>
          <Table
            columns={columns}
            dataSource={orders}
            pagination={false}
            rowKey="id"
            className="mb-6"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="text-lg font-medium">
              Tổng tiền: <span className="text-blue-600">{formatCurrency(totalAmount)}</span>
            </div>
            <Pagination
              current={pagination.current}
              total={pagination.total}
              pageSize={pagination.pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      ) : (
        <Empty description="Bạn chưa có đơn hàng nào" />
      )}
      
      {/* Add the DetailModal component */}
      <DetailModal
        visible={isDetailModalVisible}
        order={selectedOrder}
        onClose={() => setIsDetailModalVisible(false)}
      />
    </div>
  );
};

export default OrderComponents;
