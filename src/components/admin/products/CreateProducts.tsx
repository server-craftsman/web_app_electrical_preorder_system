import { Form, Modal, Input, InputNumber, Upload, Select } from 'antd';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { ProductService } from '../../../services/product/product.service';
import { CategoryService } from '../../../services/category/category.service';
import { CreateProductRequestModel } from '../../../models/api/request/product.req.model';
import { limitMemoryFile } from '../../../utils/validation';
import { Rule } from 'antd/es/form';
import { helper } from '../../../utils';

interface CreateProductsProps {
  onProductCreated: () => void;
}

const CreateProducts = forwardRef<
  { handleOpenModal: () => void },
  CreateProductsProps
>(({ onProductCreated }, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [_totalCategories, setTotalCategories] = useState(0);
  const [refresh, _setRefresh] = useState(false);
  // const [loading, setLoading] = useState(false);

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await CategoryService.getAll({});
      if (Array.isArray(response.data?.data)) {
        setCategories(response.data.data);
        setTotalCategories(response.data?.data.length || 0);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [refresh]);

  const handleOk = async () => {
    try {
      // Validate form values
      const values = await form.validateFields();

      // Lấy danh sách file từ Upload
      const files = fileList.map((file) => file.originFileObj);

      const selectedCategory = categories.find(
        (cat) => cat.id === values.category
      );

      // Prepare product data
      const productData: CreateProductRequestModel = {
        productCode: values.productCode,
        name: values.name,
        quantity: values.quantity,
        description: values.description,
        price: values.price,
        position: 0,
        category: {
          id: values.category,
          name: selectedCategory ? selectedCategory.name : '',
        },
      };

      // Gửi dữ liệu lên API
      const response = await ProductService.create(productData, files);

      if (response) {
        helper.notificationMessage(
          'Sản phẩm đã được tạo thành công!',
          'success'
        );
        form.resetFields();
        setFileList([]);
        setIsModalVisible(false);
        onProductCreated(); // Call the callback to refresh products
      } else {
        helper.notificationMessage('Có lỗi xảy ra khi tạo sản phẩm!', 'error');
      }
    } catch (error) {
      console.log('Validate Failed:', error);
      helper.notificationMessage('Đã xảy ra lỗi!', 'error');
    } finally {
      // setLoading(false);
      console.log('Create product success!');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFileChange = (info: any) => {
    setFileList(info.fileList);
  };

  const handleOpenModal = () => {
    form.resetFields();
    fetchCategories();
    setFileList([]);
    setIsModalVisible(true);
  };

  useImperativeHandle(ref, () => ({
    handleOpenModal,
  }));

  const validateFields = {
    productCode: {
      required: true,
      pattern: /^[A-Z0-9]{3,10}$/,
      message: 'Mã sản phẩm phải từ 3-10 ký tự, chỉ chứa chữ hoa và số!',
    },
    name: {
      required: true,
      min: 3,
      max: 100,
      pattern: /^[a-zA-Z0-9\sÀ-ỹ]+$/,
      message:
        'Tên sản phẩm phải từ 3-100 ký tự, chỉ chứa chữ, số và khoảng trắng!',
    },
    description: {
      required: true,
      max: 500,
      message: 'Mô tả không được vượt quá 500 ký tự!',
    },
    quantity: {
      required: true,
      type: 'number',
      min: 0,
      max: 10000,
      message: 'Số lượng phải từ 0 đến 10,000!',
    },
    price: {
      required: true,
      type: 'number',
      min: 1000,
      max: 100000000,
      message: 'Giá phải từ 1,000 đến 100,000,000 VND!',
    },
    category: {
      required: true,
      message: 'Vui lòng chọn danh mục!',
    },
    imageProducts: {
      required: true,
      validator: (_: any, fileList: any[]) => {
        if (!fileList || fileList.length === 0) {
          return Promise.reject('Vui lòng chọn ít nhất 1 hình ảnh!');
        }
        if (fileList.length > 5) {
          return Promise.reject('Không được chọn quá 5 hình ảnh!');
        }
        return Promise.resolve();
      },
    },
  };

  return (
    <div>
      <Modal
        title="Thêm sản phẩm mới"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          name="productForm"
          initialValues={{
            productCode: '',
            name: '',
            description: '',
            quantity: 0,
            price: 0,
            category: '',
          }}
        >
          <Form.Item
            label="Mã sản phẩm"
            name="productCode"
            rules={[validateFields.productCode as Rule]}
          >
            <Input placeholder="Nhập mã sản phẩm. Ex: SP001" />
          </Form.Item>
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[validateFields.name as Rule]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[validateFields.description as Rule]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[validateFields.quantity as Rule]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[validateFields.price as Rule]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Danh mục"
            name="category"
            rules={[validateFields.category as Rule]}
          >
            <Select>
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Hình ảnh sản phẩm"
            name="imageProducts"
            rules={[validateFields.imageProducts as Rule]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={limitMemoryFile}
              multiple={true}
            >
              {fileList.length >= 5 ? null : <UploadOutlined />}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});

export default CreateProducts;
