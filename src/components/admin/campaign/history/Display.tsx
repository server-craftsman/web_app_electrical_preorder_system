import React from 'react';

const CampaignHistoryDisplay: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg animate-fadeIn">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Campaign Histories
      </h3>
      <p className="text-gray-600">
        Campaign history records will be displayed here.
      </p>
    </div>
  );
};

export default CampaignHistoryDisplay;
