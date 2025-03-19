import React, { useState } from 'react';
import { Modal, Typography, Button, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { OrderService } from '../../../services/order/order.service';
import { OrderViewResModel } from '../../../models/api/response/order.res.model';

const { Text, Title } = Typography;

interface ModalDeleteProps {
  visible: boolean;
  onClose: () => void;
  orderData: OrderViewResModel | null;
  onSuccess: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ 
  visible, 
  onClose, 
  orderData, 
  onSuccess 
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!orderData) return;
    
    try {
      setLoading(true);
      await OrderService.deleteOrder(orderData.id);
      message.success('Đơn hàng đã được hủy thành công');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error deleting order:', error);
      message.error('Không thể hủy đơn hàng. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center text-red-500">
          <ExclamationCircleOutlined className="mr-2 text-xl" />
          <span>Xác nhận hủy đơn hàng</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
    >
      <div className="py-4">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <ExclamationCircleOutlined className="text-3xl text-red-500" />
          </div>
          <Title level={4} className="text-center mb-2">
            Bạn có chắc chắn muốn hủy đơn hàng này?
          </Title>
          <Text className="text-gray-500 text-center">
            Hành động này không thể hoàn tác. Đơn hàng sẽ bị hủy vĩnh viễn.
          </Text>
        </div>

        {orderData && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Text type="secondary">Mã đơn hàng:</Text>
                <div className="font-medium">{orderData.id.substring(0, 8)}...</div>
              </div>
              <div>
                <Text type="secondary">Khách hàng:</Text>
                <div className="font-medium">{orderData.user.fullname}</div>
              </div>
              <div>
                <Text type="secondary">Sản phẩm:</Text>
                <div className="font-medium">{orderData.campaign.product.name}</div>
              </div>
              <div>
                <Text type="secondary">Tổng tiền:</Text>
                <div className="font-medium text-red-500">
                  {new Intl.NumberFormat('vi-VN').format(orderData.totalAmount)}đ
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <Button onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button 
            type="primary" 
            danger 
            loading={loading}
            onClick={handleDelete}
          >
            Xác nhận hủy đơn hàng
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDelete;