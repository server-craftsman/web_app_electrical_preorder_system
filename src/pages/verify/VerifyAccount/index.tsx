import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';
import { AuthService } from '../../../services/auth/auth.service';

const VerifyAccount: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🚀 Trang VerifyAccount.tsx được tải!');

    const verifyUser = async () => {
      const token = searchParams.get('token'); // Đọc token từ query string

      if (!token) {
        console.error('🔴 Không tìm thấy token trong URL!');
        setError('Token không hợp lệ!');
        setLoading(false);
        return;
      }

      console.log('🔹 Token từ URL:', token);

      try {
        const response = await AuthService.verifyToken({ token });

        if (response.status === 200) {
          message.success(
            '🎉 Xác minh thành công! Chuyển hướng đến đăng nhập...'
          );
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError('❌ Xác minh thất bại! Vui lòng thử lại.');
        }
      } catch (error) {
        console.error('⚠️ Lỗi khi gọi API xác minh:', error);
        setError('Lỗi xác minh! Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [searchParams, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>Xác minh tài khoản hoàn tất!</p>
      )}
    </div>
  );
};

export default VerifyAccount;
