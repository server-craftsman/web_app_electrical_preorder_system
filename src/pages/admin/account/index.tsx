import Search from '../../../components/search';
import DisplayAccount from '../../../components/admin/account/DisplayAccount';
import { Modal } from 'antd';
import CreateUser from '../../../components/admin/account/CreateAccount';
import { useState, useRef } from 'react';

const Account = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(false);
  const formRef = useRef<any>(null);

  const handleClose = () => {
    if (formRef.current && formRef.current.resetFields) {
      formRef.current.resetFields();
    }
    formRef.current = null; // Clear the form reference
    setIsModalVisible(false);
  };

  const handleCreateUser = () => {
    setIsModalVisible(true);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setRefresh((prev) => !prev); // Trigger re-fetch
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Search onSearch={handleSearch} placeholder="Tìm kiếm tài khoản" />
        <button className="btn-submit" onClick={handleCreateUser}>
          Tạo tài khoản
        </button>
      </div>
      <DisplayAccount searchTerm={searchTerm} refresh={refresh} />
      <Modal
        title="Tạo người dùng"
        open={isModalVisible}
        onCancel={handleClose}
        destroyOnClose={true} // Ensure modal content is destroyed on close
        footer={null}
      >
        <CreateUser
          formRef={formRef}
          onUserCreated={() => {
            setRefresh((prev) => !prev);
            setIsModalVisible(false);
          }}
          onClose={handleClose}
        />
      </Modal>
    </div>
  );
};

export default Account;
