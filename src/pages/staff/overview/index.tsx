import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 5000 },
  { month: 'Feb', revenue: 7000 },
  { month: 'Mar', revenue: 8000 },
  { month: 'Apr', revenue: 6500 },
  { month: 'May', revenue: 9000 },
  { month: 'Jun', revenue: 11000 },
];

const expenseData = [
  { month: 'Jan', expense: 3000 },
  { month: 'Feb', expense: 4000 },
  { month: 'Mar', expense: 4500 },
  { month: 'Apr', expense: 5000 },
  { month: 'May', expense: 6000 },
  { month: 'Jun', expense: 7000 },
];

const Dashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Báo cáo Doanh thu & Chi phí</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Doanh thu</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Chi phí</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expenseData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="expense" fill="#FF5733" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
