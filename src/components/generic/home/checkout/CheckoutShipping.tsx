import React, { useState } from 'react';
import { Card, Typography, Radio, Button, Divider, InputNumber, Spin, notification, Modal } from 'antd';
// import QRCode from 'qrcode.react'; // Add this import

import { QRCodeSVG } from 'qrcode.react';

import {
  CreditCardOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  QrcodeOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useCart } from '../../../../contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { PaymentService } from '../../../../services/payment/payment.service';
import { PaymentMethod } from '../../../../app/enums';

const { Title, Text } = Typography;

interface CheckoutShippingProps {
  shippingInfo: any;
  isFormValid: boolean;
  onCheckout: () => void;
}

const CheckoutShipping: React.FC<CheckoutShippingProps> = ({ shippingInfo, isFormValid }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('cod');
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');
  //const campaignId = queryParams.get('campaignId');
  
  const [quantity, setQuantity] = useState(
    cartItems.reduce((total, item) => total + item.quantity, 0)
  );
  const [orderCode, setOrderCode] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!isFormValid) {
      notification.error({
        message: 'Lỗi',
        description: 'Vui lòng điền đầy đủ thông tin vận chuyển',
      });
      return;
    }

    if (!orderId) {
      notification.error({
        message: 'Lỗi',
        description: 'Không tìm thấy thông tin đơn hàng',
      });
      return;
    }

    try {
      setLoading(true);
      
      if (paymentMethod === 'payos') {
        const paymentRequest = {
          orderIds: [orderId],
          buyerName: shippingInfo.buyerName,
          buyerPhone: shippingInfo.buyerPhone,
          buyerAddress: shippingInfo.buyerAddress,
          method: PaymentMethod.CREDIT_CARD,
        };

        const response = await PaymentService.createPayment(paymentRequest);
        
        if (response?.data?.data) {
          setQrCodeUrl(response.data.data.qrCode);
          setOrderCode(response.data.data.orderCode.toString());
          setShowQrModal(true);
        } else {
          throw new Error('Payment processing failed');
        }
      } else {
        // For COD, just complete the order
        notification.success({
          message: 'Thành công',
          description: 'Đơn hàng của bạn đã được đặt thành công!',
        });
        navigate('/payment-success');
      }
    } catch (error) {
      console.error('Payment error:', error);
      notification.error({
        message: 'Lỗi',
        description: 'Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại!',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentConfirmation = async () => {
    try {
      setLoading(true);
      
      if (!orderCode) {
        throw new Error('Order code not found');
      }

      // Call API to confirm payment
      await PaymentService.getPaymentByOrderCode(orderCode);

      // Close the QR modal
      setShowQrModal(false);
      
      // Show success notification
      notification.success({
        message: 'Xác nhận thanh toán',
        description: 'Cảm ơn bạn đã thanh toán. Đơn hàng của bạn đang được xử lý!',
      });
      
      // Navigate to payment success page
      navigate('/payment-success');
    } catch (error) {
      console.error('Payment confirmation error:', error);
      notification.error({
        message: 'Lỗi',
        description: 'Có lỗi xảy ra khi xác nhận thanh toán. Vui lòng thử lại!',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6">
      <div className="flex items-center justify-between mb-6">
        <Title level={3} className="text-gray-800 m-0 font-bold">
          Phương thức thanh toán
        </Title>
        <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
      </div>

      <div className="mt-4">
        <div className="mb-6">
          <Text strong className="text-gray-700 block mb-2">
            Số lượng sản phẩm:
          </Text>
          <InputNumber
            min={1}
            value={quantity}
            onChange={(value) => setQuantity(value as number)}
            className="w-32"
            size="large"
          />
        </div>

        <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
          <Radio.Group
            onChange={(e) => setPaymentMethod(e.target.value)}
            value={paymentMethod}
            className="w-full"
          >
            <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
              <Radio value="cod" className="w-full">
                <div className="flex items-center ml-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <DollarOutlined className="text-green-600 text-lg" />
                  </div>
                  <div>
                    <Text strong className="text-gray-800">
                      Thanh toán khi giao hàng (COD)
                    </Text>
                    <p className="text-gray-500 text-sm m-0">
                      Thanh toán bằng tiền mặt khi nhận hàng
                    </p>
                  </div>
                </div>
              </Radio>
            </div>

            <Divider className="m-0" />

            <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
              <Radio value="payos" className="w-full">
                <div className="flex items-center ml-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <CreditCardOutlined className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <Text strong className="text-gray-800">
                      Thanh toán online qua PayOS
                    </Text>
                    <p className="text-gray-500 text-sm m-0">
                      Thanh toán an toàn với PayOS
                    </p>
                  </div>
                </div>
              </Radio>
            </div>
          </Radio.Group>
        </Card>

        <div className="mt-6 flex justify-center">
          {loading ? (
            <Spin size="large" />
          ) : (
            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              className="h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-500 border-0 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              onClick={handlePayment}
              disabled={!isFormValid}
            >
              <span className="ml-2 font-medium">
                {paymentMethod === 'cod'
                  ? 'Hoàn tất đặt hàng'
                  : 'Thanh toán ngay'}
              </span>
            </Button>
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      <Modal
        title={
          <div className="flex items-center">
            <QrcodeOutlined className="text-blue-500 mr-2" />
            <span>Quét mã QR để thanh toán</span>
          </div>
        }
        open={showQrModal}
        onCancel={() => setShowQrModal(false)}
        footer={[
          <Button 
            key="cancel" 
            onClick={() => setShowQrModal(false)}
          >
            Hủy
          </Button>,
          <Button
            key="confirm"
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={handlePaymentConfirmation}
            className="bg-green-500 hover:bg-green-600"
          >
            Tôi đã thanh toán
          </Button>
        ]}
        width={400}
        centered
      >
        <div className="flex flex-col items-center">
          {qrCodeUrl && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
              <QRCodeSVG
                value={qrCodeUrl}
                size={256}
                level="H"
                includeMargin={true}
              />
            </div>
          )}
          <p className="text-gray-500 text-sm mt-4 text-center">
            Quét mã QR bằng ứng dụng ngân hàng hoặc ví điện tử để thanh toán.<br />
            Sau khi thanh toán, nhấn "Tôi đã thanh toán".
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutShipping;
