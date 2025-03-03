import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { CampaignService } from '../../../services/campaign/campaign.service';
import { helper } from '../../../utils';

interface DeleteCampaignProps {
  campaignId: string;
  campaignName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const DeleteCampaign: React.FC<DeleteCampaignProps> = ({
  campaignId,
  campaignName,
  onSuccess,
  onCancel,
}) => {
  const handleDelete = async () => {
    try {
      await CampaignService.delete(campaignId);
      helper.notificationMessage('Xóa chiến dịch thành công', 'success');
      onSuccess();
    } catch (error) {
      console.error('Delete error:', error);
      helper.notificationMessage('Xóa chiến dịch không thành công', 'error');
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center text-red-500 mb-4">
        <ExclamationCircleOutlined className="text-2xl mr-2" />
        <span className="text-lg font-medium">Xác nhận xóa</span>
      </div>

      <p className="text-lg mb-2">Bạn có chắc chắn muốn xóa chiến dịch này?</p>
      <p className="text-gray-600">
        Tên chiến dịch: <span className="font-semibold">{campaignName}</span>
      </p>
      <p className="text-red-500 mt-2 text-sm">
        Lưu ý: Hành động này không thể hoàn tác!
      </p>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Hủy
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default DeleteCampaign;
