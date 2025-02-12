import { useState } from 'react';
import { Form, Input, Button } from 'antd';

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (values: { name: string; description: string }) => {
        // Handle form submission logic here
        console.log('Category Name:', values.name);
        console.log('Category Description:', values.description);
    };

    return (
        <div>
            <Form onFinish={handleSubmit}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the category name!' }]}
                >
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input the category description!' }]}
                >
                    <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateCategory;
