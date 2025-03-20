import { Tabs } from 'antd';
import Search from '../../../components/search';
import StatisticsSection from '../../../components/admin/overview/StatisticsSection';
import OrdersTable from '../../../components/admin/overview/OrdersTable';
import Revenue from '../../../components/admin/overview/Revenue';
import ExportFile from '../../../components/admin/overview/ExportFile';

const Dashboard = () => {
  const handleSearch = (term: string) => {
    console.log('Tìm kiếm với từ khóa: ', term);
  };

  const items = [
    {
      key: '1',
      label: 'Đơn hàng',
      children: (
        <>
          <div className="flex justify-between items-center mb-4">
            <Search onSearch={handleSearch} placeholder="Tìm kiếm " />
            <ExportFile />
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <OrdersTable />
          </div>
        </>
      ),
    },
    {
      key: '2',
      label: 'Doanh thu',
      children: <Revenue />,
    },
  ];

  return (
    <div className="container mx-auto px-8 py-6">
      <StatisticsSection />
      <div className="mt-14">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default Dashboard;
