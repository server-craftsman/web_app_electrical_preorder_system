import React, { useState, useMemo, useEffect } from 'react';
import { Card, Typography, Radio, Button, Divider, Badge } from 'antd';
import {
  CreditCardOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useCart } from '../../../../contexts/CartContext';
import { PaymentMethod } from '../../../../app/enums';
const { Title, Text } = Typography;

interface CheckoutShippingProps {
  shippingInfo: any;
  isFormValid: boolean;
  onCheckout: () => void;
}

const CheckoutShipping: React.FC<CheckoutShippingProps> = ({
  shippingInfo,
  isFormValid,
  onCheckout,
}) => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const { cartItems } = useCart();

  // Calculate total quantity from cart items
  const totalQuantity = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  }, [cartItems]);

  // Update payment method in parent component when it changes
  useEffect(() => {
    if (shippingInfo) {
      shippingInfo.paymentMethod =
        paymentMethod === 'cod'
          ? PaymentMethod.CASH
          : PaymentMethod.BANK_TRANSFER;
    }
  }, [paymentMethod, shippingInfo]);

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6">
      <div className="flex items-center justify-between mb-6">
        <Title level={3} className="text-gray-800 m-0 font-bold">
          Phương thức thanh toán
        </Title>
        <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
      </div>

      <div className="mt-4">
        <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
          <Radio.Group
            onChange={(e) => setPaymentMethod(e.target.value)}
            value={paymentMethod}
            className="w-full"
          >
            <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
              <Radio value="cod" className="w-full">
                <div className="flex items-center ml-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <DollarOutlined className="text-green-600 text-lg" />
                  </div>
                  <div>
                    <Text strong className="text-gray-800">
                      Thanh toán khi giao hàng (COD)
                    </Text>
                    <p className="text-gray-500 text-sm m-0">
                      Thanh toán bằng tiền mặt khi nhận hàng
                    </p>
                  </div>
                </div>
              </Radio>
            </div>

            <Divider className="m-0" />

            <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
              <Radio value="payos" className="w-full">
                <div className="flex items-center ml-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <CreditCardOutlined className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <Text strong className="text-gray-800">
                      Thanh toán online qua PayOS
                    </Text>
                    <p className="text-gray-500 text-sm m-0">
                      Thanh toán an toàn với PayOS
                    </p>
                  </div>
                </div>
              </Radio>
            </div>
          </Radio.Group>
        </Card>

        <div className="mt-6 flex justify-center">
          <Button
            type="primary"
            size="large"
            icon={<ShoppingCartOutlined />}
            className="h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-500 border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            onClick={onCheckout}
            disabled={!isFormValid || cartItems.length === 0}
          >
            <span className="ml-2 font-medium">
              {paymentMethod === 'cod'
                ? 'Hoàn tất đặt hàng'
                : 'Thanh toán ngay'}
            </span>
            <Badge
              count={totalQuantity}
              className="ml-2"
              style={{
                backgroundColor: '#fff',
                color: '#1890ff',
                boxShadow: '0 0 0 1px #1890ff inset',
              }}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutShipping;
