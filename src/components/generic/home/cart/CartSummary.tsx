import React from 'react';
import { useCart } from '../../../../contexts/CartContext';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ShoppingOutlined, CreditCardOutlined } from '@ant-design/icons';

interface CartSummaryProps {
  selectedItems: string[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ selectedItems }) => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tổng đơn hàng</h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <span className="text-gray-600">Tạm tính</span>
          <span className="font-medium">{totalPrice.toLocaleString()}đ</span>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <span className="text-gray-600">Thuế</span>
          <span className="font-medium">0đ</span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-bold text-gray-800">Tổng cộng</span>
          <span className="text-xl font-bold text-blue-600">
            {totalPrice.toLocaleString()}đ
          </span>
        </div>

        <p className="text-sm text-gray-500 italic">
          (Chưa bao gồm phí vận chuyển)
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <Button
          type="primary"
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          onClick={() => navigate('/checkout')}
          disabled={selectedItems.length === 0}
          icon={<CreditCardOutlined />}
        >
          <span className="text-base font-medium ml-2">
            Tiến hành thanh toán
          </span>
        </Button>

        <Button
          type="default"
          className="w-full h-12 border border-gray-200 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
          onClick={() => navigate('/product')}
          icon={<ShoppingOutlined />}
        >
          <span className="text-base font-medium ml-2">Tiếp tục mua sắm</span>
        </Button>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-center space-x-4">
          <img
            src="https://payos.vn/wp-content/uploads/sites/13/2023/07/payos-logo.svg"
            alt="PayOS"
            className="h-8 w-auto object-contain"
          />
        </div>
        <p className="text-xs text-center text-gray-500 mt-3">
          Giao dịch an toàn & bảo mật
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
