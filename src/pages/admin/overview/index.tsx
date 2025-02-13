import Search from '../../../components/search';
import StatisticsSection from '../../../components/admin/overview/StatisticsSection';
import OrdersTable from '../../../components/admin/overview/OrdersTable';
import ExportFile from '../../../components/admin/overview/ExportFile';

const Dashboard = () => {
  const handleSearch = (term: string) => {
    console.log('Tìm kiếm với từ khóa: ', term);
  };

  return (
    <div className="container mx-auto px-8 py-6">
      <StatisticsSection />
      <div className="mt-14 flex justify-between items-center">
        <Search onSearch={handleSearch} placeholder="Tìm kiếm " />
        <ExportFile />
      </div>
      <div className="p-6 bg-white shadow-md rounded-lg mt-4">
        <OrdersTable />
      </div>
    </div>
  );
};

export default Dashboard;
