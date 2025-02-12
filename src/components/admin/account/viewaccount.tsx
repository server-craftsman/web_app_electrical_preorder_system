import { Table, Button } from 'antd';

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
        <span className='flex space-x-3'>
          <Button className='bg-blue-500 text-white' icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 0 1 3.182 3.182l-9.193 9.193a4.5 4.5 0 0 1-1.591 1.06l-3.25 1.083a.75.75 0 0 1-.95-.95l1.083-3.25a4.5 4.5 0 0 1 1.06-1.591l9.193-9.193z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12.75V19.5a2.25 2.25 0 0 1-2.25 2.25h-12A2.25 2.25 0 0 1 3 19.5v-12A2.25 2.25 0 0 1 5.25 5.25h6.75" />
            </svg>
          } />
          <Button className='bg-red-500 text-white' icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18.75A2.25 2.25 0 0 0 8.25 21h7.5A2.25 2.25 0 0 0 18 18.75V7.5H6v11.25zM9.75 3.75h4.5m-4.5 0a.75.75 0 0 0-.75.75v.75h6v-.75a.75.75 0 0 0-.75-.75h-4.5zM9 10.5v6m3-6v6m3-6v6" />
            </svg>
          } />
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
