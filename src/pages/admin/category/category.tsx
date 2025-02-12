import { Button, Modal } from 'antd'
import { useState } from 'react'
import CreateCategory from '../../../components/admin/category/CreateCategory'
import ViewCategory from '../../../components/admin/category/ViewCategory'
import Search from '../../../components/generic/home/search/Search'
const Category = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateCategory = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <div className='flex justify-between mb-4'>
      <Search onSearch={(searchTerm) => console.log(searchTerm)} />
      <Button onClick={handleCreateCategory} className='h-11 bg-black text-white'>
        Create
      </Button>
      </div>
      <ViewCategory />
      <Modal
        title="Create Category"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateCategory />
      </Modal>
    </div>
  )
}

export default Category
