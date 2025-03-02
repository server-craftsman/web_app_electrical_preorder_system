import { Empty, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const PreOrder = () => {
  const navigate = useNavigate();

  const handleOrderNow = () => {
    navigate('/products');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 -mt-10 min-h-[590px] flex flex-col items-center justify-center">
      <Empty
        description={
          <span className="text-xl text-gray-600">
            Bạn chưa có đơn đặt hàng nào
          </span>
        }
      />
      <Button
        type="primary"
        className="mt-4 bg-red-500 hover:bg-red-600 border-none"
        style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
        onClick={handleOrderNow}
      >
        Đặt hàng ngay bây giờ
      </Button>
    </div>
  );
};

export default PreOrder;
