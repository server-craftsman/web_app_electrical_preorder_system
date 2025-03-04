import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { StageService } from '../../../../services/campaign/stage.service';
import { CampaignStageResponseModel } from '../../../../models/api/response/campaign.res.model';
import { helper } from '../../../../utils';
import { CampaignStageStatus } from '../../../../app/enums';

interface UpdateStageProps {
  visible: boolean;
  onUpdate: () => void;
  onCancel: () => void;
  stageId: string;
  campaignId: string;
  initialData: CampaignStageResponseModel | null;
}

const UpdateStage: React.FC<UpdateStageProps> = ({
  visible,
  onUpdate,
  onCancel,
  stageId,
  campaignId,
  initialData,
}) => {
  const [form] = Form.useForm();
  const [stage, setStage] = useState<CampaignStageResponseModel | null>(null);

  useEffect(() => {
    if (visible && initialData) {
      setStage(initialData);

      const formattedStartDate = new Date(initialData.startDate)
        .toISOString()
        .slice(0, 16);
      const formattedEndDate = new Date(initialData.endDate)
        .toISOString()
        .slice(0, 16);

      form.setFieldsValue({
        ...initialData,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    }
  }, [visible, initialData, form]);

  const handleUpdate = async (values: any) => {
    try {
      if (!stage || !campaignId || !stageId) {
        helper.notificationMessage('Missing required data', 'error');
        return;
      }

      const requestData = {
        ...values,
        startDate: new Date(values.startDate).toISOString(),
        endDate: new Date(values.endDate).toISOString(),
      };

      await StageService.update(campaignId, stageId, requestData);
      helper.notificationMessage('Stage updated successfully', 'success');
      onUpdate();
    } catch (error) {
      console.error('Failed to update stage:', error);
      helper.notificationMessage('Failed to update stage', 'error');
    }
  };

  return (
    <Modal
      open={visible}
      title="Update Campaign Stage"
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item
          name="name"
          label="Stage Name"
          rules={[{ required: true, message: 'Please enter the stage name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="quantitySold"
          label="Quantity Sold"
          rules={[
            { required: true, message: 'Please enter the quantity sold' },
          ]}
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>
        <Form.Item
          name="targetQuantity"
          label="Target Quantity"
          rules={[
            { required: true, message: 'Please enter the target quantity' },
          ]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>
        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[{ required: true, message: 'Please select the start date' }]}
        >
          {/* <DatePicker showTime className="w-full" /> */}
          <input
            type="datetime-local"
            className="w-full border rounded-lg p-2"
          />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="End Date"
          rules={[{ required: true, message: 'Please select the end date' }]}
        >
          {/* <DatePicker showTime className="w-full" /> */}
          <input
            type="datetime-local"
            className="w-full border rounded-lg p-2"
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select a status' }]}
        >
          <Select>
            {Object.values(CampaignStageStatus).map((status) => (
              <Select.Option key={status} value={status}>
                {status}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <div className="flex justify-end">
          <Button onClick={onCancel} className="mr-2" icon={<DeleteOutlined />}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" icon={<EditOutlined />}>
            Update
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateStage;
