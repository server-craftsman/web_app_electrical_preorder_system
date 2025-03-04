import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CampaignService } from '../../../services/campaign/campaign.service';
import { CampaignResponseModel } from '../../../models/api/response/campaign.res.model';
import { helper } from '../../../utils';
import { Tag } from 'antd';
import CampaignStageDisplay from './stage/Display';
import CreateStage from './stage/Create';

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
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  // Add this function to validate UUID
  const isValidUUID = (uuid: string) => {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  };
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        if (!id || !isValidUUID(id)) {
          throw new Error('Invalid campaign ID');
        }
        const response = await CampaignService.getById(id, searchTerm);
        setCampaign(response?.data?.data || null);
      } catch (error) {
        console.error('Failed to fetch campaign:', error);
        setCampaign(null);
      } finally {
        console.log('fetchCampaign');
      }
    };
    fetchCampaign();
  }, [id, refresh, refreshKey]);
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCreateStage = () => {
    setIsCreateModalVisible(true); // Open modal
  };

  const handleCreateStageSuccess = () => {
    setIsCreateModalVisible(false);
    // Refresh stages or campaign details if needed
  };

  const handleCreateStageCancel = () => {
    setIsCreateModalVisible(false);
  };

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
      <div className="px-8 py-6 min-h-screen bg-gray-50">
        <button
          onClick={handleGoBack}
          className="mb-6 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>

        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="px-10 py-8">
            <div className="flex justify-between items-center mb-8 border-b pb-6">
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
                {campaign.name}
              </h2>
              <Tag
                color={helper.formatCampaignStatus(campaign.status)}
                className="px-4 py-1 text-sm font-medium"
              >
                {campaign.status.toUpperCase()}
              </Tag>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Campaign Details
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <DetailItem
                    label="Start Date"
                    value={helper.formatDateFullOptions(
                      new Date(campaign.startDate)
                    )}
                  />
                  <DetailItem
                    label="End Date"
                    value={helper.formatDateFullOptions(
                      new Date(campaign.endDate)
                    )}
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
                    className="text-green-600 font-mono font-bold text-lg"
                  />
                  <DetailItem
                    label="Created At"
                    value={helper.formatDateTime(new Date(campaign.createdAt))}
                  />
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Product Information
                </h3>
                {campaign.product ? (
                  <div>
                    <div className="mb-6 pb-4 border-b">
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">
                        {campaign.product.name}
                      </h4>
                      <p className="text-sm text-gray-600 font-medium">
                        Product Code: {campaign.product.productCode}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <DetailItem
                        label="Price"
                        value={helper.formatCurrency(campaign.product.price)}
                        className="text-green-600 font-mono font-bold text-lg"
                      />
                      <DetailItem
                        label="Quantity"
                        value={campaign.product.quantity}
                      />
                      <DetailItem
                        label="Status"
                        value={
                          <p
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${helper.formatProductStatus(campaign.product.status)}`}
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
                      <div className="mt-6 pt-4 border-t">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Description
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {campaign.product.description}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
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

            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Campaign Stages
                  </h3>
                </div>
                <div>
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                    onClick={handleCreateStage}
                    disabled={!campaign || !isValidUUID(campaign.id)}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Create Campaign Stage
                  </button>
                </div>
              </div>
              {campaign && isValidUUID(campaign.id) ? (
                <CampaignStageDisplay id={campaign.id} /> // Ensure id is passed correctly
              ) : (
                <p className="text-gray-500">Unable to load campaign stages</p>
              )}
            </div>
            <CreateStage
              visible={isCreateModalVisible}
              onCreate={handleCreateStageSuccess}
              onCancel={handleCreateStageCancel}
              id={campaign?.id || ''} // Ensure id is a string
            />
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
