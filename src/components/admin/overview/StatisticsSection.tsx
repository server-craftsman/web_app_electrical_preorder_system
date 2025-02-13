import StatCard from '../../../components/admin/overview/StatCard';
import { CheckCircleIcon, ShoppingBagIcon, UserIcon } from './Icons';

const StatisticsSection = () => {
  const stats = [
    {
      icon: <CheckCircleIcon />,
      value: '$380M',
      label: 'Tổng doanh thu',
      change: '2.60%',
      isIncrease: true,
      bgColor: 'bg-green-200',
      textColor: 'text-green-600',
    },
    {
      icon: <ShoppingBagIcon />,
      value: '90.7K',
      label: 'Số lượng đặt hàng',
      change: '0.80%',
      isIncrease: true,
      bgColor: 'bg-purple-300',
      textColor: 'text-green-600',
    },
    {
      icon: <UserIcon />,
      value: '45.25K',
      label: 'Số lượng đăng ký',
      change: '2.34%',
      isIncrease: false,
      bgColor: 'bg-red-300',
      textColor: 'text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 w-full">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          change={stat.change}
          isIncrease={stat.isIncrease}
          bgColor={stat.bgColor}
          textColor={stat.textColor}
        />
      ))}
    </div>
  );
};

export default StatisticsSection;
