import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/modules/User';

const DetailAccount = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<User | null>(null);
  const navigate = useNavigate();

  console.log("Current ID from useParams:", id);

  const fetchDetail = () => {
    if (id) {
      UserService.getById(id)
        .then((response) => {
          if (response && response.data) {
            const userData = response.data?.data || response.data;
            setProfile(userData);
          } else {
            console.error("Failed to fetch user profile:", response);
          }
        })
        .catch((error: Error) =>
          console.error("Error fetching user profile:", error)
        );
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (!profile)
    return <p className="text-center text-gray-500">Không tìm thấy tài khoản.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Nút quay lại */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
      >
        ← Quay lại
      </button>

      {/* Tiêu đề */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Chi tiết tài khoản</h2>

      {/* Thông tin tài khoản */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">Tên đăng nhập:</p>
          <p className="font-semibold">{profile.username}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">Họ và tên:</p>
          <p className="font-semibold">{profile.fullname}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">Email:</p>
          <p className="font-semibold">{profile.email || 'Không có'}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">Số điện thoại:</p>
          <p className="font-semibold">{profile.phoneNumber || 'Không có'}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">Địa chỉ:</p>
          <p className="font-semibold">{profile.address || 'Không có'}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">Trạng thái:</p>
          <p className={`font-semibold ${profile.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}`}>
            {profile.status === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">Vai trò:</p>
          <p className="font-semibold text-blue-600">{profile.role}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">Xác minh:</p>
          <p className={`font-semibold ${profile.verified ? 'text-green-600' : 'text-red-600'}`}>
            {profile.verified ? 'Đã xác minh' : 'Chưa xác minh'}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">Ngày tạo:</p>
          <p className="font-semibold">{new Date(profile.createdAt).toLocaleString()}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">Cập nhật lần cuối:</p>
          <p className="font-semibold">{new Date(profile.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailAccount;
