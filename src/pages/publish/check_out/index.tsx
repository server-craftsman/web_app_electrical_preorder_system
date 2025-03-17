import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutForm from '../../../components/generic/home/checkout/CheckoutForm';
import CheckoutShipping from '../../../components/generic/home/checkout/CheckoutShipping';
import CheckoutSummary from '../../../components/generic/home/checkout/CheckoutSummary';
import { CampaignService } from '../../../services/campaign/campaign.service';
import { OrderService } from '../../../services/order/order.service';
import { PaymentService } from '../../../services/payment/payment.service';
import { PaymentMethod } from '../../../app/enums';
import logo1 from '../../../assets/Elecee_logo.jpg';
import { useCart } from '../../../contexts/CartContext';
import { Link } from 'react-router-dom';
import { helper } from '../../../utils';

const CheckoutPage: React.FC = () => {
  const [formValues, setFormValues] = useState<any>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [campaigns, setCampaigns] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const campaignId = queryParams.get('campaignId');
  const { cartItems } = useCart();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await CampaignService.getAll({});
        if (response.data && Array.isArray(response.data.data.content)) {
          setCampaigns(
            response.data.data.content.map((campaign: any) => ({
              id: campaign.id,
              name: campaign.name,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        helper.notificationMessage(
          'Không thể tải danh sách chiến dịch',
          'error'
        );
      }
    };

    fetchCampaigns();
  }, []);

  const handleFormValuesChange = (values: any) => {
    setFormValues(values);
    const requiredFields = ['buyerName', 'buyerPhone', 'buyerAddress'];
    const isValid = requiredFields.every(
      (field) => values[field] && values[field].toString().trim() !== ''
    );
    setIsFormValid(isValid);
  };

  const handleCheckout = async () => {
    if (!isFormValid) {
      helper.notificationMessage(
        'Vui lòng điền đầy đủ thông tin vận chuyển',
        'error'
      );
      return;
    }

    // Validate campaign ID
    if (!formValues.campaignId) {
      helper.notificationMessage(
        'Không tìm thấy chiến dịch. Vui lòng thử lại.',
        'error'
      );
      return;
    }

    try {
      // Create order
      const orderRequest = {
        campaignId: formValues.campaignId,
        quantity: cartItems.reduce(
          (total, item) => total + (item.quantity || 1),
          0
        ),
      };

      console.log('Order request:', orderRequest); // Debug log

      const orderResponse = await OrderService.createOrder(orderRequest);
      const newOrderId = orderResponse.data.data.orderId;

      // Handle payment
      if (formValues.paymentMethod === PaymentMethod.BANK_TRANSFER) {
        const paymentRequest = {
          orderIds: [newOrderId],
          buyerName: formValues.buyerName,
          buyerPhone: formValues.buyerPhone,
          buyerAddress: formValues.buyerAddress,
          method: formValues.paymentMethod,
        };

        console.log('Payment request:', paymentRequest); // Debug log

        const paymentResponse =
          await PaymentService.createPayment(paymentRequest);
        if (paymentResponse.data.data.paymentUrl) {
          helper.notificationMessage(
            'Đang chuyển hướng đến trang thanh toán...',
            'info'
          );
          window.location.href = paymentResponse.data.data.paymentUrl;
        } else {
          throw new Error('Không nhận được URL thanh toán');
        }
      } else {
        helper.notificationMessage('Đặt hàng thành công!', 'success');
        // Redirect to order confirmation page or home page
      }
    } catch (error) {
      console.error('Checkout error:', error);
      helper.notificationMessage(
        'Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại.',
        'error'
      );
    }
  };

  // Set default campaign ID if not already set
  useEffect(() => {
    if (campaigns.length > 0 && !formValues.campaignId) {
      setFormValues((prev: any) => ({
        ...prev,
        campaignId: campaignId || campaigns[0].id,
      }));
    }
  }, [campaigns, campaignId, formValues.campaignId]);

  return (
    <div className="checkout-page flex justify-center items-start gap-6 p-6">
      <div className="flex flex-col gap-6 w-2/3">
        {/* Logo */}
        <div className="flex flex-col">
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img
              src={logo1}
              alt="Eureka Logo"
              className="w-10 h-10 rounded-full object-cover shadow-sm"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-black text-transparent bg-clip-text tracking-tight">
              Elecee
            </span>
          </Link>
          <hr className="border-t border-gray-300 mt-6" />
        </div>
        <CheckoutForm
          onFormValuesChange={handleFormValuesChange}
          formValues={{ ...formValues, campaignId }}
          campaigns={campaigns}
        />
        <div className="-mt-6">
          <CheckoutShipping
            shippingInfo={{ ...formValues, campaignId }}
            isFormValid={isFormValid}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
      <CheckoutSummary />
    </div>
  );
};

export default CheckoutPage;
