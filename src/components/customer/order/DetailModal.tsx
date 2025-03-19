import React from 'react';
import { Modal, Descriptions, Tag, Image } from 'antd';
import { OrderViewResModel } from '../../../models/api/response/order.res.model';
import { formatCurrency } from '../../../utils/helper';
import moment from 'moment';
import { OrderStatus } from '../../../app/enums';

interface DetailModalProps {
  visible: boolean;
  order: OrderViewResModel | null;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ visible, order, onClose }) => {
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

  if (!order) return null;

  return (
    <Modal
      title={<div className="text-xl font-bold">Chi tiết đơn hàng</div>}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="p-4">
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Mã đơn hàng" span={2}>
            {order.id}
          </Descriptions.Item>

          <Descriptions.Item label="Trạng thái" span={2}>
            <Tag color={getStatusColor(order.status)}>{order.status}</Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Thông tin sản phẩm" span={2}>
            <div className="flex items-start space-x-4">
              {order.campaign.product.imageProducts && order.campaign.product.imageProducts[0] && (
                <Image
                  src={order.campaign.product.imageProducts[0].imageUrl}
                  alt={order.campaign.product.name}
                  width={100}
                  className="rounded-lg"
                />
              )}
              <div>
                <div className="font-medium text-lg">{order.campaign.product.name}</div>
                <div className="text-gray-500">{order.campaign.name}</div>
                <div className="text-sm mt-2">
                  Giá: {formatCurrency(order.campaign.product.price)}
                </div>
              </div>
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="Số lượng">
            {order.quantity}
          </Descriptions.Item>

          <Descriptions.Item label="Tổng tiền">
            <span className="text-blue-600 font-medium">
              {formatCurrency(order.totalAmount)}
            </span>
          </Descriptions.Item>

          <Descriptions.Item label="Thông tin người đặt" span={2}>
            <div>
              <div>Họ tên: {order.user.fullname}</div>
              <div>Email: {order.user.email}</div>
              <div>Số điện thoại: {order.user.phoneNumber}</div>
              <div>Địa chỉ: {order.user.address}</div>
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="Thời gian đặt hàng">
            {moment(order.createdAt).format('DD/MM/YYYY HH:mm')}
          </Descriptions.Item>

          <Descriptions.Item label="Cập nhật lần cuối">
            {moment(order.updatedAt).format('DD/MM/YYYY HH:mm')}
          </Descriptions.Item>

          <Descriptions.Item label="Thông tin chiến dịch" span={2}>
            <div>
              <div>Tên chiến dịch: {order.campaign.name}</div>
              <div>Thời gian bắt đầu: {moment(order.campaign.startDate).format('DD/MM/YYYY HH:mm')}</div>
              <div>Thời gian kết thúc: {moment(order.campaign.endDate).format('DD/MM/YYYY HH:mm')}</div>
              <div>Số lượng tối thiểu: {order.campaign.minQuantity}</div>
              <div>Số lượng tối đa: {order.campaign.maxQuantity}</div>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  );
};

export default DetailModal;