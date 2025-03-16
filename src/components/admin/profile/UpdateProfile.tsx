import React, { useState, useEffect } from 'react';
import { Modal, Input, Form, Button, message } from 'antd';
import { UserService } from '../../../services/user/user.service';
import { useAuth } from '../../../contexts/AuthContexts';
import { helper } from '../../../utils';

interface UpdateProfileProps {
  visible: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({
  visible,
  onClose,
  onUpdated,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { getCurrentUser } = useAuth();
  const currentUser = getCurrentUser();
  const userId = currentUser?.id;

  useEffect(() => {
    if (userId) {
      UserService.getById(userId).then((response) => {
        const userData = response.data?.data || response.data;
        form.setFieldsValue({
          fullname: userData.fullname,
          address: userData.address,
          phoneNumber: userData.phoneNumber,
        });
      });
    }
  }, [userId, form]);

  const isValidUUID = (id: string) => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      id
    );
  };

  const handleUpdate = async () => {
    try {
      if (!userId) {
        message.error('User ID is missing!');
        return;
      }

      if (!isValidUUID(userId)) {
        message.error('Invalid User ID format!'); // Thông báo lỗi nếu ID không hợp lệ
        return;
      }

      setLoading(true);
      const values = await form.validateFields();

      const updatedData = {
        fullname: values.fullname,
        address: values.address,
        phoneNumber: values.phoneNumber,
      };

      await UserService.update(userId, updatedData);
      helper.notificationMessage('Profile updated successfully!', 'success');
      onUpdated(); // Fetch lại dữ liệu mới
      onClose(); // Đóng modal
    } catch (error) {
      message.error('Failed to update profile!');
      helper.notificationMessage('Failed to update profile!', 'warning');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Update Profile"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="update"
          type="primary"
          loading={loading}
          onClick={handleUpdate}
        >
          Update
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[{ required: true, message: 'Full Name is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>

        <Form.Item label="Phone Number" name="phoneNumber">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProfile;
