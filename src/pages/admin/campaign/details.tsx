import CampaignDetails from '../../../components/admin/campaign/DisplayDetails';
const CampaignDetailsPage = () => {
  return (
    <div>
      <CampaignDetails refresh={true} searchTerm="" refreshKey={0} />
    </div>
  );
};

export default CampaignDetailsPage;
