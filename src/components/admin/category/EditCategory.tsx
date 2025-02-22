import { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { GetAllCategoryResponseModel } from '../../../models/api/response/category.res.model';
import { CategoryService } from '../../../services/category/category.service';

interface EditCategoryProps {
  category: GetAllCategoryResponseModel;  // Receive category data as prop
}

const EditCategory = ({ category }: EditCategoryProps) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Populate form with category data
  useEffect(() => {
    form.setFieldsValue({
      name: category.name,
    });
  }, [category]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const values = form.getFieldsValue();
      const updatedCategory = await CategoryService.update(category.id ?? '', values);  // Ensure id is a string
      console.log('Updated category:', updatedCategory);
    } catch (error) {
      console.error('Failed to update category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Tên danh mục"
        name="name"
        initialValue={category.name}
        rules={[{ required: true, message: 'Please input category name!' }]}
      >
        <Input />
      </Form.Item>
      {/* <Form.Item
        label="Description"
        name="description"
        initialValue={category.description}
      >
        <Input.TextArea />
      </Form.Item> */}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          block
        >
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditCategory;
