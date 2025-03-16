import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../contexts/AuthContexts';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/modules/User';
import UpdateProfile from './UpdateProfile';
import { CameraOutlined, EditOutlined } from '@ant-design/icons';
import { Spin, Tooltip, message } from 'antd';

const DisplayProfile = () => {
  const { getCurrentUser } = useAuth();
  const currentUser = getCurrentUser();
  const userId = currentUser?.id;

  const [profile, setProfile] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProfile = () => {
    if (userId) {
      setLoading(true);
      UserService.getById(userId)
        .then((response) => {
          if (response && response.data) {
            const userData = response.data?.data || response.data;
            setProfile(userData);
          } else {
            console.error('Failed to fetch user profile:', response);
          }
        })
        .catch((error: Error) =>
          console.error('Error fetching user profile:', error)
        )
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      message.error('Please upload an image file (JPEG, PNG, GIF)');
      return;
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      message.error('Image size should not exceed 2MB');
      return;
    }

    try {
      setUploadingAvatar(true);

      if (profile && userId) {
        // Create user data object
        const userData = {
          fullname: profile.fullname || '',
          address: profile.address || '',
          phoneNumber: profile.phoneNumber || '',
        };

        // Use the updateWithAvatar method with correct parameters
        await UserService.updateWithAvatar(userId, userData, file);

        fetchProfile(); // Refresh profile data
        message.success('Avatar updated successfully');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      message.error('Failed to upload avatar');
    } finally {
      setUploadingAvatar(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (loading && !profile) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="Loading profile..." />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center p-8 bg-white rounded-xl shadow-sm">
        <p className="text-gray-500">Profile information not available</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-2xl h-48 relative">
        <div className="absolute -bottom-16 left-10">
          <div className="relative group">
            <div
              className={`w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden ${uploadingAvatar ? 'opacity-70' : ''}`}
            >
              {uploadingAvatar && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-10">
                  <Spin size="large" />
                </div>
              )}
              <img
                src={
                  profile.avatar ||
                  'https://via.placeholder.com/128?text=Profile'
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <Tooltip title="Change avatar">
              <button
                onClick={handleAvatarClick}
                className="absolute bottom-1 right-1 w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-indigo-700 transition-all duration-200 z-20"
              >
                <CameraOutlined />
              </button>
            </Tooltip>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-b-2xl p-8 pt-20">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-gray-100 pb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {profile.fullname}
            </h2>
            <p className="text-indigo-600 font-medium">{profile.role}</p>
            <p
              className={`mt-1 px-3 py-1 inline-block rounded-full text-xs font-medium ${
                profile.status === 'ACTIVE'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-red-50 text-red-600'
              }`}
            >
              {profile.status}
            </p>
          </div>
          <Tooltip title="Edit Profile">
            <button
              className="flex items-center justify-center w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-all duration-200"
              onClick={() => setModalVisible(true)}
            >
              <EditOutlined />
            </button>
          </Tooltip>
        </div>

        {/* Personal Information */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-500 text-sm font-medium block mb-2">
                Username
              </label>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-gray-800">
                {profile.username}
              </div>
            </div>
            <div>
              <label className="text-gray-500 text-sm font-medium block mb-2">
                Full Name
              </label>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-gray-800">
                {profile.fullname}
              </div>
            </div>
            <div>
              <label className="text-gray-500 text-sm font-medium block mb-2">
                Phone Number
              </label>
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-gray-800">
                {profile.phoneNumber || 'Not provided'}
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Address</h3>
          <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-gray-800">
            {profile.address || 'Not provided'}
          </div>
        </div>
      </div>

      <UpdateProfile
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onUpdated={fetchProfile}
        profile={profile}
      />
    </div>
  );
};

export default DisplayProfile;
