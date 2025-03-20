import { useState, useEffect } from 'react';
import { Table, Tag, message } from 'antd';
import { formatCurrency } from '../../../utils/helper';
import Pagination from '../../pagination';
import { PaymentService } from '../../../services/payment/payment.service';
import { OrderService } from '../../../services/order/order.service';

const OrdersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  const fetchOrders = async (page: number) => {
    try {
      setLoading(true);
      // First, get payments
      const paymentResponse = await PaymentService.getPayment(page - 1, pageSize);
      
      if (paymentResponse.data?.data?.payments) {
        // Extract order IDs from payments
        const orderIds = paymentResponse.data.data.payments.flatMap(payment => payment.orderIds);
        
        // Fetch orders for these IDs
        const orderPromises = orderIds.map(_id => OrderService.viewOrderByAdmin('PENDING', 0, 1));
        const orderResponses = await Promise.all(orderPromises);
        
        // Combine payment and order data
        const combinedData = paymentResponse.data.data.payments.map((payment, index) => {
          const order = orderResponses[index]?.data?.data?.orders?.[0];
          return {
            key: payment.id,
            order: payment.orderIds[0] || 'N/A',
            date: payment.date ? new Date(payment.date).toLocaleDateString() : 
                  new Date(payment.createdAt).toLocaleDateString(),
            customer: order?.user?.fullname || 'N/A',
            payment: payment.status === 'PAID' ? 'Thành công' : 'Đang chờ',
            total: payment.amount.toString(),
            // delivery: order?.deliveryStatus || 'N/A',
            items: order?.quantity || 0,
            fulfillment: order?.status === 'CONFIRMED' ? 'Hoàn thành' : 'Chưa hoàn thành',
            method: payment.method
          };
        });

        setOrders(combinedData);
        setTotalElements(paymentResponse.data.data.totalElements);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      message.error('Không thể tải dữ liệu đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const columns = [
    {
      title: 'Đơn hàng',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Phương thức',
      dataIndex: 'method',
      key: 'method',
      render: (method: string) => (
        <Tag color="blue">{method}</Tag>
      ),
    },
    {
      title: 'Thanh toán',
      dataIndex: 'payment',
      render: (status: 'Thành công' | 'Đang chờ') => (
        <Tag color={status === 'Thành công' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
    {
      title: 'Tổng cộng',
      dataIndex: 'total',
      key: 'total',
      render: (total: string) => formatCurrency(Number(total)),
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'items',
      key: 'items',
    },
    {
      title: 'Hoàn thành',
      dataIndex: 'fulfillment',
      render: (status: 'Hoàn thành' | 'Chưa hoàn thành') => (
        <Tag color={status === 'Hoàn thành' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
  ];

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={orders}
      pagination={false}
      footer={() => (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalElements / pageSize)}
          onPageChange={setCurrentPage}
        />
      )}
    />
  );
};

export default OrdersTable;
