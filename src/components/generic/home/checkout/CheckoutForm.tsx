import { useEffect } from 'react';
import { Input, Form, Row, Col, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTER_URL } from '../../../../const';
import { useAuth } from '../../../../contexts/AuthContexts';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  BankOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const CheckoutForm: React.FC = () => {
  const { getCurrentUser, logout } = useAuth();
  const user = getCurrentUser();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue({
      fullName: user?.fullName || '',
      email: user?.email || user?.sub || '',
      phone: '',
      district: '',
      city: '',
      address: '',
    });
  }, [user, form]);

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <Title level={3} className="text-gray-800 m-0 font-bold">
          Thông tin vận chuyển
        </Title>
        <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
      </div>

      {user ? (
        <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <UserOutlined className="text-blue-500 text-lg" />
            </div>
            <Text strong className="text-gray-700">
              {user.fullName} - {user.email || user.sub}
            </Text>
          </div>
          <Button
            type="link"
            onClick={() => {
              logout();
              navigate(ROUTER_URL.LOGIN);
            }}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Đăng xuất
          </Button>
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 flex items-center">
          <Text className="text-gray-600">
            Đã có tài khoản?{' '}
            <a
              onClick={() => navigate(ROUTER_URL.LOGIN)}
              className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              Đăng nhập
            </a>
          </Text>
        </div>
      )}

      <Form form={form} layout="vertical" className="mt-4">
        <Form.Item
          name="fullName"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          className="mb-5"
        >
          <Input
            prefix={<UserOutlined className="text-gray-400 mr-2" />}
            placeholder="Họ và tên"
            size="large"
            className="rounded-lg py-2 px-4"
          />
        </Form.Item>

        <Row gutter={20}>
          <Col span={16}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
              className="mb-5"
            >
              <Input
                prefix={<MailOutlined className="text-gray-400 mr-2" />}
                placeholder="Email"
                size="large"
                className="rounded-lg py-2 px-4"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
              ]}
              className="mb-5"
            >
              <Input
                prefix={<PhoneOutlined className="text-gray-400 mr-2" />}
                placeholder="Điện thoại"
                size="large"
                className="rounded-lg py-2 px-4"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="address"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          className="mb-5"
        >
          <Input
            prefix={<HomeOutlined className="text-gray-400 mr-2" />}
            placeholder="Địa chỉ"
            size="large"
            className="rounded-lg py-2 px-4"
          />
        </Form.Item>

        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              name="district"
              rules={[
                { required: true, message: 'Vui lòng nhập quận, huyện!' },
              ]}
              className="mb-5"
            >
              <Input
                prefix={<EnvironmentOutlined className="text-gray-400 mr-2" />}
                placeholder="Quận, huyện"
                size="large"
                className="rounded-lg py-2 px-4"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="city"
              rules={[{ required: true, message: 'Vui lòng nhập thành phố!' }]}
              className="mb-5"
            >
              <Input
                prefix={<BankOutlined className="text-gray-400 mr-2" />}
                placeholder="Thành phố"
                size="large"
                className="rounded-lg py-2 px-4"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CheckoutForm;
