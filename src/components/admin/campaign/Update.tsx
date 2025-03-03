import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { CampaignResponseModel } from '../../../models/api/response/campaign.res.model';
import { CampaignService } from '../../../services/campaign/campaign.service';
import { ProductService } from '../../../services/product/product.service';
import moment from 'moment';
import { helper } from '../../../utils';
interface UpdateCampaignProps {
  campaign: CampaignResponseModel;
  onSuccess: () => void;
  onCancel: () => void;
}

const UpdateCampaign: React.FC<UpdateCampaignProps> = ({
  campaign,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAll({
          page: 0,
          size: 10,
        });
        if (response?.data?.data?.content) {
          setProducts(response.data.data.content as unknown as any);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Update the formatDateForInput function
  const formatDateForInput = (dateString: string) => {
    return moment(dateString).format('YYYY-MM-DDTHH:mm');
  };
  const onFinish = async (values: any) => {
    try {
      const updateData = {
        ...values,
        startDate: moment(values.startDate).format('YYYY-MM-DDTHH:mm:ss'),
        endDate: moment(values.endDate).format('YYYY-MM-DDTHH:mm:ss'),
        totalAmount: campaign.totalAmount,
        productId: values.productId || campaign.product?.id,
        status: values.status, // Explicitly include status
      };

      console.log('Update data:', updateData); // For debugging
      await CampaignService.update(campaign.id, updateData);
      helper.notificationMessage(
        'Cập nhật thông tin chiến dịch thành công',
        'success'
      );
      onSuccess();
    } catch (error) {
      console.error('Update error:', error);
      helper.notificationMessage(
        'Cập nhật thông tin chiến dịch không thành công',
        'error'
      );
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
    status: [
      {
        required: true,
        message: 'Vui lòng chọn trạng thái',
      },
    ],
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...campaign,
        startDate: formatDateForInput(campaign.startDate),
        endDate: formatDateForInput(campaign.endDate),
        productId: campaign.product?.id,
        status: campaign.status, // Explicitly set initial status
      }}
      className="p-4"
    >
      <Form.Item name="name" label="Tên chiến dịch" rules={validateForm.name}>
        <Input />
      </Form.Item>

      <Form.Item
        name="startDate"
        label="Ngày bắt đầu"
        rules={validateForm.startDate}
      >
        <input type="datetime-local" className="border rounded-lg p-2 w-full" />
      </Form.Item>

      <Form.Item
        name="endDate"
        label="Ngày kết thúc"
        rules={validateForm.endDate}
      >
        <input type="datetime-local" className="border rounded-lg p-2 w-full" />
      </Form.Item>

      <Form.Item
        name="minQuantity"
        label="Số lượng tối thiểu"
        rules={validateForm.minQuantity}
      >
        <InputNumber min={1} className="w-full" />
      </Form.Item>

      <Form.Item
        name="maxQuantity"
        label="Số lượng tối đa"
        rules={validateForm.maxQuantity}
      >
        <InputNumber min={1} className="w-full" />
      </Form.Item>

      <Form.Item
        name="productId"
        label="Sản phẩm"
        rules={validateForm.productId}
      >
        <Select>
          {products.map((product: any) => (
            <Select.Option key={product.id} value={product.id}>
              {product.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* <Form.Item name="status" label="Trạng thái" rules={validateForm.status}>
        <Select defaultValue={campaign.status}>
          {Object.values(CampaignStatus).map((status) => (
            <Select.Option key={status} value={status}>
              <Tag color={helper.formatCampaignStatus(status)}>{status}</Tag>
            </Select.Option>
          ))}
        </Select>
      </Form.Item> */}

      <div className="flex justify-end space-x-4 mt-4">
        <button className="btn-cancel" onClick={onCancel}>
          Hủy
        </button>
        <button className="btn-custom" type="submit">
          Cập nhật
        </button>
      </div>
    </Form>
  );
};

export default UpdateCampaign;
