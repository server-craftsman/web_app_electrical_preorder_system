import { useState, useMemo, useRef } from 'react';
import { useAuth } from '../../../contexts/AuthContexts';
import { UserService } from '../../../services/user/user.service';
import { message } from 'antd';

const ProfileComponents = () => {
  const { getCurrentUser } = useAuth();
  const user = useMemo(() => getCurrentUser(), []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update the initial form data to only include required fields
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    address: '',
    phone: '',
    avatar: user?.avatar || '',
  });

  // Update the handleSubmit function
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!user?.id) {
        message.error('User ID not found');
        return;
      }

      const updateData = {
        fullname: formData.fullName,
        phoneNumber: formData.phone,
        address: formData.address,
      };

      const response = await UserService.updateWithAvatar(
        user.id,
        updateData,
        avatarFile || undefined
      );

      if (response.data) {
        message.success('Profile updated successfully');
        // Refresh user data if needed
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Failed to update profile');
    }
  };

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string>(user?.avatar || '');

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewAvatar(previewUrl);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 -mt-10 min-h-[500px]">
      <h2 className="text-lg font-semibold mb-3">Thông Tin Cá Nhân</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Avatar Section */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full overflow-hidden cursor-pointer border-2 border-gray-200"
              onClick={handleAvatarClick}
            >
              <img
                src={previewAvatar || '/default-avatar.png'}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <div className="absolute bottom-0 right-0 bg-gray-100 rounded-full p-2 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
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

          {/* Địa chỉ */}
          <div>
            <label className="block font-semibold">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-gray-300 mt-1"
            />
          </div>

          {/* Email - readonly */}
          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={user?.email || user?.sub || ''}
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

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-red-500 p-2 rounded-lg font-semibold text-white mt-3"
            >
              CẬP NHẬT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileComponents;
