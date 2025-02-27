import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { UserService } from "../../../services/user/user.service"; // Import service API
import { UserRole } from "../../../app/enums/user.role"; // Import danh sách vai trò

interface CreateUserProps {
  onUserCreated: () => void; // Refresh danh sách user sau khi tạo
  onClose: () => void; // Đóng modal
}

const CreateUser: React.FC<CreateUserProps> = ({ onUserCreated, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    // Lấy danh sách vai trò từ user.role.ts
    setRoles(Object.values(UserRole));
  }, []);

  const handleSubmit = async (values: any) => {
    if (!values.fullName || values.fullName.trim() === "") {
      message.error("Họ và tên không được để trống!");
      return;
    }

    setLoading(true);
    try {
      const userData = {
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
        fullname: values.fullName.trim(), // Chắc chắn fullname không bị null
        phoneNumber: values.phoneNumber.trim(),
        address: values.address.trim(),
        role: values.role,
        active: true,
      };

      await UserService.create(userData);
      message.success("Người dùng đã được tạo thành công!");
      form.resetFields();
      onUserCreated();
      onClose();
    } catch (error) {
      message.error("Lỗi khi tạo người dùng!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const handleCancel = () => {
    form.resetFields(); // Xóa dữ liệu trong form
    onClose(); // Đóng modal
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item name="username" label="Tên đăng nhập" rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}>
        <Input />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ" }]}>
        <Input />
      </Form.Item>

      <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="phoneNumber" label="Số điện thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
        <Input />
    </Form.Item>
      <Form.Item name="role" label="Vai trò" rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}>
        <Select placeholder="Chọn vai trò">
          {roles.map((role) => (
            <Select.Option key={role} value={role}>
              {role}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
          Tạo người dùng
        </Button>
        <Button type="default" onClick={handleCancel} style={{ marginLeft: "10px" }}>
          Hủy
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUser;
