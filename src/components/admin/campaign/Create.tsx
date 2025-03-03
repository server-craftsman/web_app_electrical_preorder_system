import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, message, Tag } from 'antd';
import { CampaignService } from '../../../services/campaign/campaign.service'; // Gọi API
import { ProductService } from '../../../services/product/product.service';
import { helper } from '../../../utils';
import { CampaignStatus } from '../../../app/enums';
import { Rule } from 'antd/es/form';

interface Product {
  id: string;
  name: string;
}

// Update the interface to include formRef
interface CreateCampaignProps {
  onCategoryCreated: () => void; // Refresh danh sách sau khi tạo
  onClose: () => void; // Đóng modal
  formRef?: React.MutableRefObject<any>; // Changed to MutableRefObject and made optional
}

const CreateCampaign: React.FC<CreateCampaignProps> = ({
  onCategoryCreated,
  onClose,
  formRef,
}) => {
  const [form] = Form.useForm();

  // Assign the form to the ref so parent component can access it
  React.useEffect(() => {
    if (formRef) {
      // Use object assignment instead of direct property assignment
      Object.assign(formRef, { current: form });
    }
  }, [form, formRef]);

  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<string>(CampaignStatus.SCHEDULED); // Tùy chọn trạng thái

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAll({}); // Lấy danh sách sản phẩm
        const content = response?.data?.data?.content;
        const productList = Array.isArray(content)
          ? content.map((p: any) => ({
              id: p.id,
              name: p.name,
            }))
          : [];
        setProducts(productList);
      } catch (error) {
        message.error('Không thể tải danh sách sản phẩm!');
        console.error(error);
      } finally {
        console.log('fetch data success!');
      }
    };
    fetchProducts();
  }, []);

  const determineCampaignStatus = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) return CampaignStatus.SCHEDULED; // Mặc định là "SCHEDULED" nếu chưa chọn ngày
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return CampaignStatus.SCHEDULED;
    if (now > end) return CampaignStatus.COMPLETED;
    return CampaignStatus.ACTIVE;
  };

  const handleDateChange = () => {
    const { startDate, endDate } = form.getFieldsValue([
      'startDate',
      'endDate',
    ]);
    const newStatus = determineCampaignStatus(startDate, endDate);
    setStatus(newStatus); // Cập nhật trạng thái trong state
    form.setFieldsValue({ status: newStatus }); // Cập nhật giá trị trong form
  };

  const handleSubmit = async (values: any) => {
    try {
      const formattedValues = {
        ...values,
        startDate: values.startDate
          ? new Date(values.startDate).toISOString()
          : null,
        endDate: values.endDate ? new Date(values.endDate).toISOString() : null,
        status: status,
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
        setStatus(CampaignStatus.SCHEDULED);
      } else {
        helper.notificationMessage('Lỗi khi tạo chiến dịch!', 'error');
      }
    } catch (error) {
      helper.notificationMessage('Lỗi khi tạo chiến dịch!', 'error');
      console.error(error);
    }
  };

  const validateForm = {
    name: [
      {
        required: true,
        message: 'Vui lòng nhập tên chiến dịch',
        min: 3,
        max: 20,
      },
    ],
    startDate: [
      {
        required: true,
        message: 'Vui lòng chọn ngày bắt đầu',
      },
    ],
    endDate: [
      {
        required: true,
        message: 'Vui lòng chọn ngày kết thúc',
      },
    ],
    minQuantity: [
      {
        required: true,
        message: 'Vui lòng nhập số lượng tối thiểu',
      },
    ],
    maxQuantity: [
      {
        required: true,
        message: 'Vui lòng nhập số lượng tối đa',
      },
    ],
    totalAmount: [
      {
        required: true,
        message: 'Vui lòng nhập tổng số tiền',
      },
    ],
    productId: [
      {
        required: true,
        message: 'Vui lòng chọn sản phẩm',
      },
    ],
  };

  const handleCancel = () => {
    form.resetFields(); // Xóa dữ liệu trong form
    onClose(); // Đóng modal
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
      onTouchCancel={handleCancel}
    >
      <Form.Item
        name="name"
        label="Tên chiến dịch"
        rules={validateForm.name as Rule[]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="startDate"
        label="Ngày bắt đầu"
        rules={validateForm.startDate as Rule[]}
      >
        <input
          type="datetime-local"
          className="border rounded-lg p-2 w-full"
          onChange={handleDateChange}
        />
      </Form.Item>

      <Form.Item
        name="endDate"
        label="Ngày kết thúc"
        rules={validateForm.endDate as Rule[]}
      >
        <input
          type="datetime-local"
          className="border rounded-lg p-2 w-full"
          onChange={handleDateChange}
        />
      </Form.Item>

      <Form.Item
        name="minQuantity"
        label="Số lượng tối thiểu"
        rules={validateForm.minQuantity as Rule[]}
      >
        <InputNumber min={0} className="w-full" />
      </Form.Item>

      <Form.Item
        name="maxQuantity"
        label="Số lượng tối đa"
        rules={validateForm.maxQuantity as Rule[]}
        dependencies={['minQuantity']}
      >
        <InputNumber min={0} className="w-full" />
      </Form.Item>

      <Form.Item
        name="totalAmount"
        label="Tổng số tiền"
        rules={validateForm.totalAmount as Rule[]}
      >
        <InputNumber min={0} className="w-full" />
      </Form.Item>

      {/* Hiển thị trạng thái theo ngày */}
      <Form.Item
        label="Trạng thái chiến dịch"
        className="flex items-center"
        style={{ marginBottom: '16px' }}
      >
        <Tag color={helper.formatCampaignStatus(status) || 'default'}>
          {status}
        </Tag>
      </Form.Item>

      <Form.Item
        name="productId"
        label="Chọn sản phẩm"
        rules={validateForm.productId as Rule[]}
      >
        <Select placeholder="Chọn sản phẩm">
          {products.map((product) => (
            <Select.Option key={product.id} value={product.id}>
              {product.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <button className="btn-custom" type="submit">
          Tạo chiến dịch
        </button>
      </Form.Item>
    </Form>
  );
};

export default CreateCampaign;
