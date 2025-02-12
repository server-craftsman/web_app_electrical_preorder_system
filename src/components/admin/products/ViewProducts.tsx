import { Table } from 'antd';

const ViewProducts = () => {
    const columns = [
        {
            title: 'Product Code',
            dataIndex: 'productCode',
            key: 'productCode',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
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

export default ViewProducts;
