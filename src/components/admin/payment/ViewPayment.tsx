import React, { useEffect, useState } from 'react';
import { Table, Card, Typography, Pagination, Spin, Badge, Space, Select, Input, Button, Row, Col } from 'antd';
import { PaymentService } from '../../../services/payment/payment.service';
import moment from 'moment';
import { PaymentResModel } from '../../../models/api/response/payment.res.model';
import { formatCurrency, formatDateFullOptions, formatPaymentStatusColor } from '../../../utils/helper';
import { ReloadOutlined, FilterOutlined, UpOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const ViewPayment: React.FC = () => {
  const [payments, setPayments] = useState<PaymentResModel[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [methodFilter, setMethodFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[moment.Moment | null, moment.Moment | null] | null>(null);
  const [amountRange, setAmountRange] = useState<[number | null, number | null]>([null, null]);
  const [idFilter, setIdFilter] = useState<string | null>(null);
  
  // Sorting state
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<string>('desc');

  const fetchPayments = async (page: number = 0) => {
    setLoading(true);
    try {
      // Build query parameters for filtering and sorting
      const params: any = {
        page,
        size: pagination.pageSize,
        sortField,
        sortDirection,
      };
      
      // Add filters if they exist
      if (statusFilter) params.status = statusFilter;
      if (methodFilter) params.method = methodFilter;
      if (idFilter) params.id = idFilter;
      
      if (dateRange && dateRange[0] && dateRange[1]) {
        params.createdAtFrom = dateRange[0].format('YYYY-MM-DD');
        params.createdAtTo = dateRange[1].format('YYYY-MM-DD');
      }
      
      if (amountRange[0] !== null) params.amountFrom = amountRange[0];
      if (amountRange[1] !== null) params.amountTo = amountRange[1];
      
      const response = await PaymentService.getPayment(page, pagination.pageSize, params);
      if (response.data) {
        const paymentData = response.data.data;
        setPayments(paymentData.payments);
        setTotalAmount(paymentData.totalAmount);
        setPagination({
          ...pagination,
          current: paymentData.currentPage + 1,
          total: paymentData.totalElements,
          pageSize: paymentData.pageSize,
        });
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handlePageChange = (page: number) => {
    fetchPayments(page - 1);
  };
  
  const handleTableChange = (_pagination: any, _filters: any, sorter: any) => {
    if (sorter && sorter.field) {
      setSortField(sorter.field);
      setSortDirection(sorter.order === 'ascend' ? 'asc' : 'desc');
    }
    
    fetchPayments(0); // Reset to first page when sorting changes
  };
  
  const handleFilter = () => {
    fetchPayments(0); // Reset to first page when applying filters
  };
  
  const resetFilters = () => {
    setStatusFilter(null);
    setMethodFilter(null);
    setDateRange(null);
    setAmountRange([null, null]);
    setIdFilter(null);
    setSortField('createdAt');
    setSortDirection('desc');
    fetchPayments(0);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Số Tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `${formatCurrency(amount)}`,
    },
    {
      title: 'Phương Thức',
      dataIndex: 'method',
      key: 'method',
      render: (method: string) => method.replace('_', ' '),
      // Removed filters from here
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={formatPaymentStatusColor(status)}>
          {status.toUpperCase()}
        </span>
      ),
      // Removed filters from here
    },
    {
      title: 'Ngày Thanh Toán',
      dataIndex: 'date',
      key: 'date',
      render: (date: string | null) => 
        date ? formatDateFullOptions(new Date(date)) : 'Not paid yet',
    },
    {
      title: 'Ngày Tạo', 
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => formatDateFullOptions(new Date(date)),
      defaultSortOrder: 'descend' as const,
    },
  ];

  // Add state for filter panel visibility
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  
  // Toggle filter panel visibility
  const toggleFilterPanel = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={3}>Payment Management</Title>
            <Badge 
              count={`Total Amount: ${formatCurrency(totalAmount)}`} 
              style={{ backgroundColor: '#52c41a' }} 
            />
          </div>
          
          {/* Modified Filter UI with dropdown button */}
          <div className="filter-container">
            <div className="filter-buttons" style={{ marginBottom: '16px' }}>
              <Button 
                icon={filterVisible ? <UpOutlined /> : <FilterOutlined />}
                style={{ marginRight: '8px' }}
                onClick={toggleFilterPanel}
              >
                Bộ lọc nâng cao
              </Button>
              <Button 
                icon={<ReloadOutlined />} 
                onClick={resetFilters}
              >
                Đặt lại
              </Button>
            </div>
            
            {filterVisible && (
              <Card size="small" style={{ marginBottom: '16px' }}>
                <Row gutter={[24, 24]}>
                  <Col span={8}>
                    <div>
                      <h4>Sắp xếp theo</h4>
                      <Select
                        style={{ width: '100%' }}
                        placeholder="Vị trí"
                        value={sortField}
                        onChange={(value) => {
                          setSortField(value);
                          fetchPayments(0);
                        }}
                      >
                        <Option value="id">ID</Option>
                        <Option value="amount">Số tiền</Option>
                        <Option value="method">Phương thức</Option>
                        <Option value="status">Trạng thái</Option>
                        <Option value="date">Ngày thanh toán</Option>
                        <Option value="createdAt">Ngày tạo</Option>
                      </Select>
                    </div>
                    <div style={{ marginTop: '16px' }}>
                      <Select
                        style={{ width: '100%' }}
                        placeholder="Tăng dần"
                        value={sortDirection}
                        onChange={(value) => {
                          setSortDirection(value);
                          fetchPayments(0);
                        }}
                      >
                        <Option value="asc">Tăng dần</Option>
                        <Option value="desc">Giảm dần</Option>
                      </Select>
                    </div>
                  </Col>
                  
                  <Col span={8}>
                    <h4>Danh mục</h4>
                    <div style={{ marginBottom: '16px' }}>
                      <Select
                        style={{ width: '100%' }}
                        placeholder="Tất cả danh mục"
                        allowClear
                        value={methodFilter}
                        onChange={(value) => setMethodFilter(value)}
                      >
                        <Option value="CREDIT_CARD">Credit Card</Option>
                        <Option value="DEBIT_CARD">Debit Card</Option>
                        <Option value="PAYPAL">PayPal</Option>
                        <Option value="BANK_TRANSFER">Bank Transfer</Option>
                        <Option value="CASH">Cash</Option>
                      </Select>
                    </div>
                    
                    <div>
                      <Select
                        style={{ width: '100%' }}
                        placeholder="Tất cả trạng thái"
                        allowClear
                        value={statusFilter}
                        onChange={(value) => setStatusFilter(value)}
                      >
                        <Option value="">Tất cả</Option>
                        <Option value="PENDING">Pending</Option>
                        <Option value="PAID">Paid</Option>
                        <Option value="FAILED">Failed</Option>
                        <Option value="CANCELLED">Cancelled</Option>
                        <Option value="EXPIRED">Expired</Option>
                        <Option value="PROCESSING">Processing</Option>
                      </Select>
                    </div>
                  </Col>
                  
                  <Col span={8}>
                    <h4>Khoảng giá</h4>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Input
                        placeholder="Giá tối thiểu"
                        type="number"
                        value={amountRange[0] !== null ? amountRange[0] : ''}
                        onChange={(e) => setAmountRange([e.target.value ? Number(e.target.value) : null, amountRange[1]])}
                        style={{ width: '100%' }}
                      />
                      <Input
                        placeholder="Giá tối đa"
                        type="number"
                        value={amountRange[1] !== null ? amountRange[1] : ''}
                        onChange={(e) => setAmountRange([amountRange[0], e.target.value ? Number(e.target.value) : null])}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </Col>
                </Row>
                
                <div style={{ marginTop: '24px', textAlign: 'right' }}>
                  <Button 
                    type="primary" 
                    onClick={handleFilter}
                  >
                    Áp dụng bộ lọc
                  </Button>
                </div>
              </Card>
            )}
          </div>
          
          <Spin spinning={loading}>
            <Table 
              columns={columns} 
              dataSource={payments} 
              rowKey="id" 
              pagination={false}
              scroll={{ x: 1000 }}
              onChange={handleTableChange}
            />
          </Spin>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination 
              current={pagination.current} 
              total={pagination.total} 
              pageSize={pagination.pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default ViewPayment;
