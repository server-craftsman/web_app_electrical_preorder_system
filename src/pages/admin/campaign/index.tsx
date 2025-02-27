import { Modal } from 'antd';
import { useState, useRef } from 'react';
import CreateCampaign from '../../../components/admin/compaign/CreateCampaign';
import Search from '../../../components/search';



const Campaign = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const createCampaignRef = useRef<{ handleOpenModal: () => void } | null>(null);
  const [, setRefreshCampaigns] = useState(false); // state to trigger refresh
  const [, setSearchTerm] = useState('')
  const [, setRefreshKey] = useState(0);

  const handleCreateCampaign = () => {
    setIsModalVisible(true);
    if (createCampaignRef.current) {
      createCampaignRef.current.handleOpenModal();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Trigger refresh of categories
  const handleCampaignCreated = () => {
    setRefreshCampaigns(prev => !prev); // toggle to trigger useEffect in ViewCategory
  };
  
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div>
    <div className="flex justify-between mb-4">
      <Search onSearch={handleSearch} />
      <button onClick={handleCreateCampaign} className="btn-submit">
        Tạo chiến dịch
      </button>
    </div>
    {/* <ViewCategory  refresh={refreshCategories} searchTerm={searchTerm} refreshKey={refreshKey}/> */}
    <Modal
      title="Tạo danh mục"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <CreateCampaign onCategoryCreated={handleCampaignCreated} onClose={handleCancel} />
    </Modal>
  </div>
  )
}

export default Campaign;
