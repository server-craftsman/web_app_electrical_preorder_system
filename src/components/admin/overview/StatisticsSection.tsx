import { useEffect, useState } from 'react';
import StatCard from '../../../components/admin/overview/StatCard';
import { CheckCircleIcon, ShoppingBagIcon, UserIcon, CalendarIcon } from './Icons';
import { ProductService } from '../../../services/product/product.service';
import { CategoryService } from '../../../services/category/category.service';
import { UserService } from '../../../services/user/user.service';
import { CampaignService } from '../../../services/campaign/campaign.service';

const StatisticsSection = () => {
  const [productCount, setProductCount] = useState<number>(0);
  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [campaignCount, setCampaignCount] = useState<number>(0);  // Add this state

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // Fetch product count
        const productResponse = await ProductService.countProduct();
        if (productResponse.data) {
          setProductCount(productResponse.data.data);
        }

        // Fetch all categories to get count
        const categoryResponse = await CategoryService.getAll({});
        console.log('Category Response:', categoryResponse?.data?.data);
        if (categoryResponse.data?.data) {
          // Count categories by counting array elements
          const categoriesArray = Array.isArray(categoryResponse.data.data) ? categoryResponse.data.data : [];
          const totalCategories = categoriesArray.length;
          console.log('Number of categories:', totalCategories);
          setCategoryCount(totalCategories);
        }

        // Fetch users count (using first page with size 1 to get total elements)
        const userResponse = await UserService.getAll({ page: 0, size: 1 });
        if (userResponse.data) {
          setUserCount(userResponse?.data?.data?.totalElements ?? 0);
        }

        // Fetch campaigns count
        const campaignResponse = await CampaignService.getAll({});
        if (campaignResponse.data?.data) {
          setCampaignCount(campaignResponse.data.data.totalElements || 0);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  const stats = [
    {
      icon: <ShoppingBagIcon />,
      value: productCount.toString(),
      label: 'Tổng số sản phẩm',
      change: '',
      isIncrease: true,
      bgColor: 'bg-purple-300',
      textColor: 'text-purple-600',
    },
    {
      icon: <CheckCircleIcon />,
      value: categoryCount.toString(),
      label: 'Số lượng danh mục',
      change: '',
      isIncrease: true,
      bgColor: 'bg-green-200',
      textColor: 'text-green-600',
    },
    {
      icon: <UserIcon />,
      value: userCount.toString(),
      label: 'Số lượng người dùng',
      change: '',
      isIncrease: true,
      bgColor: 'bg-blue-300',
      textColor: 'text-blue-600',
    },
    {
      icon: <CalendarIcon />,
      value: campaignCount.toString(),
      label: 'Số lượng chiến dịch',
      change: '',
      isIncrease: true,
      bgColor: 'bg-yellow-300',
      textColor: 'text-yellow-600',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 w-full">
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
