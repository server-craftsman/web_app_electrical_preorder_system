import { Modal } from 'antd';
import { useState, useRef } from 'react';
import CreateCampaign from '../../../components/admin/compaign/Create';
import Search from '../../../components/search';
import ViewCampaign from '../../../components/admin/compaign/Display';

const Campaign = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const createCampaignRef = useRef<{ handleOpenModal: () => void } | null>(
    null
  );
  const [refreshCampaigns, setRefreshCampaigns] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  // Define as MutableRefObject
  const formRef = useRef<any>(null);

  const handleCreateCampaign = () => {
    setIsModalVisible(true);
    if (createCampaignRef.current) {
      createCampaignRef.current.handleOpenModal();
    }
  };

  const handleCancel = () => {
    // Reset form fields when modal is closed
    if (formRef.current && formRef.current.resetFields) {
      formRef.current.resetFields();
    }
    setIsModalVisible(false);
  };

  // Trigger refresh of categories
  const handleCampaignCreated = () => {
    setRefreshCampaigns((prev) => !prev); // toggle to trigger useEffect in ViewCategory
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Search onSearch={handleSearch} />
        <button onClick={handleCreateCampaign} className="btn-submit">
          Tạo chiến dịch
        </button>
      </div>
      <ViewCampaign
        refresh={refreshCampaigns}
        searchTerm={searchTerm}
        refreshKey={refreshKey}
      />
      <Modal
        title="Tạo chiến dịch"
        open={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={null}
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
