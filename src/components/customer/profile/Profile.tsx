import { useState, useMemo } from 'react';
import { useAuth } from '../../../contexts/AuthContexts';

const ProfileComponents = () => {
  const { getCurrentUser } = useAuth();
  const user = useMemo(() => getCurrentUser(), []);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    gender: '',
    email: user?.email || user?.sub || '',
    phone: '',
    birthDate: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Thông tin cập nhật:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 -mt-10 min-h-[500px]">
      <h2 className="text-lg font-semibold mb-3">Thông Tin Cá Nhân</h2>
      <div className="flex flex-col justify-between min-h-[500px]">
        <form
          onSubmit={handleSubmit}
          className="space-y-3 flex-grow grid grid-cols-1"
        >
          {/* Họ và tên */}
          <div>
            <label className="block font-semibold">Họ và tên</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-gray-300 mt-1"
            />
          </div>

          {/* Giới tính */}
          <div>
            <label className="block font-semibold">Giới tính</label>
            <div className="flex items-center space-x-4 mt-1">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Nam"
                  checked={formData.gender === 'Nam'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Nam
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Nữ"
                  checked={formData.gender === 'Nữ'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Nữ
              </label>
            </div>
          </div>

          {/* Địa chỉ */}
          <div>
            <label className="block font-semibold">Địa chỉ</label>
            <button
              type="button"
              className="w-full bg-red-500 p-2 rounded-lg font-semibold text-white mt-1"
            >
              Xem & điều chỉnh địa chỉ của bạn
            </button>
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full p-2 rounded-lg border border-gray-300 bg-gray-100 mt-1"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block font-semibold">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-gray-300 mt-1"
            />
          </div>

          {/* Ngày sinh */}
          <div>
            <label className="block font-semibold">Ngày sinh</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-gray-300 mt-1"
            />
          </div>

          {/* Nút cập nhật */}
          <div>
            <button
              type="submit"
              className="w-full bg-red-500 p-2 rounded-lg font-semibold text-white mt-3"
            >
              CẬP NHẬT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileComponents;
