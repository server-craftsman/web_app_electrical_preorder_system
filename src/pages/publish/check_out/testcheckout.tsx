import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button } from 'antd';

const { Title } = Typography;

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-6 shadow-lg">
        <Title level={2} className="text-green-600">
          Thanh toán thành công!
        </Title>

        <Button
          type="primary"
          className="mt-4 bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate('/')}
        >
          Quay về Trang Chủ
        </Button>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
