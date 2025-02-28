import { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import Pagination from '../../pagination';
import { CampaignService } from '../../../services/campaign/campaign.service';
// import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
// import { ROUTER_URL } from '../../../const';
import { helper } from '../../../utils';
import { CampaignResponseModel } from '../../../models/api/response/campaign.res.model';
import { GetAllProductResponseModel } from '../../../models/api/response/product.res.model';
import { formatCampaignStatus } from '../../../utils/helper';
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
  // const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const pageSize = 10;

  // const navigate = useNavigate();
  
  const fetchCampaigns = async (page: number) => {
    try {
    const response = await CampaignService.getAll({
      page: page -1,
      size: pageSize,
      searchTerm,
    });
    const content = response?.data?.data?.content;
    const total = response?.data?.data?.page?.totalElements;

    if(Array.isArray(content)) {
      setCampaigns(content);
      setTotalCampaigns(total || 0);
    } else {
      setCampaigns([]);
      setTotalCampaigns(0);
    }
  } catch (error){
    console.error('Failed to fetch products:', error);
    setCampaigns([]);
    setTotalCampaigns(0);
  } finally {
    console.log('fetchCampaigns');
  }
  }

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on search or refresh
  }, [refreshKey]);

  useEffect(() => {
    fetchCampaigns(currentPage);
  }, [currentPage, refresh, refreshKey])

  const columns = [
    {
      title: 'Tên chiến dịch',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text: string) => helper.formatDate(new Date(text)), // Chuyển đổi sang Date
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text: string) => helper.formatDate(new Date(text)),
    },
    
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
      render: (value: number) => helper.formatCurrency(value), // Giả sử có hàm format tiền tệ
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={formatCampaignStatus(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      key: 'product',
      render: (product: GetAllProductResponseModel) => product?.name || 'N/A',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, _record: CampaignResponseModel) => (
        <div>
          <EyeOutlined 
            style={{ color: 'blue', marginRight: 8, cursor: 'pointer' }}
            // onClick={() => navigate(`${ROUTER_URL.CAMPAIGN_DETAIL}/${record.id}`)}
          />
          <EditOutlined
            style={{ color: 'green', marginRight: 8, cursor: 'pointer' }}
            // onClick={() => navigate(`${ROUTER_URL.CAMPAIGN_EDIT}/${record.id}`)}
          />
          <DeleteOutlined
            style={{ color: 'red', cursor: 'pointer' }}
            // onClick={() => setIsDeleteModalVisible(true)}
          />
        </div>
      ),
    },
  ];
  
  return (
    <div>
      <Table
        dataSource={campaigns}
        columns={columns}
        rowKey="id"
        pagination={false} // Bỏ pagination mặc định để dùng custom pagination
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalCampaigns / pageSize)}
        onPageChange={(page) => setCurrentPage(page)}
        />
    </div>
  );
  
}

export default ViewCampaign
