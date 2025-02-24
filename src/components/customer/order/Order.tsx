import { Empty } from "antd";

const OrderComponents = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 -mt-10 min-h-[590px] flex flex-col items-center justify-center">
      <Empty 
        description={
          <span className="text-xl text-gray-600">
            Bạn chưa có đơn đặt hàng nào
          </span>
        } 
      />
    </div>
  );
};

export default OrderComponents
