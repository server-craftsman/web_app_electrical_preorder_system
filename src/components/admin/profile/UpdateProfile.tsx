import React, { useState, useEffect, useRef } from 'react';
import { Modal, Input, Form, Button, Avatar } from 'antd';
import { UserService } from '../../../services/user/user.service';
import { useAuth } from '../../../contexts/AuthContexts';
import { helper } from '../../../utils';
import { User } from '../../../models/modules/User';
import { CameraOutlined, UserOutlined } from '@ant-design/icons';

interface UpdateProfileProps {
  visible: boolean;
  onClose: () => void;
  onUpdated: () => void;
  profile: User | null;
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({
  visible,
  onClose,
  onUpdated,
  profile,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const { getCurrentUser } = useAuth();
  const currentUser = getCurrentUser();
  const userId = currentUser?.id;

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (visible && profile) {
      form.setFieldsValue({
        fullname: profile.fullname,
        address: profile.address,
        phoneNumber: profile.phoneNumber,
      });

      // Reset avatar preview when modal opens
      setPreviewAvatar(profile.avatar || null);
      setAvatarFile(null);
    }
  }, [visible, profile, form]);

  const isValidUUID = (id: string) => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      id
    );
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      helper.notificationMessage(
        'Please upload an image file (JPEG, PNG, GIF)',
        'warning'
      );
      return;
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      helper.notificationMessage('Image size should not exceed 2MB', 'warning');
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreviewAvatar(previewUrl);
    setAvatarFile(file);
  };

  const handleUpdate = async () => {
    try {
      if (!userId) {
        helper.notificationMessage('User ID is missing!', 'warning');
        return;
      }

      if (!isValidUUID(userId)) {
        helper.notificationMessage('Invalid User ID format!', 'warning');
        return;
      }

      setLoading(true);
      const values = await form.validateFields();

      // Create user data object
      const userData = {
        fullname: values.fullname,
        address: values.address || '',
        phoneNumber: values.phoneNumber || '',
      };

      // Use updateWithAvatar method with correct parameters
      await UserService.updateWithAvatar(
        userId,
        userData,
        avatarFile || undefined
      );

      helper.notificationMessage('Profile updated successfully!', 'success');
      onUpdated(); // Refresh data
      onClose(); // Close modal

      // Clean up preview URL
      if (previewAvatar && avatarFile) {
        URL.revokeObjectURL(previewAvatar);
      }
    } catch (error) {
      helper.notificationMessage('Failed to update profile!', 'warning');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="text-xl font-semibold text-gray-800">
          Update Profile
        </div>
      }
      open={visible}
      onCancel={onClose}
      width={500}
      centered
      footer={[
        <Button key="cancel" onClick={onClose} className="px-5">
          Cancel
        </Button>,
        <Button
          key="update"
          type="primary"
          loading={loading}
          onClick={handleUpdate}
          className="bg-indigo-600 hover:bg-indigo-700 border-indigo-600 px-5"
        >
          Update
        </Button>,
      ]}
      className="profile-update-modal"
    >
      <div className="flex justify-center mb-6">
        <div className="relative">
          <Avatar
            size={100}
            src={previewAvatar || profile?.avatar}
            icon={<UserOutlined />}
            className="border-2 border-gray-200"
          />
          <button
            onClick={handleAvatarClick}
            className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-indigo-700 transition-all duration-200"
            type="button"
          >
            <CameraOutlined />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <Form form={form} layout="vertical">
        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[{ required: true, message: 'Full Name is required' }]}
        >
          <Input className="rounded-lg py-2" />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input className="rounded-lg py-2" />
        </Form.Item>

        <Form.Item label="Phone Number" name="phoneNumber">
          <Input className="rounded-lg py-2" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProfile;
