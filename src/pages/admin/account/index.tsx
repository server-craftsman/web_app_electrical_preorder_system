import Search from '../../../components/search';
import DisplayAccount from '../../../components/admin/account/DisplayAccount';
import { Modal } from 'antd';
import CreateUser from '../../../components/admin/account/CreateAccount';
import { useState } from 'react';

const Account = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleClose = () => {
    setIsModalVisible(false);
    setRefresh((prev) => !prev);
  };

  const handleCreateUser = () => {
    setIsModalVisible(true);
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Search onSearch={(searchTerm) => console.log(searchTerm)} />
        <button className="btn-submit" onClick={handleCreateUser}>Tạo tài khoản</button>
      </div>
      <DisplayAccount refresh={refresh} />
      <Modal title="Tạo người dùng" open={isModalVisible} onCancel={handleClose} footer={null}>
        <CreateUser
        onUserCreated={() => setRefresh((prev) => !prev)}
         onClose={handleClose} />
      </Modal>
    </div>
  );
};

export default Account;
