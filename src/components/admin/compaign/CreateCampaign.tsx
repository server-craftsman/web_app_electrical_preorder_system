import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Select, message } from "antd";
import { CampaignService } from "../../../services/campaign/campaign.service"; // Gọi API
// import dayjs from "dayjs";
import { ProductService } from "../../../services/product/product.service";
import { helper } from "../../../utils";

interface Product {
  id: string;
  name: string;
}

interface CreateCampaignProps {
  onCategoryCreated: () => void; // Refresh danh sách sau khi tạo
  onClose: () => void; // Đóng modal
}

const CreateCampaign: React.FC<CreateCampaignProps> = ({ onCategoryCreated, onClose }) => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const response = await ProductService.getAll({ }); // Lấy danh sách sản phẩm
        const content = response?.data?.data?.content;
        const productList = Array.isArray(content) ? content.map((p: any) => ({
          id: p.id,
          name: p.name,
        })) : [];
        setProducts(productList);
      } catch (error) {
        message.error("Không thể tải danh sách sản phẩm!");
        console.error(error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      const formattedValues = {
        ...values,
        startDate: values.startDate ? new Date(values.startDate).toISOString() : null,
        endDate: values.endDate ? new Date(values.endDate).toISOString() : null,
      };
      const response = await CampaignService.create(formattedValues);
      if (response) {
        helper.notificationMessage(
          'Chiến dịch đã được tạo thành công!',
          'success'
        );
        onCategoryCreated(); // Cập nhật danh sách
        onClose(); // Đóng modal
        form.resetFields(); // Xóa dữ liệu form
      } else {
        helper.notificationMessage(
          'Lỗi khi tạo chiến dịch!',
          'error'
        );
      }
    } catch (error) {
      helper.notificationMessage(
        'Lỗi khi tạo chiến dịch!',
        'error'
      );
      console.error(error);
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item name="name" label="Tên chiến dịch" rules={[{ required: true, message: "Vui lòng nhập tên chiến dịch" }]}>
        <Input />
      </Form.Item>

      <Form.Item name="startDate" label="Ngày bắt đầu" rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}>
        <input type="datetime-local" className="border p-2 w-full" onChange={(e) => form.setFieldsValue({ startDate: e.target.value })} />
      </Form.Item>

      <Form.Item name="endDate" label="Ngày kết thúc" rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc" }]}>
        <input type="datetime-local" className="border p-2 w-full" onChange={(e) => form.setFieldsValue({ endDate: e.target.value })} />
      </Form.Item>

      <Form.Item name="minQuantity" label="Số lượng tối thiểu" rules={[{ required: true, message: "Nhập số lượng tối thiểu" }]}>
        <InputNumber min={0} className="w-full" />
      </Form.Item>

      <Form.Item name="maxQuantity" label="Số lượng tối đa" rules={[{ required: true, message: "Nhập số lượng tối đa" }]}>
        <InputNumber min={0} className="w-full" />
      </Form.Item>

      <Form.Item name="totalAmount" label="Tổng số tiền" rules={[{ required: true, message: "Nhập tổng số tiền" }]}>
        <InputNumber min={0} className="w-full" />
      </Form.Item>

      <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: "Chọn trạng thái" }]}>
        <Select>
          <Select.Option value="DRAFT">Nháp</Select.Option>
          <Select.Option value="SCHEDULED">Lên lịch</Select.Option>
          <Select.Option value="ACTIVE">Hoạt động</Select.Option>
          <Select.Option value="COMPLETED">Hoàn thành</Select.Option>
          <Select.Option value="CANCELLED">Hủy bỏ</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="productId" label="Chọn sản phẩm" rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}>
        <Select loading={loadingProducts} placeholder="Chọn sản phẩm">
          {products.map((product) => (
            <Select.Option key={product.id} value={product.id}>
              {product.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Tạo chiến dịch
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateCampaign;
