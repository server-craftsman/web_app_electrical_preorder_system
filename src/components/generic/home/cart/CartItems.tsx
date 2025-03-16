import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  InputNumber,
  Checkbox,
  notification,
  Empty,
} from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useCart } from '../../../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartItemProps {
  cartItems: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
  }[];
  setSelectedItems: (selected: string[]) => void;
}

const CartItem: React.FC<CartItemProps> = ({ cartItems, setSelectedItems }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [selected, setSelected] = useState<string[]>(
    cartItems.map((item) => item.id)
  );
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedItems(selected);
  }, [selected, setSelectedItems]);

  useEffect(() => {
    // Update selected items when cart items change
    setSelected((prev) =>
      prev.filter((id) => cartItems.some((item) => item.id === id))
    );
  }, [cartItems]);

  const handleSelect = (id: string, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? cartItems.map((item) => item.id) : []);
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setSelected((prev) => prev.filter((item) => item !== id));

    notification.config({
      top: 73,
    });

    notification.success({
      message: 'Thành công!',
      description: 'Đã xoá sản phẩm khỏi giỏ hàng.',
      placement: 'topRight',
      duration: 3,
    });
  };

  const columns = [
    {
      title: (
        <Checkbox
          checked={selected.length === cartItems.length && cartItems.length > 0}
          indeterminate={
            selected.length > 0 && selected.length < cartItems.length
          }
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      ),
      dataIndex: 'select',
      key: 'select',
      width: 50,
      render: (_: any, record: any) => (
        <Checkbox
          checked={selected.includes(record.id)}
          onChange={(e) => handleSelect(record.id, e.target.checked)}
        />
      ),
    },
    {
      title: (
        <span className="text-base font-medium text-gray-700">Sản phẩm</span>
      ),
      dataIndex: 'product',
      key: 'product',
      render: (_: any, record: any) => (
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-50 rounded-lg p-1 border border-gray-100 flex items-center justify-center">
            <img
              src={record.imageUrl}
              alt={record.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <span className="font-medium text-gray-800">{record.name}</span>
        </div>
      ),
    },
    {
      title: (
        <span className="text-base font-medium text-gray-700">Đơn giá</span>
      ),
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <span className="font-medium text-gray-800">
          {price.toLocaleString()}đ
        </span>
      ),
    },
    {
      title: (
        <span className="text-base font-medium text-gray-700">Số lượng</span>
      ),
      dataIndex: 'quantity',
      key: 'quantity',
      width: 180,
      render: (quantity: number, record: any) => (
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <Button
            type="text"
            icon={<MinusOutlined />}
            className="border-0 text-gray-500 hover:text-blue-600"
            onClick={() => updateQuantity(record.id, Math.max(1, quantity - 1))}
          />
          <InputNumber
            min={1}
            value={quantity}
            onChange={(value) => updateQuantity(record.id, Number(value))}
            className="w-12 border-0 text-center"
            controls={false}
          />
          <Button
            type="text"
            icon={<PlusOutlined />}
            className="border-0 text-gray-500 hover:text-blue-600"
            onClick={() => updateQuantity(record.id, quantity + 1)}
          />
        </div>
      ),
    },
    {
      title: (
        <span className="text-base font-medium text-gray-700">Thành tiền</span>
      ),
      key: 'total',
      render: (_: any, record: any) => (
        <span className="font-bold text-blue-600">
          {(record.price * record.quantity).toLocaleString()}đ
        </span>
      ),
    },
    {
      title: '',
      key: 'action',
      width: 70,
      render: (_: any, record: any) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          className="hover:bg-red-50 rounded-full"
          onClick={() => handleRemove(record.id)}
        />
      ),
    },
  ];

  if (cartItems.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md">
        <Empty
          description="Giỏ hàng của bạn đang trống"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          className="my-8"
        />
        <div className="text-center">
          <Button
            type="primary"
            className="h-12 px-8 bg-blue-600 rounded-lg"
            onClick={() => navigate('/product')}
          >
            Tiếp tục mua sắm
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-4">
        Giỏ hàng của bạn
      </h2>
      <Table
        columns={columns}
        dataSource={cartItems}
        rowKey="id"
        pagination={false}
        className="cart-table"
        rowClassName="hover:bg-gray-50 transition-colors"
        locale={{
          emptyText: (
            <Empty
              description="Giỏ hàng của bạn đang trống"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
      />
      <style>{`
        .cart-table .ant-table {
          border-radius: 12px;
          overflow: hidden;
        }
        .cart-table .ant-table-thead > tr > th {
          background-color: #f9fafb;
          padding: 16px 8px;
        }
        .cart-table .ant-table-tbody > tr > td {
          padding: 16px 8px;
        }
      `}</style>
    </div>
  );
};

export default CartItem;
