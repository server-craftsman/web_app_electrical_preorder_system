import React, { useEffect, useState } from "react";
import { Form, Input, Select, message } from "antd";
import { UserService } from "../../../services/user/user.service"; // Import service API
import { UserRole } from "../../../app/enums/user.role"; // Import danh sách vai trò
import { Rule } from "antd/es/form";
import { helper } from "../../../utils";

interface CreateUserProps {
  onUserCreated: () => void; // Refresh danh sách user sau khi tạo
  onClose: () => void; // Đóng modal
}

const CreateUser: React.FC<CreateUserProps> = ({ onUserCreated, onClose }) => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    // Lấy danh sách vai trò từ user.role.ts
    setRoles(Object.values(UserRole));
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      const userData = {
        username: values.username,
        email: values.email,
        password: values.password,
        fullname: values.fullName, // Chắc chắn fullname không bị null
        phoneNumber: values.phoneNumber,
        address: values.address,
        role: values.role,
        active: true,
      };

      await UserService.create(userData);
      helper.notificationMessage("Người dùng đã được tạo thành công!", "success");
      form.resetFields();
      onUserCreated();
      onClose();
    } catch (error) {
      helper.notificationMessage("Lỗi khi tạo người dùng!", "error");
      console.error(error);
    } finally {
      console.log("fetch data success!");
    }
  };

  const handleCancel = () => {
    form.resetFields(); // Xóa dữ liệu trong form
    onClose(); // Đóng modal
  };

  const validateForm = {
    username: [
      {
        required: true,
        message: "Vui lòng nhập tên đăng nhập",
        min: 3,
        max: 20,
      },
    ],
    email: [
      {
        required: true,
        type: "email",
        message: "Vui lòng nhập email hợp lệ",
        pattern: /^[a-zA-Z0-9._-]+@gmail\.com$/,
        validator: (_: any, value: string) => {
          if (!value) return Promise.resolve();
          if (!value.endsWith('@gmail.com')) {
            return Promise.reject('Email phải có định dạng @gmail.com');
          }
          return Promise.resolve();
        }
      },
    ],
    password: [
      {
        required: true,
        message: "Vui lòng nhập mật khẩu",
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        validator: (_: any, value: string) => {
          if (!value) return Promise.resolve();
          if (!/^(?=.*[a-z])/.test(value)) {
            return Promise.reject('Mật khẩu phải chứa ít nhất 1 chữ thường');
          }
          if (!/^(?=.*[A-Z])/.test(value)) {
            return Promise.reject('Mật khẩu phải chứa ít nhất 1 chữ in hoa');
          }
          if (!/^(?=.*\d)/.test(value)) {
            return Promise.reject('Mật khẩu phải chứa ít nhất 1 số');
          }
          if (!/^(?=.*[@$!%*?&])/.test(value)) {
            return Promise.reject('Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt');
          }
          if (value.length < 8) {
            return Promise.reject('Mật khẩu phải có ít nhất 8 ký tự');
          }
          return Promise.resolve();
        }
      },
    ],
    fullName: [
      {
        required: true,
        message: "Vui lòng nhập họ và tên",
        min: 3,
      },
    ],
    phoneNumber: [
      {
        required: true,
        message: "Vui lòng nhập số điện thoại",
        pattern: /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
        validator: (_: any, value: string) => {
          if (!value) return Promise.resolve();
          if (!/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(value)) {
            return Promise.reject('Số điện thoại không hợp lệ (Định dạng: 0xxxxxxxxx hoặc +84xxxxxxxxx)');
          }
          return Promise.resolve();
        }
      },
    ],
    address: [
      {
        required: true,
        message: "Vui lòng nhập địa chỉ",
        min: 3,
      },
    ],
    role: [
      {
        required: true,
        message: "Vui lòng chọn vai trò",
      },
    ],
  }

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item name="username" label="Tên đăng nhập" rules={validateForm.username}>
        <Input placeholder="Nhập tên đăng nhập" />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={validateForm.email as Rule[]}>
        <Input placeholder="Nhập email" />
      </Form.Item>

      <Form.Item name="password" label="Mật khẩu" rules={validateForm.password as Rule[]}>
        <Input.Password placeholder="Nhập mật khẩu" />
      </Form.Item>

      <Form.Item name="fullName" label="Họ và tên" rules={validateForm.fullName as Rule[]}>
        <Input placeholder="Nhập họ và tên" />
      </Form.Item>
      <Form.Item name="phoneNumber" label="Số điện thoại" rules={validateForm.phoneNumber as Rule[]}>
        <Input placeholder="Nhập số điện thoại" />
      </Form.Item>
      <Form.Item name="address" label="Địa chỉ" rules={validateForm.address as Rule[]}>
        <Input placeholder="Nhập địa chỉ" />
    </Form.Item>
      <Form.Item name="role" label="Vai trò" rules={validateForm.role as Rule[]}>
        <Select placeholder="Chọn vai trò">
          {roles.map((role) => (
            <Select.Option key={role} value={role}>
              {role}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
      <button className="btn-custom" type="submit" onClick={handleSubmit}>
          Tạo người dùng
        </button>
        <button className="bg-gradient-to-r rounded-xl from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-black font-semibold py-2 px-4"  onClick={handleCancel} style={{ marginLeft: "10px" }}>
          Hủy
        </button>
      </Form.Item>
    </Form>
  );
};

export default CreateUser;
