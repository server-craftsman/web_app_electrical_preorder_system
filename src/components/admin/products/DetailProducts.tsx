import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductService } from '../../../services/product/product.service';
import { GetAllProductResponseModel } from '../../../models/api/response/product.res.model';
import { Carousel, Card, Tag, Divider, Typography, Button } from 'antd';
import { ProductStatus } from '../../../app/enums/product.enum';
import { helper } from '../../../utils';
import {
  ArrowLeftOutlined,
  TagOutlined,
  CalendarOutlined,
  ShoppingOutlined,
  DollarOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const DetailProducts = () => {
  const { slug: initialSlug } = useParams();
  const [product, setProduct] = useState<GetAllProductResponseModel | null>(
    null
  );
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const navigate = useNavigate();
  const carouselRef = useRef<any>(null);

  const fetchProductDetail = useCallback(async () => {
    if (!initialSlug) return;
    try {
      const response = await ProductService.getBySlug(initialSlug);
      setProduct(response?.data.data.product as GetAllProductResponseModel);
      setCampaigns(response?.data.data.campaigns || []);
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error);
      setProduct(null);
      setCampaigns([]);
    }
  }, [initialSlug]);

  useEffect(() => {
    fetchProductDetail();
  }, [fetchProductDetail, initialSlug]);

  if (!product) return <h1>Không tìm thấy sản phẩm</h1>;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8 flex items-center">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mr-4"
          >
            <span className="ml-1">Quay lại</span>
          </Button>
          <Title level={2} className="m-0 text-gray-800 font-bold">
            Chi tiết sản phẩm
          </Title>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Product header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <Title level={3} className="m-0 text-white">
              {product.name}
            </Title>
            <div className="flex items-center mt-2">
              <Tag
                color={helper.formatProductStatus(
                  product.status as ProductStatus
                )}
                className="mr-2"
              >
                {product.status}
              </Tag>
              <Text className="text-white opacity-80">
                Mã: {product.productCode}
              </Text>
            </div>
          </div>

          {/* Product content */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left column - Images */}
              <div className="lg:w-1/2">
                <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
                  <Carousel
                    autoplay
                    ref={carouselRef}
                    className="rounded-xl overflow-hidden"
                    effect="fade"
                  >
                    {product.imageProducts?.map((img, index) => (
                      <div key={index}>
                        <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                          <img
                            src={img.imageUrl}
                            alt={img.altText || 'Product Image'}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </div>

                {/* Thumbnail Navigation */}
                <div className="flex flex-wrap gap-3 mt-4 justify-center">
                  {product.imageProducts?.map((img, index) => (
                    <div
                      key={index}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${carouselRef.current?.current === index ? 'border-blue-500 shadow-md' : 'border-gray-200'}`}
                      onClick={() => carouselRef.current?.goTo(index)}
                    >
                      <img
                        src={img.imageUrl}
                        alt={img.altText || 'Thumbnail'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column - Product details */}
              <div className="lg:w-1/2">
                <div className="space-y-6">
                  {/* Price section */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <Text className="text-gray-500">Giá bán</Text>
                      <Title level={3} className="m-0 text-blue-600">
                        {helper.formatCurrency(product.price)}
                      </Title>
                    </div>
                    <Divider className="my-4" />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Text className="text-gray-500">Danh mục</Text>
                        <div className="font-medium mt-1">
                          {product.category?.name}
                        </div>
                      </div>
                      <div>
                        <Text className="text-gray-500">Số lượng</Text>
                        <div className="font-medium mt-1">
                          {product.quantity} sản phẩm
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <Title level={4} className="mb-3">
                      Mô tả sản phẩm
                    </Title>
                    <Paragraph className="text-gray-700">
                      {product.description}
                    </Paragraph>
                  </div>

                  {/* Additional details */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <Title level={5} className="mb-4">
                      Thông tin chi tiết
                    </Title>
                    <div className="grid grid-cols-2 gap-y-4">
                      <div>
                        <Text className="text-gray-500">Mã sản phẩm</Text>
                        <div className="font-medium mt-1">
                          {product.productCode}
                        </div>
                      </div>
                      <div>
                        <Text className="text-gray-500">Thứ tự hiển thị</Text>
                        <div className="font-medium mt-1">
                          {product.position}
                        </div>
                      </div>
                      <div>
                        <Text className="text-gray-500">Ngày tạo</Text>
                        <div className="font-medium mt-1">
                          {helper.formatDate(new Date(product.createdAt))}
                        </div>
                      </div>
                      <div>
                        <Text className="text-gray-500">Cập nhật lần cuối</Text>
                        <div className="font-medium mt-1">
                          {helper.formatDate(new Date(product.updatedAt))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Information */}
        {Array.isArray(campaigns) && campaigns.length > 0 && (
          <div className="mt-8">
            <Title level={3} className="mb-6 flex items-center">
              <TagOutlined className="mr-2 text-blue-500" />
              Chiến dịch liên quan
            </Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaigns.map((campaign: any) => (
                <Card
                  key={campaign.id}
                  className="rounded-xl shadow-md hover:shadow-lg transition-shadow border-0 overflow-hidden"
                  headStyle={{
                    background: 'linear-gradient(to right, #4f46e5, #3b82f6)',
                    color: 'white',
                    borderBottom: 'none',
                  }}
                  title={
                    <div className="flex items-center">
                      <CalendarOutlined className="mr-2" />
                      {campaign.name}
                    </div>
                  }
                  extra={<Tag color="blue">{campaign.status}</Tag>}
                >
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <CalendarOutlined className="mr-2 text-blue-500" />
                      <span>
                        <strong>Thời gian:</strong>{' '}
                        {helper.formatDate(new Date(campaign.startDate))} -{' '}
                        {helper.formatDate(new Date(campaign.endDate))}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center text-gray-700">
                        <ShoppingOutlined className="mr-2 text-blue-500" />
                        <span>
                          <strong>Số lượng tối thiểu:</strong>{' '}
                          {campaign.minQuantity}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <ShoppingOutlined className="mr-2 text-blue-500" />
                        <span>
                          <strong>Số lượng tối đa:</strong>{' '}
                          {campaign.maxQuantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-700">
                      <DollarOutlined className="mr-2 text-blue-500" />
                      <span>
                        <strong>Tổng số tiền:</strong>{' '}
                        {helper.formatCurrency(campaign.totalAmount)}
                      </span>
                    </div>

                    <Divider className="my-3" />

                    <div>
                      <Title level={5} className="mb-3">
                        Các giai đoạn
                      </Title>
                      <div className="space-y-3">
                        {campaign.stages.map((stage: any) => (
                          <Card
                            key={stage.id}
                            size="small"
                            className="bg-gray-50 border-0"
                          >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div className="font-medium text-gray-800">
                                {stage.name}
                              </div>
                              <div className="text-gray-600 text-sm">
                                {helper.formatDate(new Date(stage.startDate))} -{' '}
                                {helper.formatDate(new Date(stage.endDate))}
                              </div>
                            </div>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-500">Đã bán:</span>{' '}
                                {stage.quantitySold}
                              </div>
                              <div>
                                <span className="text-gray-500">Mục tiêu:</span>{' '}
                                {stage.targetQuantity}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailProducts;
