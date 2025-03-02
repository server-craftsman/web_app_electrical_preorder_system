import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import { UserService } from '../../../services/user/user.service';
import { UserRole } from '../../../app/enums/user.enum';
import { Rule } from 'antd/es/form';
import { helper } from '../../../utils';
import { InfoCircleOutlined } from '@ant-design/icons';

interface CreateUserProps {
  onUserCreated: () => void; // Refresh danh sách user sau khi tạo
  onClose: () => void; // Đóng modal
  formRef?: React.MutableRefObject<any>; // Add form reference prop
}

const CreateUser: React.FC<CreateUserProps> = ({ onUserCreated, onClose, formRef }) => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    if (formRef) {
      formRef.current = form; // Directly assign the form instance
    }
  }, [form, formRef]);

  useEffect(() => {
    setRoles(Object.values(UserRole));
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      const userData = {
        username: values.username,
        email: values.email,
        password: values.password,
        fullname: values.fullName,
        phoneNumber: values.phoneNumber,
        address: values.address,
        role: values.role,
        active: true,
      };

      await UserService.create(userData);
      helper.notificationMessage('Người dùng đã được tạo thành công!', 'success');
      form.resetFields();
      onUserCreated();
      onClose();
    } catch (error) {
      helper.notificationMessage('Lỗi khi tạo người dùng!', 'error');
      console.error(error);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.resetFields(); // Reset all form fields
    setRoles([]); // Reset roles state
    if (formRef) {
      formRef.current = null; // Clear the form reference
    }
    onClose();
  };

  const validateForm = {
    username: [
      {
        required: true,
        message: 'Vui lòng nhập tên đăng nhập',
      },
      {
        min: 3,
        message: 'Tên đăng nhập phải có ít nhất 3 ký tự',
      },
      {
        max: 20,
        message: 'Tên đăng nhập không được vượt quá 20 ký tự',
      },
      {
        pattern: /^\S*$/,
        message: 'Tên đăng nhập không được chứa khoảng trắng',
      },
    ],
    email: [
      {
        required: true,
        message: 'Vui lòng nhập email',
      },
      {
        type: 'email',
        message: 'Email không đúng định dạng',
      },
      {
        pattern: /^[a-zA-Z0-9._-]+@gmail\.com$/,
        message: 'Email phải có định dạng @gmail.com',
      },
    ],
    password: [
      {
        required: true,
        message: 'Vui lòng nhập mật khẩu',
      },
      {
        min: 8,
        message: 'Mật khẩu phải có ít nhất 8 ký tự',
      },
      {
        pattern: /^(?=.*[a-z])/,
        message: 'Mật khẩu phải chứa ít nhất 1 chữ thường',
      },
      {
        pattern: /^(?=.*[A-Z])/,
        message: 'Mật khẩu phải chứa ít nhất 1 chữ in hoa',
      },
      {
        pattern: /^(?=.*\d)/,
        message: 'Mật khẩu phải chứa ít nhất 1 số',
      },
      {
        pattern: /^(?=.*[@$!%*?&])/,
        message: 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt',
      },
    ],
    fullName: [
      {
        required: true,
        message: 'Vui lòng nhập họ và tên',
      },
      {
        min: 3,
        message: 'Họ và tên phải có ít nhất 3 ký tự',
      },
    ],
    phoneNumber: [
      {
        required: true,
        message: 'Vui lòng nhập số điện thoại',
      },
      {
        pattern: /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
        message: 'Số điện thoại không hợp lệ (Định dạng: 0xxxxxxxxx hoặc +84xxxxxxxxx)',
      },
    ],
    address: [
      {
        required: true,
        message: 'Vui lòng nhập địa chỉ',
      },
      {
        min: 3,
        message: 'Địa chỉ phải có ít nhất 3 ký tự',
      },
    ],
    role: [
      {
        required: true,
        message: 'Vui lòng chọn vai trò',
      },
    ],
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit} validateTrigger={['onChange', 'onBlur']}>
      <Form.Item
        name="username"
        label="Tên đăng nhập"
        rules={validateForm.username}
        tooltip={{
          title: 'Tên đăng nhập phải có 3-20 ký tự và không chứa khoảng trắng',
          icon: <InfoCircleOutlined />,
        }}
        hasFeedback
      >
        <Input placeholder="Nhập tên đăng nhập" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={validateForm.email as Rule[]}
        tooltip={{
          title: 'Email phải có định dạng @gmail.com',
          icon: <InfoCircleOutlined />,
        }}
        hasFeedback
      >
        <Input placeholder="Nhập email" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={validateForm.password as Rule[]}
        tooltip={{
          title: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt',
          icon: <InfoCircleOutlined />,
        }}
        hasFeedback
      >
        <Input.Password placeholder="Nhập mật khẩu" />
      </Form.Item>

      <Form.Item
        name="fullName"
        label="Họ và tên"
        rules={validateForm.fullName as Rule[]}
        hasFeedback
      >
        <Input placeholder="Nhập họ và tên" />
      </Form.Item>
      
      <Form.Item
        name="phoneNumber"
        label="Số điện thoại"
        rules={validateForm.phoneNumber as Rule[]}
        tooltip={{
          title: 'Định dạng: 0xxxxxxxxx hoặc +84xxxxxxxxx',
          icon: <InfoCircleOutlined />,
        }}
        hasFeedback
      >
        <Input placeholder="Nhập số điện thoại" />
      </Form.Item>
      
      <Form.Item
        name="address"
        label="Địa chỉ"
        rules={validateForm.address as Rule[]}
        hasFeedback
      >
        <Input placeholder="Nhập địa chỉ" />
      </Form.Item>
      
      <Form.Item
        name="role"
        label="Vai trò"
        rules={validateForm.role as Rule[]}
        hasFeedback
      >
        <Select placeholder="Chọn vai trò">
          {roles.map((role) => (
            <Select.Option key={role} value={role}>
              {role}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <button className="btn-custom" type="submit">
          Tạo người dùng
        </button>
        <button
          className="bg-gradient-to-r rounded-xl from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-black font-semibold py-2 px-4"
          onClick={handleCancel}
          style={{ marginLeft: '10px' }}
        >
          Hủy
        </button>
      </Form.Item>
    </Form>
  );
};

export default CreateUser;
