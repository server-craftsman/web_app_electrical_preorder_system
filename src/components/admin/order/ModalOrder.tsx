import React from 'react';
import { Modal, Descriptions, Tag, Divider, Image, Row, Col, Timeline } from 'antd';
import { OrderViewResModel } from '../../../models/api/response/order.res.model';
import { formatCurrency } from '../../../utils/helper';
import { OrderStatus } from '../../../app/enums';
import moment from 'moment';
import {
  ShoppingCartOutlined,
  CheckCircleOutlined,
  CarOutlined,
  InboxOutlined,
  CloseCircleOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

interface ModalOrderProps {
  visible: boolean;
  onClose: () => void;
  orderData: OrderViewResModel | null;
}

const ModalOrder: React.FC<ModalOrderProps> = ({ visible, onClose, orderData }) => {
  if (!orderData) return null;

  const getStatusColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      PENDING: 'orange',
      CONFIRMED: 'blue',
      SHIPPED: 'cyan',
      DELIVERED: 'green',
      CANCELLED: 'red',
    };
    return colors[status] || 'default';
  };

  const getStatusIcon = (status: OrderStatus) => {
    const icons = {
      PENDING: <ShoppingCartOutlined />,
      CONFIRMED: <CheckCircleOutlined />,
      SHIPPED: <CarOutlined />,
      DELIVERED: <InboxOutlined />,
      CANCELLED: <CloseCircleOutlined />,
    };
    return icons[status] || <ShoppingCartOutlined />;
  };

  const getStatusText = (status: OrderStatus) => {
    const texts = {
      PENDING: 'Chờ xác nhận',
      CONFIRMED: 'Đã xác nhận',
      SHIPPED: 'Đang giao hàng',
      DELIVERED: 'Đã giao hàng',
      CANCELLED: 'Đã hủy',
    };
    return texts[status] || status;
  };

  return (
    <Modal
      title={
        <div className="flex items-center text-lg">
          <ShoppingCartOutlined className="mr-2 text-blue-500" />
          Chi tiết đơn hàng #{orderData.id.substring(0, 8)}
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      className="order-detail-modal"
    >
      <div className="p-2">
        <Row gutter={24}>
          <Col span={16}>
            <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <UserOutlined className="mr-2 text-blue-500" /> Thông tin khách hàng
              </h3>
              <Descriptions column={1} className="mb-0">
                <Descriptions.Item label="Họ tên">
                  {orderData.user.fullname}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {orderData.user.email}
                </Descriptions.Item>
                {orderData.user.phoneNumber && (
                  <Descriptions.Item label="Số điện thoại">
                    <div className="flex items-center">
                      <PhoneOutlined className="mr-1 text-green-500" />
                      {orderData.user.phoneNumber}
                    </div>
                  </Descriptions.Item>
                )}
                {orderData.user.address && (
                  <Descriptions.Item label="Địa chỉ">
                    <div className="flex items-center">
                      <EnvironmentOutlined className="mr-1 text-red-500" />
                      {orderData.user.address}
                    </div>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium mb-3">Thông tin sản phẩm</h3>
              <div className="flex mb-4">
                <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden mr-4">
                  {orderData.campaign.product.imageProducts && 
                   orderData.campaign.product.imageProducts.length > 0 ? (
                    <Image 
                      src={orderData.campaign.product.imageProducts[0].imageUrl} 
                      alt={orderData.campaign.product.name}
                      width={80}
                      height={80}
                      preview={false}
                    />
                  ) : (
                    <InboxOutlined style={{ fontSize: 24, color: '#d9d9d9' }} />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-base mb-1">{orderData.campaign.product.name}</h4>
                  <p className="text-gray-500 text-sm mb-1">Mã sản phẩm: {orderData.campaign.product.productCode}</p>
                  <p className="text-gray-500 text-sm mb-1">Chiến dịch: {orderData.campaign.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-blue-600 font-medium">
                      {formatCurrency(orderData.totalAmount / orderData.quantity)}đ
                    </span>
                    <span className="text-gray-500">x{orderData.quantity}</span>
                  </div>
                </div>
              </div>
              
              <Divider className="my-3" />
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tổng tiền:</span>
                <span className="text-xl font-bold text-red-500">
                  {formatCurrency(orderData.totalAmount)}đ
                </span>
              </div>
            </div>
          </Col>
          
          <Col span={8}>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <CalendarOutlined className="mr-2 text-blue-500" /> Thông tin đơn hàng
              </h3>
              
              <div className="mb-3">
                <div className="text-gray-500 text-sm mb-1">Trạng thái</div>
                <Tag color={getStatusColor(orderData.status)} className="px-3 py-1">
                  {getStatusIcon(orderData.status)} {getStatusText(orderData.status)}
                </Tag>
              </div>
              
              <div className="mb-3">
                <div className="text-gray-500 text-sm mb-1">Ngày đặt hàng</div>
                <div className="font-medium">
                  {moment(orderData.createdAt).format('DD/MM/YYYY HH:mm')}
                </div>
              </div>
              
              {orderData.updatedAt && (
                <div className="mb-3">
                  <div className="text-gray-500 text-sm mb-1">Cập nhật lần cuối</div>
                  <div className="font-medium">
                    {moment(orderData.updatedAt).format('DD/MM/YYYY HH:mm')}
                  </div>
                </div>
              )}
              
              <Divider className="my-3" />
              
              <h3 className="text-base font-medium mb-3">Lịch sử đơn hàng</h3>
              <Timeline
                items={[
                  {
                    color: 'green',
                    children: (
                      <div>
                        <p className="mb-0 font-medium">Đơn hàng được tạo</p>
                        <p className="text-gray-500 text-xs">
                          {moment(orderData.createdAt).format('DD/MM/YYYY HH:mm')}
                        </p>
                      </div>
                    ),
                  },
                  ...(orderData.status !== 'PENDING' && orderData.status !== 'CANCELLED' ? [
                    {
                      color: 'blue',
                      children: (
                        <div>
                          <p className="mb-0 font-medium">Đơn hàng được xác nhận</p>
                          <p className="text-gray-500 text-xs">
                            {moment(orderData.updatedAt).format('DD/MM/YYYY HH:mm')}
                          </p>
                        </div>
                      ),
                    }
                  ] : []),
                  ...(orderData.status === 'CANCELLED' ? [
                    {
                      color: 'red',
                      children: (
                        <div>
                          <p className="mb-0 font-medium">Đơn hàng bị hủy</p>
                          <p className="text-gray-500 text-xs">
                            {moment(orderData.updatedAt).format('DD/MM/YYYY HH:mm')}
                          </p>
                        </div>
                      ),
                    }
                  ] : []),
                  ...(orderData.status === 'SHIPPED' || orderData.status === 'DELIVERED' ? [
                    {
                      color: 'cyan',
                      children: (
                        <div>
                          <p className="mb-0 font-medium">Đơn hàng đang giao</p>
                          <p className="text-gray-500 text-xs">
                            {moment(orderData.updatedAt).format('DD/MM/YYYY HH:mm')}
                          </p>
                        </div>
                      ),
                    }
                  ] : []),
                  ...(orderData.status === 'DELIVERED' ? [
                    {
                      color: 'green',
                      children: (
                        <div>
                          <p className="mb-0 font-medium">Đơn hàng đã giao</p>
                          <p className="text-gray-500 text-xs">
                            {moment(orderData.updatedAt).format('DD/MM/YYYY HH:mm')}
                          </p>
                        </div>
                      ),
                    }
                  ] : []),
                ]}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default ModalOrder
