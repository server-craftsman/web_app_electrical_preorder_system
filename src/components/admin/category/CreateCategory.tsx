import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useForm } from "antd/es/form/Form";
import { Form, Input } from 'antd';
import { GetAllCategoryResponseModel } from '../../../models/api/response/category.res.model';
import { CategoryService } from '../../../services/category/category.service';

interface CreateCategoryProps {
  onCategoryCreated: () => void;
}

const CreateCategory = forwardRef<CreateCategoryProps, CreateCategoryProps>(({ onCategoryCreated }, ref) => {
  const [form] = useForm();
  const [_isOpen, setOpen] = useState(false)
  const [categories, setCategories] = useState<GetAllCategoryResponseModel[]>(
    []
  );

      const fetchCategories = async () => {
        try {
          const response = await CategoryService.getAll({});
          if (Array.isArray(response.data?.data)) {
            setCategories(response.data.data);
          }
        } catch (error) {
          console.error('Failed to fetch categories:', error);
        }
      }

      useEffect(() => {
      fetchCategories();
    }, []);

  const handleSubmit = async () => {
    try {
    const { name } = form.getFieldsValue();
    const newCategory = {
      name,
      id: '', // or generate a unique id
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deleted: false
    };
    const createdCategory = await CategoryService.create(newCategory);

    const resolvedCategory: GetAllCategoryResponseModel = {
      id: createdCategory.data.data.id,
      name: createdCategory.data.data.name,
      createdAt: createdCategory.data.data.createdAt,
      updatedAt: createdCategory.data.data.updatedAt,
      deleted: createdCategory.data.data.deleted
    }

    setCategories([...categories, resolvedCategory]);
    form.resetFields();
    onCategoryCreated();
    setOpen(false);
  } catch (error) {
    console.error("Error creating category:", error);
  }
  };

  const handleOpenModal = () => {
    form.resetFields();
    fetchCategories();
    setCategories([]);
    setOpen(true);
  };

  useImperativeHandle(ref, () => ({
    handleOpenModal,
    onCategoryCreated
  }));

  return (
    <div className="max-w-md mx-auto">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả danh mục!' }]}
        >
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item> */}
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
});

export default CreateCategory;
