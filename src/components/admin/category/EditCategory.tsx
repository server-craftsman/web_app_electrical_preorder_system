import {  useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { GetAllCategoryResponseModel } from '../../../models/api/response/category.res.model';
import { CategoryService } from '../../../services/category/category.service';

interface EditCategoryProps {
  category: GetAllCategoryResponseModel;  // Receive category data as prop
  onEditSuccess: () => void;
}

const EditCategory = ({ category, onEditSuccess }: EditCategoryProps) => {
  const [form] = Form.useForm();  

  // Populate form with category data
  useEffect(() => {
    form.setFieldsValue({
      id: category.id,
      name: category.name,
    });
  }, []);

  const handleSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      const updatedCategory = await CategoryService.update({ ...values, id: category.id });     
      if(updatedCategory){
        onEditSuccess();
      }
    } catch (error) {
      console.error('Failed to update category:', error);
    } finally {
      console.log("Load success!");
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
          block
        >
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditCategory;
