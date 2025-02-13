// src/pages/admin/stage_history/StageHistory.tsx
import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import { formatCampaignStatus } from '../../../utils/helper';
import Pagination from '../../../components/pagination';
interface StageHistoryEntry {
  id: number;
  name: string;
  oldStatus: string;
  newStatus: string;
  timestamp: string;
}

const StageHistory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const historyData: StageHistoryEntry[] = [
    {
      id: 1,
      name: 'Chiến dịch 1',
      oldStatus: 'Draft',
      newStatus: 'Published',
      timestamp: '2023-10-01 10:00:00',
    },
    {
      id: 2,
      name: 'Chiến dịch 2',
      oldStatus: 'Published',
      newStatus: 'Archived',
      timestamp: '2023-10-02 12:00:00',
    },
    // Thêm dữ liệu khác nếu cần
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên chiến dịch',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Trạng thái cũ',
      dataIndex: 'oldStatus',
      key: 'oldStatus',
      render: (text: string) => (
        <Tag color={formatCampaignStatus(text)}>{text}</Tag>
      ),
    },
    {
      title: 'Trạng thái mới',
      dataIndex: 'newStatus',
      key: 'newStatus',
      render: (text: string) => (
        <Tag color={formatCampaignStatus(text)}>{text}</Tag>
      ),
    },
    {
      title: 'Thời gian',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lịch sử chiến dịch</h1>
      <Table
        dataSource={historyData}
        columns={columns}
        rowKey="id"
        pagination={false}
        footer={() => (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(historyData.length / 10)}
            onPageChange={setCurrentPage}
          />
        )}
      />
    </div>
  );
};

export default StageHistory;
