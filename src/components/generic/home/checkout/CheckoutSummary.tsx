import React from 'react';
import { useCart } from '../../../../contexts/CartContext';
import { Button, Divider, Badge } from 'antd';
import {
  PlusOutlined,
  MinusOutlined,
  ShoppingOutlined,
  GiftOutlined,
  TagOutlined,
} from '@ant-design/icons';

interface CheckoutSummaryProps {
  onProceed?: () => void;
  orderData?: {
    quantity: number;
    totalAmount: number;
    productName: string;
    campaignName: string;
    productPrice: number;
    imageUrl?: string;
  };
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ orderData }) => {
  const { cartItems, updateQuantity } = useCart();
  
  // Handle both cart and order data
  const isOrderCheckout = !!orderData;
  const subtotal = isOrderCheckout 
    ? orderData.totalAmount 
    : cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 0;
  const totalPrice = subtotal + shipping;

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ShoppingOutlined className="text-blue-500 text-xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800 m-0">
            Đơn hàng của bạn
          </h2>
        </div>
        <Badge
          count={isOrderCheckout ? orderData.quantity : cartItems.reduce((total, item) => total + item.quantity, 0)}
          showZero
          color="#3b82f6"
        />
      </div>

      {isOrderCheckout ? (
        // Order data display
        <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          <div className="mb-4 last:mb-0">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="relative">
                <div className="w-16 h-16 bg-white rounded-md p-1 border border-gray-100 flex items-center justify-center">
                  <img
                    src={orderData.imageUrl || '/placeholder.png'}
                    alt={orderData.productName}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <Badge
                  count={orderData.quantity}
                  className="absolute -top-2 -right-2"
                  style={{ backgroundColor: '#3b82f6' }}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 mb-1">
                  {orderData.productName}
                </h3>
                <p className="text-sm text-gray-500">{orderData.campaignName}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-600">Số lượng: {orderData.quantity}</span>
                  <span className="font-bold text-blue-600">
                    {orderData.productPrice.toLocaleString()}đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Cart items display (existing code)
        cartItems.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">
              <ShoppingOutlined />
            </div>
            <p className="text-gray-500">Giỏ hàng của bạn đang trống</p>
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {/* Existing cart items mapping */}
            {cartItems.map((item) => (
              <div key={item.id} className="mb-4 last:mb-0">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white rounded-md p-1 border border-gray-100 flex items-center justify-center">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <Badge
                      count={item.quantity}
                      className="absolute -top-2 -right-2"
                      style={{ backgroundColor: '#3b82f6' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Button
                          icon={<MinusOutlined />}
                          size="small"
                          className="border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        />
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          icon={<PlusOutlined />}
                          size="small"
                          className="border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        />
                      </div>
                      <span className="font-bold text-blue-600">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      <Divider className="my-6" />

      <div className="space-y-3">
        <div className="flex justify-between items-center text-gray-600">
          <span>Tạm tính</span>
          <span>{subtotal.toLocaleString()}đ</span>
        </div>
        <div className="flex justify-between items-center text-gray-600">
          <span>Phí vận chuyển</span>
          <span className="text-green-600 font-medium">Miễn phí</span>
        </div>

        <div className="pt-4 mt-2 border-t border-dashed border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">Tổng cộng</span>
            <span className="text-xl font-bold text-blue-600">
              {totalPrice.toLocaleString()}đ
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">
            (Đã bao gồm VAT nếu có)
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center text-gray-600 mb-3">
          <GiftOutlined className="text-green-600 mr-2" />
          <span className="text-sm">
            Đơn hàng của bạn đủ điều kiện để được giao hàng miễn phí
          </span>
        </div>
        <div className="flex items-center text-gray-600">
          <TagOutlined className="text-blue-600 mr-2" />
          <span className="text-sm">
            Áp dụng mã giảm giá ở bước tiếp theo
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
