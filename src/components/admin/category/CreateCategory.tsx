import { useState } from 'react';
import { Form, Input } from 'antd';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (values: { name: string; description: string }) => {
    // Handle form submission logic here
    console.log('Category Name:', values.name);
    console.log('Category Description:', values.description);
  };

  return (
    <div className="max-w-md mx-auto">
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả danh mục!' }]}
        >
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <button
            className="bg-black text-white w-1/4 p-3 rounded-full shadow-lg hover:bg-blue-700"
            type="submit"
          >
            Tạo danh mục
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCategory;
