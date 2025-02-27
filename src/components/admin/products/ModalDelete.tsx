import { forwardRef, useState, useImperativeHandle } from 'react';
import { Modal, Button } from 'antd';
import { ProductService } from '../../../services/product/product.service';
import { helper } from '../../../utils';

interface ModalDeleteProps {
  onProductDeleted: () => void;
  slug: string;
}

const ModalDelete = forwardRef<
  { handleOpenModal: (slug: string) => void },
  ModalDeleteProps
>(({ onProductDeleted }, ref) => {
  const [productId, setProductId] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    handleOpenModal: (slug: string) => {
      setVisible(true);
      fetchProductDetail(slug);
    },
  }));

  const fetchProductDetail = async (slug: string) => {
    const response = await ProductService.getBySlug(slug);
    const product = response.data.data;
    if (product) {
      setProductId(product.id);
    }
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleDelete = async () => {
    try {
      await ProductService.delete(productId);
      helper.notificationMessage('Xóa sản phẩm thành công');
      onClose();
      onProductDeleted();
    } catch (error) {
      helper.notificationMessage('Lỗi khi xóa sản phẩm', 'error');
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" danger onClick={handleDelete}>
          Xóa
        </Button>,
      ]}
    >
      <p className="text-center text-lg font-bold">
        Bạn có chắc chắn muốn xóa sản phẩm này không?
      </p>
    </Modal>
  );
});

export default ModalDelete;
