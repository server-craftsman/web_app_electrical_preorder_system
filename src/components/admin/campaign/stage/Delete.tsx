import React from 'react';
import { Modal } from 'antd';
import { StageService } from '../../../../services/campaign/stage.service';
import { helper } from '../../../../utils';

interface DeleteStageProps {
  visible: boolean;
  onDelete: () => void;
  onCancel: () => void;
  stageId: string;
  campaignId: string;
  onRefresh: () => void; // Add new prop for refresh
}

const Delete: React.FC<DeleteStageProps> = ({
  visible,
  onDelete,
  onCancel,
  stageId,
  campaignId,
  onRefresh, // Add new prop
}) => {
  const handleDelete = async () => {
    try {
      if (!stageId || !campaignId) return;

      await StageService.delete(campaignId, stageId, { stageId });
      helper.notificationMessage('Xoá stage thành công', 'success');
      onDelete();
      onRefresh(); // Call refresh after successful deletion
    } catch (error) {
      console.error('Failed to delete stage:', error);
      helper.notificationMessage('Lỗi khi xóa stage!', 'error');
    }
  };

  return (
    <Modal
      title="Xoá Stage"
      open={visible}
      onOk={handleDelete}
      onCancel={onCancel}
      okText="Delete"
      okButtonProps={{ danger: true }}
      cancelText="Cancel"
    >
      <p>Bạn có chắc chắn muốn xóa Stage này?</p>
    </Modal>
  );
};

export default Delete;
