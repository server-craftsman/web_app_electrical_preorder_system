import { Button, Table } from 'antd'

const ViewCategory = () => {
    const columns = [
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <span className='flex space-x-2'>
                    <Button className='bg-blue-500 text-white'>Edit</Button>
                    <Button className='bg-red-500 text-white'>Delete</Button>
                </span>
            ),
        }
        // Add more columns as needed
    ]

    const data = [
        {
            key: '1',
            name: 'Electronics',
            description: 'Devices and gadgets',
        },
        {
            key: '2',
            name: 'Furniture',
            description: 'Home and office furniture',
        },
        // Add more data as needed
    ]

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default ViewCategory
