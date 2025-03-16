import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Radio, Button, Divider } from 'antd';
import {
  CreditCardOutlined,
  DollarOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const CheckoutShipping: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const navigate = useNavigate();
  const successUrl = 'http://localhost:3000/payment-success';
  const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(successUrl)}&size=200`;

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

        {paymentMethod === 'payos' && (
          <div className="mt-6 flex flex-col items-center bg-blue-50 p-6 rounded-xl border border-blue-100">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <SafetyOutlined className="text-blue-600 text-2xl" />
            </div>
            <Title level={4} className="text-gray-800 m-0 mb-4">
              Quét mã QR để thanh toán
            </Title>

            <div className="bg-white p-3 rounded-xl shadow-sm">
              <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
            </div>

            <p className="text-gray-600 text-sm mt-4 text-center max-w-md">
              Sử dụng ứng dụng ngân hàng hoặc ví điện tử để quét mã QR. Sau khi
              quét, bạn sẽ được chuyển đến trang xác nhận thanh toán.
            </p>

            <Button
              type="primary"
              className="mt-6 h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-500 border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => navigate('/payment-success')}
              icon={<CheckCircleOutlined />}
            >
              <span className="ml-2 font-medium">Tôi đã thanh toán</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutShipping;
