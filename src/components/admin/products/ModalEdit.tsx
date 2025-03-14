import { Form, message, Modal, Input, InputNumber, Upload, Select } from 'antd';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { ProductService } from '../../../services/product/product.service';
import { CategoryService } from '../../../services/category/category.service';
import { limitMemoryFile } from '../../../utils/validation';
import { Rule } from 'antd/es/form';
import { helper } from '../../../utils';

interface EditProductsProps {
  onProductUpdated: (newSlug?: string) => void;
  slug: string;
}

const EditProducts = forwardRef<
  { handleOpenModal: (slug: string) => void },
  EditProductsProps
>(({ onProductUpdated }, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [productId, setProductId] = useState<string | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAll({});
        if (Array.isArray(response.data?.data)) {
          setCategories(response.data.data);
        }
      } catch (error) {
        helper.notificationMessage('Lỗi khi lấy danh mục!', 'error');
      }
    };
    fetchCategories();
  }, []);

  // Fetch product details when opening modal
  const fetchProductDetail = async (slug: string) => {
    try {
      const response = await ProductService.getBySlug(slug);
      const product = response?.data?.data;
      if (product) {
        setProductId(product.product?.id || '');

        form.setFieldsValue({
          productCode: product.product?.productCode,
          name: product.product?.name,
          description: product.product?.description,
          quantity: product.product?.quantity,
          price: product.product?.price,
          position: product.product?.position || 0,
          category: product.product?.category?.id,
        });
        setFileList(
          product.product?.imageProducts?.map((img) => ({
            name: img.altText || 'Product Image',
            url: img.imageUrl,
          })) || []
        );
      }
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const newFiles: File[] = fileList
        .filter((file) => file.originFileObj)
        .map((file) => file.originFileObj);

      const existingImages = fileList
        .filter((file) => !file.originFileObj)
        .map((file) => ({
          imageUrl: file.url,
          altText: file.name,
        }));

      const updatedProduct = {
        productCode: values.productCode,
        name: values.name,
        quantity: values.quantity,
        description: values.description,
        price: values.price,
        position: values.position || 0,
        category: {
          id: values.category,
          name:
            categories.find((cat) => cat.id === values.category)?.name || '',
        },
        oldImageProducts: existingImages,
      };

      if (!productId) {
        message.error('Không tìm thấy ID sản phẩm!');
        return;
      }

      const response = await ProductService.update(
        productId,
        updatedProduct,
        newFiles
      );
      const newSlug = response.slug;

      helper.notificationMessage('Cập nhật sản phẩm thành công!', 'success');
      setIsModalVisible(false);
      onProductUpdated(newSlug);
    } catch (error) {
      console.error('Lỗi cập nhật sản phẩm:', error);
      helper.notificationMessage('Lỗi cập nhật sản phẩm!', 'error');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFileChange = (info: any) => {
    setFileList(info.fileList);
  };

  const handleOpenModal = (slug: string) => {
    setProductId(null);
    fetchProductDetail(slug);
    setIsModalVisible(true);
  };

  useImperativeHandle(ref, () => ({
    handleOpenModal,
  }));

  const validateFields = {
    name: {
      min: 3,
      max: 100,
      pattern: /^[a-zA-Z0-9\sÀ-ỹ]+$/,
      message:
        'Tên sản phẩm phải từ 3-100 ký tự, chỉ chứa chữ, số và khoảng trắng!',
    },
    description: {
      max: 500,
      message: 'Mô tả không được vượt quá 500 ký tự!',
    },
    quantity: {
      type: 'number',
      min: 0,
      max: 10000,
      message: 'Số lượng phải từ 0 đến 10,000!',
    },
    price: {
      type: 'number',
      min: 1000,
      max: 100000000,
      message: 'Giá phải từ 1,000 đến 100,000,000 VND!',
    },
    category: {
      message: 'Vui lòng chọn danh mục!',
    },
  };
  return (
    <Modal
      title="Chỉnh sửa sản phẩm"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Mã sản phẩm" name="productCode">
          <Input disabled />
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
        <Form.Item label="Thứ tự hiện thi sản phẩm" name="position">
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
        <Form.Item label="Hình ảnh sản phẩm" name="imageProducts">
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
  );
});

export default EditProducts;
