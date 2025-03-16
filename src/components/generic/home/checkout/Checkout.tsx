import React, { useState, useEffect } from 'react';
import { Row, Col, message } from 'antd';
import CheckoutForm from './CheckoutForm';
import CheckoutShipping from './CheckoutShipping';
import CheckoutSummary from './CheckoutSummary';
import { CampaignService } from '../../../../services/campaign/campaign.service';
import { useLocation } from 'react-router-dom';

interface CheckoutProps {
  onCheckout: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onCheckout }) => {
  const [formValues, setFormValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [campaigns, setCampaigns] = useState<
    Array<{ id: string; name: string }>
  >([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const campaignId = queryParams.get('campaignId');

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await CampaignService.getAll({}); // Pass an empty object if required
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
        message.error('Không thể tải danh sách chiến dịch');
      } finally {
        console.log(campaigns);
      }
    };

    fetchCampaigns();
  }, []);

  const handleFormValuesChange = (values: any) => {
    setFormValues(values);

    // Check if all required fields are filled
    const requiredFields = ['buyerName', 'buyerPhone', 'buyerAddress'];
    const isValid = requiredFields.every(
      (field) => values[field] && values[field].toString().trim() !== ''
    );
    setIsFormValid(isValid);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Thanh toán
        </h1>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <CheckoutForm
              onFormValuesChange={handleFormValuesChange}
              formValues={{ ...formValues, campaignId }}
              campaigns={campaigns}
            />

            <CheckoutShipping
              shippingInfo={{ ...formValues, campaignId }}
              isFormValid={isFormValid}
              onCheckout={onCheckout}
            />
          </Col>

          <Col xs={24} lg={8}>
            <CheckoutSummary />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Checkout;
