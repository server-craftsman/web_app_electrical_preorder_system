import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Row, Col } from 'antd';
import { CampaignResponseModel } from '../../../models/api/response/campaign.res.model';
import { CampaignService } from '../../../services/campaign/campaign.service';
import { ProductService } from '../../../services/product/product.service';
import moment from 'moment';
import { helper } from '../../../utils';
import { CampaignStatus } from '../../../app/enums';
import { Rule } from 'antd/es/form';

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
  const [products, setProducts] = useState<any[]>([]);
  const [status, setStatus] = useState<string>(
    campaign?.status || CampaignStatus.SCHEDULED
  );

  // Initialize form values when component mounts
  useEffect(() => {
    if (campaign) {
      form.setFieldsValue({
        name: campaign.name,
        startDate: campaign.startDate
          ? formatDateForInput(campaign.startDate)
          : null,
        endDate: campaign.endDate ? formatDateForInput(campaign.endDate) : null,
        minQuantity: campaign.minQuantity,
        maxQuantity: campaign.maxQuantity,
        totalAmount: campaign.totalAmount,
        productId: campaign.product?.id,
        status: campaign.status,
      });
      setStatus(campaign.status);
    }
  }, [campaign, form]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAll({
          page: 0,
          size: 100, // Increased to get more products
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

  // Modified date formatting function to preserve hours and minutes
  const formatDateForInput = (dateString: string) => {
    return moment(dateString).format('YYYY-MM-DDTHH:mm');
  };

  const handleDateChange = () => {
    const { startDate, endDate } = form.getFieldsValue([
      'startDate',
      'endDate',
    ]);
    if (startDate && endDate) {
      const newStatus = determineCampaignStatus(startDate, endDate);
      setStatus(newStatus);
      form.setFieldsValue({ status: newStatus });
    }
  };

  const determineCampaignStatus = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) return CampaignStatus.SCHEDULED;
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return CampaignStatus.SCHEDULED;
    if (now > end) return CampaignStatus.COMPLETED;
    return CampaignStatus.ACTIVE;
  };

  // Modified update handler to adjust to UTC-7 timezone
  const handleUpdate = async (values: any) => {
    try {
      // Improved date formatting function that adjusts to UTC-7 timezone
      const formatDateWithUTC7 = (dateStr: string) => {
        if (!dateStr) return null;

        // Parse the date string from the datetime-local input
        const localDate = new Date(dateStr);

        // Calculate UTC-7 offset (7 hours behind UTC)
        const utcMinus7Offset = -7 * 60 * 60 * 1000; // 7 hours in milliseconds

        // Get the local timezone offset in milliseconds
        const localOffset = localDate.getTimezoneOffset() * 60 * 1000;

        // Create a new date adjusted to UTC-7
        const utc7Date = new Date(
          localDate.getTime() - localOffset + utcMinus7Offset
        );

        // Format the date in ISO format
        const year = utc7Date.getUTCFullYear();
        const month = String(utc7Date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(utc7Date.getUTCDate()).padStart(2, '0');
        const hours = String(utc7Date.getUTCHours()).padStart(2, '0');
        const minutes = String(utc7Date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(utc7Date.getUTCSeconds()).padStart(2, '0');

        // Format: "2025-03-12T11:00:00.000Z" with UTC-7 adjustment
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
      };

      const updateData = {
        ...values,
        startDate: formatDateWithUTC7(values.startDate),
        endDate: formatDateWithUTC7(values.endDate),
        productId: values.productId || campaign.product?.id,
        status: values.status || status,
      };

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
      {
        validator: (_: any, value: string) => {
          if (!value) return Promise.resolve();
          const startDate = new Date(value);
          const now = new Date();
          if (startDate < now) {
            return Promise.reject('Ngày bắt đầu không được ở quá khứ');
          }
          return Promise.resolve();
        },
      },
    ],
    endDate: [
      {
        required: true,
        message: 'Vui lòng chọn ngày kết thúc',
      },
      {
        validator: (_: any, value: string) => {
          if (!value) return Promise.resolve();
          const endDate = new Date(value);
          const startDate = new Date(form.getFieldValue('startDate'));
          if (!form.getFieldValue('startDate')) {
            return Promise.resolve();
          }
          if (endDate <= startDate) {
            return Promise.reject('Ngày kết thúc phải sau ngày bắt đầu');
          }
          return Promise.resolve();
        },
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
    <div className="p-4">
      <Form
        layout="vertical"
        form={form}
        onFinish={handleUpdate}
        initialValues={{
          status: campaign?.status || CampaignStatus.SCHEDULED,
        }}
      >
        <div className="bg-white rounded-lg p-2 mb-2 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Thông tin cơ bản</h3>

          <Form.Item
            name="name"
            label={
              <span className="flex items-center">
                Tên chiến dịch <span className="text-red-500 ml-1">*</span>
              </span>
            }
            rules={validateForm.name as Rule[]}
          >
            <Input className="rounded-md" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label={
                  <span className="flex items-center">
                    Ngày bắt đầu <span className="text-red-500 ml-1">*</span>
                  </span>
                }
                rules={validateForm.startDate as Rule[]}
              >
                <input
                  type="datetime-local"
                  className="border rounded-lg p-2 w-full"
                  onChange={handleDateChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label={
                  <span className="flex items-center">
                    Ngày kết thúc <span className="text-red-500 ml-1">*</span>
                  </span>
                }
                rules={validateForm.endDate as Rule[]}
              >
                <input
                  type="datetime-local"
                  className="border rounded-lg p-2 w-full"
                  onChange={handleDateChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="bg-white rounded-lg p-2 mb-2 shadow-sm">
          <h3 className="text-lg font-medium mb-4">
            Thông tin số lượng và sản phẩm
          </h3>

          <Row gutter={20}>
            <Col span={10}>
              <Form.Item
                name="minQuantity"
                label={
                  <span className="flex items-center">
                    Số lượng tối thiểu{' '}
                    <span className="text-red-500 ml-1">*</span>
                  </span>
                }
                rules={validateForm.minQuantity as Rule[]}
              >
                <InputNumber min={0} className="w-full rounded-md" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="maxQuantity"
                label={
                  <span className="flex items-center">
                    Số lượng tối đa <span className="text-red-500 ml-1">*</span>
                  </span>
                }
                rules={validateForm.maxQuantity as Rule[]}
                dependencies={['minQuantity']}
              >
                <InputNumber min={0} className="w-full rounded-md" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="productId"
                label={
                  <span className="flex items-center">
                    Chọn sản phẩm <span className="text-red-500 ml-1">*</span>
                  </span>
                }
                rules={validateForm.productId as Rule[]}
              >
                <Select
                  placeholder="Chọn sản phẩm"
                  className="rounded-md"
                  showSearch
                  optionFilterProp="children"
                >
                  {products.map((product) => (
                    <Select.Option key={product.id} value={product.id}>
                      {product.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Trạng thái chiến dịch"
                initialValue={status}
              >
                <Select
                  className="rounded-md"
                  onChange={(value) => setStatus(value)}
                >
                  {Object.values(CampaignStatus).map((statusOption) => (
                    <Select.Option key={statusOption} value={statusOption}>
                      {/* <Tag color={statusOption}> */}
                      {statusOption}
                      {/* </Tag> */}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button className="btn-cancel" onClick={onCancel}>
            Hủy
          </button>
          <button className="btn-custom" type="submit">
            Cập nhật
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateCampaign;
