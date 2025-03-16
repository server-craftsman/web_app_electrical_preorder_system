import React, { useState } from 'react';
import { Card, Typography, Radio, Button, Divider, InputNumber } from 'antd';
import {
  CreditCardOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useCart } from '../../../../contexts/CartContext';
const { Title, Text } = Typography;

interface CheckoutShippingProps {
  shippingInfo: any;
  isFormValid: boolean;
  onCheckout: () => void;
}

const CheckoutShipping: React.FC<CheckoutShippingProps> = ({ onCheckout }) => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const { cartItems } = useCart();
  const [quantity, setQuantity] = useState(
    cartItems.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6">
      <div className="flex items-center justify-between mb-6">
        <Title level={3} className="text-gray-800 m-0 font-bold">
          Phương thức thanh toán
        </Title>
        <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
      </div>

      <div className="mt-4">
        <div className="mb-6">
          <Text strong className="text-gray-700 block mb-2">
            Số lượng sản phẩm:
          </Text>
          <InputNumber
            min={1}
            value={quantity}
            onChange={(value) => setQuantity(value as number)}
            className="w-32"
            size="large"
          />
        </div>

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
          >
            <span className="ml-2 font-medium">
              {paymentMethod === 'cod'
                ? 'Hoàn tất đặt hàng'
                : 'Thanh toán ngay'}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutShipping;
