import { useState } from 'react';
import { Table, Tag } from 'antd';
import { overview } from '../../../data/overview.json';
import { formatCurrency } from '../../../utils/helper';
import Pagination from '../../pagination';

const OrdersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
      title: 'Giao hàng',
      dataIndex: 'delivery',
      key: 'delivery',
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
      columns={columns}
      dataSource={overview}
      rowKey="order"
      pagination={false}
      footer={() => (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(overview.length / 10)}
          onPageChange={setCurrentPage}
        />
      )}
    />
  );
};

export default OrdersTable;
