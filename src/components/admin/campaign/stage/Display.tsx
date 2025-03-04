import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { StageService } from '../../../../services/campaign/stage.service';
import { CampaignStageResponseModel } from '../../../../models/api/response/campaign.res.model';
import { HTTP_STATUS } from '../../../../app/enums';
import { helper } from '../../../../utils';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import Delete from './Delete';

interface CampaignStageDisplayProps {
  id: string;
}

import UpdateStage from './Update'; // Import the UpdateStage component

const CampaignStageDisplay: React.FC<CampaignStageDisplayProps> = ({ id }) => {
  const [stages, setStages] = useState<CampaignStageResponseModel[]>([]);
  const [isUpdateModalVisible, setIsUpdateModalVisible] =
    useState<boolean>(false);
  const [selectedStage, setSelectedStage] =
    useState<CampaignStageResponseModel | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getAllStages();
    }
  }, [id]);

  const getAllStages = async () => {
    try {
      const response = await StageService.getAll(id); // Remove the redundant parameter
      if (response.status === HTTP_STATUS.OK) {
        setStages(
          response.data?.data as unknown as CampaignStageResponseModel[]
        );
      }
    } catch (error) {
      helper.notificationMessage('Error fetching campaign stages', 'error');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: string) => {
    try {
      return format(new Date(date), 'MMM dd, yyyy HH:mm');
    } catch {
      return 'Invalid Date';
    }
  };

  const handleUpdateStage = (stage: CampaignStageResponseModel) => {
    setSelectedStage(stage);
    setIsUpdateModalVisible(true);
  };

  const handleDeleteStage = (stage: CampaignStageResponseModel) => {
    setSelectedStage(stage);
    setIsDeleteModalVisible(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            Campaign Stages
          </h3>
          <button
            onClick={getAllStages}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Refresh
          </button>
        </div>

        {stages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No campaign stages found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stage Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity Sold
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Target Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stages.map((stage, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/campaign/stage/${stage.id}`}>
                          <div className="text-sm font-medium text-gray-900">
                            {stage.name}
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(stage.status)}`}
                        >
                          {stage.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {stage.quantitySold.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {stage.targetQuantity.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs text-gray-500">
                          <div>Start: {formatDate(stage.startDate)}</div>
                          <div>End: {formatDate(stage.endDate)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleUpdateStage(stage)}
                            className="p-2 text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                          >
                            <EditOutlined />
                          </button>
                          <button
                            onClick={() => handleDeleteStage(stage)}
                            className="p-2 text-red-600 hover:text-red-900 transition-colors duration-200"
                          >
                            <DeleteOutlined />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <UpdateStage
        visible={isUpdateModalVisible}
        onUpdate={() => {
          setIsUpdateModalVisible(false);
          getAllStages();
        }}
        onCancel={() => {
          setIsUpdateModalVisible(false);
          setSelectedStage(null);
        }}
        stageId={selectedStage?.id || ''}
        campaignId={id}
        initialData={selectedStage}
      />

      <Delete
        visible={isDeleteModalVisible}
        onDelete={() => {
          setIsDeleteModalVisible(false);
          setSelectedStage(null);
        }}
        onCancel={() => {
          setIsDeleteModalVisible(false);
          setSelectedStage(null);
        }}
        stageId={selectedStage?.id || ''}
        campaignId={id}
        onRefresh={getAllStages}
      />
    </div>
  );
};

export default CampaignStageDisplay;
