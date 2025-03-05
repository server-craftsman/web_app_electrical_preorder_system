import { useEffect } from "react";
import { Input, Form, Row, Col, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTER_URL } from '../../../../const';
import { useAuth } from '../../../../contexts/AuthContexts';

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
        <div className="">
            <Title level={3}>Thông tin vận chuyển</Title>

            {user ? (
                <div className="account-info">
                    <Text strong>
                        Tài khoản: {user.fullName} - {user.email || user.sub}
                    </Text>
                    <Button
                        type="link"
                        onClick={() => {
                            logout();
                            navigate(ROUTER_URL.LOGIN);
                        }}
                        style={{ color: "#facc15" }}
                    >
                        (Đăng xuất)
                    </Button>
                </div>
            ) : (
                <Text>
                    Đã có tài khoản?{" "}
                    <a onClick={() => navigate(ROUTER_URL.LOGIN)} style={{ color: "#facc15", cursor: "pointer" }}>
                        Đăng nhập
                    </a>
                </Text>
            )}


            <Form form={form} layout="vertical" className="mt-4">
                <Form.Item name="fullName" rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}>
                    <Input placeholder="Họ và tên" size="large" />
                </Form.Item>

                <Row gutter={20}>
                    <Col span={16}>
                        <Form.Item name="email" rules={[{ required: true, message: "Vui lòng nhập email!" }]}>
                            <Input placeholder="E-mail" size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="phone" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
                            <Input placeholder="Điện thoại" size="large" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item name="district" rules={[{ required: true, message: "Vui lòng nhập quận, huyện!" }]}>
                            <Input placeholder="Quận, huyện" size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="city" rules={[{ required: true, message: "Vui lòng nhập thành phố!" }]}>
                            <Input placeholder="Thành phố" size="large" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="address" rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}>
                    <Input placeholder="Địa chỉ" size="large" />
                </Form.Item>

            </Form>
        </div>
    );
};

export default CheckoutForm;
