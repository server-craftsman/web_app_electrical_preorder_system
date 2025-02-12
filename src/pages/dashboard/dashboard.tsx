import { useState } from "react";
import { Table, Tag } from "antd";
import Search from '../../components/generic/home/search/search'; 

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m1-4.5a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 6.75h13.5M5.25 6.75a2.25 2.25 0 0 1 2.25-2.25h9a2.25 2.25 0 0 1 2.25 2.25m-13.5 0v12.75a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25V6.75m-13.5 0h13.5" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1); 
  const [, setSearchTerm] = useState('');
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    console.log("Tìm kiếm với từ khóa: ", term);
  };
  const stats = [
    {
      icon: <CheckCircleIcon />,
      value: "$380M",
      label: "Tổng doanh thu",
      change: "2.60%",
      isIncrease: true,
      bgColor: "bg-green-200",
      textColor: "text-green-600",
    },
    {
      icon: <ShoppingBagIcon />,
      value: "90.7K",
      label: "Số lượng đặt hàng",
      change: "0.80%",
      isIncrease: true,
      bgColor: "bg-purple-300",
      textColor: "text-green-600",
    },
    {
      icon: <UserIcon />,
      value: "45.25K",
      label: "Số lượng đăng ký",
      change: "2.34%",
      isIncrease: false,
      bgColor: "bg-red-300",
      textColor: "text-red-600",
    },
  ];

  const columns = [
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      render: (status: "Success" | "Pending") => (
        <Tag color={status === "Success" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Delivery",
      dataIndex: "delivery",
      key: "delivery",
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
    },
    {
      title: "Fulfillment",
      dataIndex: "fulfillment",
      key: "fulfillment",
      render: (status: "Fulfilled" | "Unfulfilled") => (
        <Tag color={status === "Fulfilled" ? "green" : "red"}>{status}</Tag>
      ),
    },
  ];

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const data = [
    { order: "#1", date: "11 Feb, 2024", customer: "Wade Warren", payment: "Pending", total: "$20.00", delivery: "N/A", items: "2 items", fulfillment: "Unfulfilled" },
    { order: "#2", date: "13 Feb, 2024", customer: "Esther Howard", payment: "Success", total: "$22.00", delivery: "N/A", items: "3 items", fulfillment: "Fulfilled" },
    { order: "#3", date: "15 Feb, 2024", customer: "Jenny Wilson", payment: "Pending", total: "$25.00", delivery: "N/A", items: "1 items", fulfillment: "Unfulfilled" },
    { order: "#4", date: "11 Feb, 2024", customer: "Wade Warren", payment: "Pending", total: "$20.00", delivery: "N/A", items: "2 items", fulfillment: "Unfulfilled" },
    { order: "#5", date: "13 Feb, 2024", customer: "Esther Howard", payment: "Success", total: "$22.00", delivery: "N/A", items: "3 items", fulfillment: "Fulfilled" },
    { order: "#6", date: "15 Feb, 2024", customer: "Jenny Wilson", payment: "Pending", total: "$25.00", delivery: "N/A", items: "1 items", fulfillment: "Unfulfilled" },
    { order: "#7", date: "11 Feb, 2024", customer: "Wade Warren", payment: "Pending", total: "$20.00", delivery: "N/A", items: "2 items", fulfillment: "Unfulfilled" },
    { order: "#8", date: "13 Feb, 2024", customer: "Esther Howard", payment: "Success", total: "$22.00", delivery: "N/A", items: "3 items", fulfillment: "Fulfilled" },
    { order: "#9", date: "15 Feb, 2024", customer: "Jenny Wilson", payment: "Pending", total: "$25.00", delivery: "N/A", items: "1 items", fulfillment: "Unfulfilled" },
    { order: "#10", date: "11 Feb, 2024", customer: "Wade Warren", payment: "Pending", total: "$20.00", delivery: "N/A", items: "2 items", fulfillment: "Unfulfilled" },
    { order: "#11", date: "13 Feb, 2024", customer: "Esther Howard", payment: "Success", total: "$22.00", delivery: "N/A", items: "3 items", fulfillment: "Fulfilled" },
    { order: "#12", date: "15 Feb, 2024", customer: "Jenny Wilson", payment: "Pending", total: "$25.00", delivery: "N/A", items: "1 items", fulfillment: "Unfulfilled" },
];

  return (
    <div className="container mx-auto px-8 py-6">
      <div className="grid grid-cols-3 gap-6 w-full">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-4 bg-white shadow-md rounded-lg p-5">
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
              {stat.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
              <p className="text-gray-500">{stat.label}</p>
              <span className={`text-sm font-medium ${stat.textColor}`}>
                {stat.isIncrease ? "▲" : "▼"} {stat.change} tuần này
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className=" mt-14">
      <Search onSearch={handleSearch} placeholder="Tìm kiếm " />
      </div>
    
      <div className="p-6 bg-white shadow-md rounded-lg mt-4">
       
        <Table 
          columns={columns} 
          dataSource={data} 
          rowKey="order"
          pagination={{
            current: currentPage,  
            pageSize: 10, 
            total: data.length,  
            onChange: handleChangePage,  
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
