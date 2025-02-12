import { Table } from 'antd';

const Account = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const data = [
    {
      key: '1',
      productCode: 'P001',
      name: 'Product 1',
      description: 'Description of Product 1',
      quantity: 10,
      price: 100,
      category: 'Category 1',
    },
    // Add more product data here
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Account;
