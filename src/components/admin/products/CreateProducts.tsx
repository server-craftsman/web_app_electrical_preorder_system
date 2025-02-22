import { Form, message, Modal, Input, InputNumber, Upload, Button, Select } from 'antd';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
// import { BaseService } from '../../../services/config/base.service'; // Adjust import path as needed
import { ProductService } from '../../../services/product/product.service'; // Add import for createProduct function
import { CategoryService } from '../../../services/category/category.service';
import { CreateProductRequestModel } from '../../../models/api/request/product.req.model';

// Define the props type
interface CreateProductsProps {
    onProductCreated: () => void;
}

const CreateProducts = forwardRef<{ handleOpenModal: () => void }, CreateProductsProps>(
    ({ onProductCreated }, ref) => {
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
                        name: values.name
                    },
                };

                // Gửi dữ liệu lên API
                const response = await ProductService.create(productData, files);

                if (response) {
                    message.success("Sản phẩm đã được tạo thành công!");
                    form.resetFields();
                    setFileList([]);
                    setIsModalVisible(false);
                    onProductCreated(); // Call the callback to refresh products
                } else {
                    message.error("Có lỗi xảy ra khi tạo sản phẩm!");
                }
            } catch (error) {
                console.log("Validate Failed:", error);
                message.error("Đã xảy ra lỗi!");
            } finally {
                // setLoading(false);
                console.log("Create product success!");
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
            handleOpenModal
        }));

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
                            rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả"
                            name="description"
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng"
                            name="quantity"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                        >
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                            label="Giá"
                            name="price"
                            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                        >
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item
                            label="Danh mục"
                            name="category"
                            rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
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
                            <Upload fileList={fileList} onChange={handleFileChange} beforeUpload={() => false} multiple={true}>
                                <Button>Chọn hình ảnh</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
);

export default CreateProducts
