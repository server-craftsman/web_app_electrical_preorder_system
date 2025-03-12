import React from 'react';
import { Modal, Form, Input, InputNumber, Button } from 'antd';
import { StageService } from '../../../../services/campaign/stage.service';
import { helper } from '../../../../utils';
// import { CampaignStageStatus } from '../../../../app/enums';

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
      // Format dates properly for API
      const requestData = {
        ...values,
        startDate: new Date(values.startDate).toISOString(),
        endDate: new Date(values.endDate).toISOString(),
        quantitySold: 0, // Initialize with 0 for new stage
      };

      await StageService.create(id, requestData);
      helper.notificationMessage('Stage created successfully', 'success');
      form.resetFields();
      onCreate();
    } catch (error) {
      console.error('Failed to create stage:', error);
      helper.notificationMessage('Failed to create stage', 'error');
    }
  };

  // Simplified date change handler without status updates
  const handleDateChange = () => {
    // This function can be used for validation if needed in the future
    console.log('Date changed');
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
          <input
            type="datetime-local"
            className="border rounded-lg p-2 w-full"
            onChange={handleDateChange}
          />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="End Date"
          rules={[{ required: true, message: 'Please select the end date' }]}
        >
          <input
            type="datetime-local"
            className="border rounded-lg p-2 w-full"
            onChange={handleDateChange}
          />
        </Form.Item>

        {/* <Form.Item
          name="status"
          label="Status"
          initialValue={CampaignStageStatus.UPCOMING}
          rules={[{ required: true, message: 'Please select a status' }]}
        >
          <Select>
            {Object.values(CampaignStageStatus).map((status) => (
              <Select.Option key={status} value={status}>
                {status}
              </Select.Option>
            ))}
          </Select>
        </Form.Item> */}

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
