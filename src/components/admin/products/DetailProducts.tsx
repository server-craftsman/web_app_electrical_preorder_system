import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductService } from '../../../services/product/product.service';
import { GetAllProductResponseModel } from '../../../models/api/response/product.res.model';
import { Carousel } from 'antd';
import { ProductStatus } from '../../../app/enums/product.status';
import EditProducts from './EditProducts';

const DetailProducts = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<GetAllProductResponseModel | null>(
    null
  );
  const navigate = useNavigate();
  const carouselRef = useRef<any>(null);
  const editProductRef = useRef<{
    handleOpenModal: (id: string) => void;
  } | null>(null);

  const fetchProductDetail = useCallback(async () => {
    if (!productId) return;
    try {
      const response = await ProductService.detail(productId);
      setProduct(response?.data.data);
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error);
      setProduct(null);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductDetail();
  }, [fetchProductDetail]);

  if (!product)
    return (
      <p className="text-center text-gray-500">Không tìm thấy sản phẩm.</p>
    );

  const getStatusStyle = (status: ProductStatus) => {
    switch (status) {
      case ProductStatus.AVAILABLE:
        return 'bg-green-500';
      case ProductStatus.OUT_OF_STOCK:
        return 'bg-yellow-500';
      case ProductStatus.PREORDER:
        return 'bg-blue-500';
      case ProductStatus.DISCONTINUED:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row">
        {/* Image and Thumbnails Column */}
        <div className="md:w-2/3">
          {/* Carousel Banner */}
          <div className="mt-4 relative">
            <Carousel
              autoplay
              ref={carouselRef}
              className="rounded-lg overflow-hidden shadow"
            >
              {product.imageProducts?.map((img, index) => (
                <div key={index} className="w-full h-80">
                  <img
                    src={img.imageUrl}
                    alt={img.altText || 'Product Banner'}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Carousel>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex space-x-2 mt-3">
            {product.imageProducts?.map((img, index) => (
              <img
                key={index}
                src={img.imageUrl}
                alt={img.altText}
                className="w-16 h-16 rounded border cursor-pointer hover:opacity-75 transition-all duration-300"
                onClick={() => carouselRef.current.goTo(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Info and Actions Column */}
        <div className="md:w-1/3 md:pl-6 mt-6 md:mt-0">
          {/* Thông tin sản phẩm */}
          <div className="space-y-2 text-gray-700">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <span
              className={`px-3 py-1 text-white text-sm font-semibold rounded ${getStatusStyle(product.status as ProductStatus)}`}
            >
              {product.status}
            </span>
            <p>
              <strong className="text-black">Mã sản phẩm:</strong>{' '}
              {product.productCode}
            </p>
            <p>
              <strong className="text-black">Danh mục:</strong>{' '}
              {product.category?.name}
            </p>
            <p>
              <strong className="text-black">Mô tả:</strong>{' '}
              {product.description}
            </p>
            <p>
              <strong className="text-black">Giá:</strong>{' '}
              <span className="text-lg font-bold text-green-600">
                ${product.price}
              </span>
            </p>
            <p>
              <strong className="text-black">Số lượng:</strong>{' '}
              {product.quantity}
            </p>
            <p>
              <strong className="text-black">Thứ tự hiện thi sản phẩm:</strong> {product.position}
            </p>
            <p>
              <strong className="text-black">Ngày tạo:</strong>{' '}
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong className="text-black">Cập nhật lần cuối:</strong>{' '}
              {new Date(product.updatedAt).toLocaleDateString()}
            </p>
          </div>

          {/* Hành động */}
          <div className="mt-6 flex flex-col space-y-2">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600 transition-all"
            >
              Quay lại
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition-all">
              Xóa sản phẩm
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
              onClick={() =>
                editProductRef.current?.handleOpenModal(productId!)
              }
            >
              Chỉnh sửa sản phẩm
            </button>

            <EditProducts ref={editProductRef} onProductUpdated={fetchProductDetail} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProducts;
