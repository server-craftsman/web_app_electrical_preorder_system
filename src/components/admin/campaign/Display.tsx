import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import Pagination from '../../pagination';
import { CampaignService } from '../../../services/campaign/campaign.service';
import { useNavigate } from 'react-router-dom'; // Uncomment this line
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { helper } from '../../../utils';
import { CampaignResponseModel } from '../../../models/api/response/campaign.res.model';
import { GetAllProductResponseModel } from '../../../models/api/response/product.res.model';
import { formatCampaignStatus } from '../../../utils/helper';
import { ROUTER_URL } from '../../../const';
import { Modal } from 'antd';
import UpdateCampaign from './Update';
import DeleteCampaign from './Delete';

interface ViewCampaignProps {
  refresh: boolean;
  searchTerm: string;
  refreshKey: number;
}

const ViewCampaign = ({
  refresh,
  searchTerm,
  refreshKey,
}: ViewCampaignProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [campaigns, setCampaigns] = useState<CampaignResponseModel[]>([]);
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const pageSize = 10;
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedCampaign, setSelectedCampaign] =
    useState<CampaignResponseModel | null>(null);

  const navigate = useNavigate(); // Use the navigate hook

  const fetchCampaigns = async (page: number) => {
    try {
      const response = await CampaignService.getAll({
        page: page - 1,
        size: pageSize,
        searchTerm,
      });
      const content = response?.data?.data?.content;
      const total = response?.data?.data?.page?.totalElements;

      if (Array.isArray(content)) {
        setCampaigns(content);
        setTotalCampaigns(total || 0);
      } else {
        setCampaigns([]);
        setTotalCampaigns(0);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setCampaigns([]);
      setTotalCampaigns(0);
    } finally {
      console.log('fetchCampaigns');
    }
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on search or refresh
  }, [refreshKey]);

  useEffect(() => {
    fetchCampaigns(currentPage);
  }, [currentPage, refresh, refreshKey]);

  const handleEdit = (record: CampaignResponseModel) => {
    const campaignData = {
      ...record,
      startDate: record.startDate,
      endDate: record.endDate,
      product: record.product,
      productId: record.product?.id,
      totalAmount: record.totalAmount,
    };
    setSelectedCampaign(campaignData);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
    setSelectedCampaign(null);
  };

  const handleUpdateSuccess = () => {
    setIsUpdateModalVisible(false);
    setSelectedCampaign(null);
    fetchCampaigns(currentPage);
  };

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [campaignToDelete, setCampaignToDelete] =
    useState<CampaignResponseModel | null>(null);

  const handleDelete = (record: CampaignResponseModel) => {
    setCampaignToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteSuccess = () => {
    setIsDeleteModalVisible(false);
    setCampaignToDelete(null);
    fetchCampaigns(currentPage);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setCampaignToDelete(null);
  };

  // Update the actions column in columns array
  const columns = [
    {
      title: 'Tên chiến dịch',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: CampaignResponseModel) => (
        <Link
          to={ROUTER_URL.ADMIN.CAMPAIGN_DETAIL.replace(':id', record.id)}
          className="text-blue-600 font-bold hover:underline"
        >
          {text}
        </Link>
      ),
    },
    // {
    //   title: 'Ngày bắt đầu',
    //   dataIndex: 'startDate',
    //   key: 'startDate',
    //   render: (text: string) => (
    //     <span className="font-semibold text-gray-800">
    //       {helper.formatDate(new Date(text))}
    //     </span>
    //   ),
    //   className: 'text-center whitespace-nowrap px-6 py-4',
    // },
    // {
    //   title: 'Ngày kết thúc',
    //   dataIndex: 'endDate',
    //   key: 'endDate',
    //   render: (text: string) => (
    //     <span className="font-semibold text-gray-800">
    //       {helper.formatDate(new Date(text))}
    //     </span>
    //   ),
    //   className: 'text-center whitespace-nowrap px-6 py-4',
    // },
    {
      title: 'Số lượng tối thiểu',
      dataIndex: 'minQuantity',
      key: 'minQuantity',
    },
    {
      title: 'Số lượng tối đa',
      dataIndex: 'maxQuantity',
      key: 'maxQuantity',
    },
    {
      title: 'Tổng giá trị',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (value: number) => (
        <span className="font-mono font-bold text-right text-green-600">
          {helper.formatCurrency(value)}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={formatCampaignStatus(status)}>
          {status.toUpperCase()}
        </span>
      ),
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      key: 'product',
      render: (product: GetAllProductResponseModel) => (
        <Link
          to={ROUTER_URL.ADMIN.PRODUCT}
          className="text-black font-bold hover:underline"
        >
          {product.name}
        </Link>
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: CampaignResponseModel) => (
        <span className="flex space-x-2">
          <button
            className="bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700"
            onClick={() =>
              navigate(
                ROUTER_URL.ADMIN.CAMPAIGN_DETAIL.replace(':id', record.id)
              )
            }
          >
            <EyeOutlined className="text-xl" />
          </button>
          <button
            className="bg-green-600 text-white p-2 rounded-lg shadow-lg hover:bg-green-700"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined className="text-xl" />
          </button>
          <button
            className="bg-red-600 text-white p-2 rounded-lg shadow-lg hover:bg-red-700"
            onClick={() => handleDelete(record)}
          >
            <DeleteOutlined className="text-xl" />
          </button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={campaigns}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalCampaigns / pageSize)}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <Modal
        title="Cập nhật chiến dịch"
        open={isUpdateModalVisible}
        onCancel={handleUpdateCancel}
        footer={null}
        destroyOnClose={true}
        style={{ top: 20, right: 20, position: 'absolute' }}
        wrapClassName="right-modal"
      >
        {selectedCampaign && (
          <UpdateCampaign
            campaign={selectedCampaign}
            onSuccess={handleUpdateSuccess}
            onCancel={handleUpdateCancel}
          />
        )}
      </Modal>
      <Modal
        title="Xóa chiến dịch"
        open={isDeleteModalVisible}
        onCancel={handleDeleteCancel}
        footer={null}
        destroyOnClose={true}
      >
        {campaignToDelete && (
          <DeleteCampaign
            campaignId={campaignToDelete.id}
            campaignName={campaignToDelete.name}
            onSuccess={handleDeleteSuccess}
            onCancel={handleDeleteCancel}
          />
        )}
      </Modal>
    </div>
  );
};

export default ViewCampaign;
