import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CampaignService } from '../../../services/campaign/campaign.service';
import { CampaignResponseModel } from '../../../models/api/response/campaign.res.model';
import { helper } from '../../../utils';
import { Tag } from 'antd';

interface CampaignDetailsProps {
  refresh?: boolean;
  searchTerm?: string;
  refreshKey?: number;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({
  refresh,
  searchTerm,
  refreshKey,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<CampaignResponseModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      setLoading(true);
      try {
        const response = await CampaignService.getById(id as string, {
          searchTerm,
        });
        setCampaign(response?.data?.data || null);
      } catch (error) {
        console.error('Failed to fetch campaign:', error);
        setCampaign(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id, refresh, searchTerm, refreshKey]); // Add refresh and searchTerm to dependencies

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-red-600">Campaign not found</h2>
        <p className="text-gray-600">
          The campaign you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  } else {
    return (
      <div className="px-8 min-h-screen">
        <button onClick={handleGoBack} className="mb-4 btn-custom">
          Quay lại
        </button>
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {campaign.name}
              </h2>
              <Tag color={helper.formatCampaignStatus(campaign.status)}>
                {campaign.status.toUpperCase()}
              </Tag>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Campaign Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem
                    label="Start Date"
                    value={helper.formatDateTime(new Date(campaign.startDate))}
                  />
                  <DetailItem
                    label="End Date"
                    value={helper.formatDateTime(new Date(campaign.endDate))}
                  />
                  <DetailItem
                    label="Min Quantity"
                    value={campaign.minQuantity}
                  />
                  <DetailItem
                    label="Max Quantity"
                    value={campaign.maxQuantity}
                  />
                  <DetailItem
                    label="Total Amount"
                    value={helper.formatCurrency(campaign.totalAmount)}
                    className="text-green-600 font-mono font-bold"
                  />
                  <DetailItem
                    label="Created At"
                    value={helper.formatDateTime(new Date(campaign.createdAt))}
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Product Information
                </h3>
                {campaign.product ? (
                  <div>
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-gray-700">
                        {campaign.product.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Code: {campaign.product.productCode}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <DetailItem
                        label="Price"
                        value={helper.formatCurrency(campaign.product.price)}
                        className="text-green-600 font-mono font-bold"
                      />
                      <DetailItem
                        label="Quantity"
                        value={campaign.product.quantity}
                      />
                      <DetailItem
                        label="Status"
                        value={
                          <p
                            className={`mr-20 text-center ${helper.formatProductStatus(campaign.product.status)}`}
                            dangerouslySetInnerHTML={{
                              __html: campaign.product.status,
                            }}
                          />
                        }
                      />
                      <DetailItem
                        label="Category"
                        value={campaign.product.category?.name || 'N/A'}
                      />
                    </div>

                    {campaign.product.description && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700">
                          Description:
                        </p>
                        <p className="text-sm text-gray-600">
                          {campaign.product.description}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No product information available
                  </p>
                )}
              </div>
            </div>

            {campaign.product?.imageProducts &&
              campaign.product.imageProducts.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Product Images
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {campaign.product.imageProducts.map((image, index) => (
                      <div
                        key={index}
                        className="rounded-lg overflow-hidden shadow-md"
                      >
                        <img
                          src={image.imageUrl}
                          alt={
                            image.altText ||
                            campaign.product?.name ||
                            'Product image'
                          }
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
};

const DetailItem: React.FC<{
  label: string;
  value: React.ReactNode;
  className?: string;
}> = ({ label, value, className }) => (
  <div className="mb-2">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    {typeof value === 'string' || typeof value === 'number' ? (
      <p className={`text-base text-gray-800 ${className || ''}`}>{value}</p>
    ) : (
      value
    )}
  </div>
);

export default CampaignDetails;
