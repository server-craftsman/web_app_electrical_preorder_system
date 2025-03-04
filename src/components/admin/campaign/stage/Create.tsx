import React from 'react';
import { Modal, Form, Input, InputNumber, DatePicker, Button } from 'antd';
import { StageService } from '../../../../services/campaign/stage.service';
import { helper } from '../../../../utils';

interface CreateStageProps {
  visible: boolean;
  onCreate: () => void;
  onCancel: () => void;
  id: string;
}

const CreateStage: React.FC<CreateStageProps> = ({
  visible,
  onCreate,
  onCancel,
  id,
}) => {
  const [form] = Form.useForm();

  const handleCreate = async (values: any) => {
    try {
      const requestData = {
        ...values,
        startDate: values.startDate.format('YYYY-MM-DDTHH:mm:ss'),
        endDate: values.endDate.format('YYYY-MM-DDTHH:mm:ss'),
      };
      await StageService.create(id, requestData); // Ensure id is used directly as a string
      helper.notificationMessage('Stage created successfully', 'success');
      onCreate();
    } catch (error) {
      console.error('Failed to create stage:', error);
      helper.notificationMessage('Failed to create stage', 'error');
    }
  };

  return (
    <Modal
      open={visible}
      title="Create Campaign Stage"
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleCreate}>
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
          <DatePicker showTime className="w-full" />
        </Form.Item>
        <Form.Item
          name="endDate"
          label="End Date"
          rules={[{ required: true, message: 'Please select the end date' }]}
        >
          <DatePicker showTime className="w-full" />
        </Form.Item>
        <div className="flex justify-end">
          <Button onClick={onCancel} className="mr-2">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateStage;
