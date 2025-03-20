import { useState, useEffect } from 'react';
import { Card, Radio, Spin } from 'antd';
import { Area, Column } from '@ant-design/plots';
import { PaymentService } from '../../../services/payment/payment.service';
import { formatCurrency } from '../../../utils/helper';

const Revenue = () => {
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState<'area' | 'column'>('area');
  const [revenueData, setRevenueData] = useState<any[]>([]);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      const response = await PaymentService.getPayment(0, 100, { status: 'PAID' });
      
      if (response.data?.data?.payments) {
        const payments = response.data.data.payments;
        
        // Sort payments by date
        payments.sort((a, b) => {
          const dateA = new Date(a.date || a.createdAt);
          const dateB = new Date(b.date || b.createdAt);
          return dateA.getTime() - dateB.getTime();
        });

        // Group payments by date and calculate total amount
        const groupedData = payments.reduce((acc: any, payment: any) => {
          const date = new Date(payment.date || payment.createdAt).toLocaleDateString('vi-VN');
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += Number(payment.amount);
          return acc;
        }, {});

        // Convert to array format for charts and ensure data is sorted
        const chartData = Object.entries(groupedData)
          .map(([date, amount]) => ({
            date,
            amount: Number(amount)
          }))
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        console.log('Chart Data:', chartData); // Debug data
        setRevenueData(chartData);
      }
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    } finally {
      setLoading(false);
    }
};

const areaConfig = {
    data: revenueData,
    xField: 'date',
    yField: 'amount',
    smooth: true,
    areaStyle: {
      fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
    },
    // tooltip: {
    //   customContent: (title: string, items: any[]) => {
    //     const item = items[0];
    //     if (!item) return '';
    //     return `
    //       <div style="padding: 8px;">
    //         <div style="color: #666;">Ngày: ${title}</div>
    //         <div style="margin-top: 4px;">
    //           <span style="color: #1890ff;">Doanh thu: ${formatCurrency(item.value)}</span>
    //         </div>
    //       </div>
    //     `;
    //   }
    // },
    xAxis: {
      type: 'time',
      tickCount: 5,
    },
    yAxis: {
      label: {
        formatter: (value: number) => formatCurrency(value),
      },
    },
};

const columnConfig = {
    data: revenueData,
    xField: 'date',
    yField: 'amount',
    // tooltip: {
    //   customContent: (title: string, items: any[]) => {
    //     const item = items[0];
    //     if (!item) return '';
    //     return `
    //       <div style="padding: 8px;">
    //         <div style="color: #666;">Ngày: ${title}</div>
    //         <div style="margin-top: 4px;">
    //           <span style="color: #1890ff;">Doanh thu: ${formatCurrency(item.value)}</span>
    //         </div>
    //       </div>
    //     `;
    //   }
    // },
    color: '#1890ff',
};

  useEffect(() => {
    fetchRevenueData();
  }, []);

  return (
    <Card>
      <div className="mb-4">
        <Radio.Group value={chartType} onChange={e => setChartType(e.target.value)}>
          <Radio.Button value="area">Biểu đồ vùng</Radio.Button>
          <Radio.Button value="column">Biểu đồ cột</Radio.Button>
        </Radio.Group>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-[400px]">
          <Spin size="large" />
        </div>
      ) : (
        <div className="h-[400px]">
          {chartType === 'area' ? (
            <Area {...areaConfig} />
          ) : (
            <Column {...columnConfig} />
          )}
        </div>
      )}
    </Card>
  );
};

export default Revenue;
