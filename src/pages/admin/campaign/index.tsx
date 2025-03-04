import React, { useState, useRef } from 'react';
import { Modal, Button } from 'antd';
import {
  PlusOutlined,
  ExportOutlined,
  ShoppingOutlined,
  HistoryOutlined,
  // AppstoreOutlined,
} from '@ant-design/icons';
import CreateCampaign from '../../../components/admin/campaign/Create';
import ViewCampaign from '../../../components/admin/campaign/Display';
import Search from '../../../components/search/index';
import CampaignHistory from './history';
// import CampaignStage from './stage';

const CampaignManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshCampaigns, setRefreshCampaigns] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState('1');
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
    setRefreshCampaigns((prev) => !prev);
    setIsModalVisible(false);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const tabs = [
    { key: '1', label: 'Campaigns', icon: <ShoppingOutlined /> },
    // { key: '2', label: 'Campaign Stage', icon: <AppstoreOutlined /> },
    { key: '3', label: 'Histories', icon: <HistoryOutlined /> },
  ];

  return (
    <div className="p-6">
      <div className="bg-gradient-to-r from-gray-900 to-black text-white p-6 rounded-lg shadow-lg">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-white">
            Campaigns
          </h1>
          <p className="text-gray-300 mt-2">
            Tổ chức các chiến dịch hiệu quả tại đây!
          </p>
        </div>
        <div className="flex space-x-3 mt-4">
          <Button
            icon={<PlusOutlined />}
            className="btn-submit transform hover:scale-105 transition-all duration-300"
            onClick={handleCreateCampaign}
          >
            Tạo chiến dịch
          </Button>
          <Button
            icon={<ExportOutlined />}
            className="py-5 transform hover:scale-105 transition-all duration-300"
          >
            Export
          </Button>
        </div>
      </div>

      <div className="mt-6 mb-4">
        <Search placeholder="Search campaigns" onSearch={handleSearch} />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`
                  group inline-flex items-center px-4 py-2 border-b-2 font-medium text-sm
                  transition-all duration-200 hover:-translate-y-0.5
                  ${
                    activeTab === tab.key
                      ? 'border-black text-black hover:text-gray-500'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === '1' && (
            <div className="animate-fadeIn">
              <ViewCampaign
                refresh={refreshCampaigns}
                searchTerm={searchTerm}
                refreshKey={refreshKey}
              />
            </div>
          )}
          {/* {activeTab === '2' && <CampaignStage />} */}
          {activeTab === '3' && <CampaignHistory />}
        </div>
      </div>

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

export default CampaignManagement;
