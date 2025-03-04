import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductService } from '../../../services/product/product.service';
import { GetAllProductResponseModel } from '../../../models/api/response/product.res.model';
import { Carousel } from 'antd';
import { ProductStatus } from '../../../app/enums/product.enum';
import { helper } from '../../../utils';

const DetailProducts = () => {
  const { slug: initialSlug } = useParams();
  const [product, setProduct] = useState<GetAllProductResponseModel | null>(
    null
  );
  const navigate = useNavigate();
  const carouselRef = useRef<any>(null);

  const fetchProductDetail = useCallback(async () => {
    if (!initialSlug) return;
    try {
      const response = await ProductService.getBySlug(initialSlug);
      setProduct(response?.data.data);
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error);
      setProduct(null);
    }
  }, [initialSlug]);

  useEffect(() => {
    fetchProductDetail();
  }, [fetchProductDetail, initialSlug]);

  if (!product)
    return (
      <p className="text-center text-gray-500">Không tìm thấy sản phẩm.</p>
    );

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
              className={`px-3 py-1 text-white text-sm font-semibold rounded ${helper.formatProductStatus(product.status as ProductStatus)}`}
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
              {product.description.slice(0, 100)}
            </p>
            <p>
              <strong className="text-black">Giá:</strong>{' '}
              <span className="text-lg font-bold text-green-600">
                {helper.formatCurrency(product.price)}
              </span>
            </p>
            <p>
              <strong className="text-black">Số lượng:</strong>{' '}
              {product.quantity}
            </p>
            <p>
              <strong className="text-black">Thứ tự hiện thi sản phẩm:</strong>{' '}
              {product.position}
            </p>
            <p>
              <strong className="text-black">Ngày tạo:</strong>{' '}
              {helper.formatDate(new Date(product.createdAt))}
            </p>
            <p>
              <strong className="text-black">Cập nhật lần cuối:</strong>{' '}
              {helper.formatDate(new Date(product.updatedAt))}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProducts;
