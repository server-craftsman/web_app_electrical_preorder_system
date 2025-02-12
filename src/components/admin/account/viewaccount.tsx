import { Table, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'; 
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 

const Account = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <span className='flex space-x-5'>
          <Button className='bg-blue-500' icon={<FontAwesomeIcon icon={faPenToSquare} />} />
          <Button className='bg-red-500'icon={<FontAwesomeIcon icon={faTrash} />} />
        </span>
      ),
    }
  ];

  const data = [
    {
      key: '1',
      name: 'Electronics',
      email: 'Devices and gadgets',
    },
    {
      key: '2',
      name: 'Furniture',
      email: 'khoabeo@gmail.com',
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Account;
