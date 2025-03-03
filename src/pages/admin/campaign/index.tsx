import React, { useState, useRef } from 'react';
import { Modal, Button } from 'antd';
import { PlusOutlined, ExportOutlined } from '@ant-design/icons';
import CreateCampaign from '../../../components/admin/campaign/Create';
import ViewCampaign from '../../../components/admin/campaign/Display';
import Search from '../../../components/search/index';

const Campaign: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshCampaigns, setRefreshCampaigns] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const formRef = useRef<any>(null);

  const handleCreateCampaign = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    if (formRef.current && formRef.current.resetFields) {
      formRef.current.resetFields();
    }
    setIsModalVisible(false);
  };

  const handleCampaignCreated = () => {
    setRefreshCampaigns(prev => !prev);
    setIsModalVisible(false);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="p-6">
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Campaigns</h1>
          <p className="text-sm">Organize campaigns and reach your goals effectively here</p>
        </div>
        <div className="flex space-x-2">
          <Button icon={<PlusOutlined />} className='btn-submit' onClick={handleCreateCampaign}>
            Tạo chiến dịch
          </Button>
          <Button icon={<ExportOutlined />} className='py-5'>Export</Button>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center mb-3">
        <Search
          placeholder="Search campaigns"
          onSearch={handleSearch}
        />
      </div>

      <ViewCampaign
        refresh={refreshCampaigns}
        searchTerm={searchTerm}
        refreshKey={refreshKey}
      />

      <Modal
        title="Tạo chiến dịch mới"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
        style={{ top: 20, right: 20, position: 'absolute' }}
        wrapClassName="right-modal"
      >
        <CreateCampaign
          onCategoryCreated={handleCampaignCreated}
          onClose={handleCancel}
          formRef={formRef}
        />
      </Modal>
    </div>
  );
};

export default Campaign;
