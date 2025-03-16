import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContexts';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/modules/User';
import UpdateProfile from './UpdateProfile';

const DisplayProfile = () => {
  const { getCurrentUser } = useAuth();
  const currentUser = getCurrentUser();
  const userId = currentUser?.id;

  const [profile, setProfile] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchProfile = () => {
    if (userId) {
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
        );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  if (!profile) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 border-b pb-4">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-semibold">{profile.fullname}</h2>
          <p className="text-gray-500">{profile.role}</p>
          <p
            className={`text-sm font-medium ${profile.status === 'active' ? 'text-red-600' : 'text-green-600'}`}
          >
            {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
          </p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">
          Personal Information
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-gray-600 text-sm font-medium">
              Username
            </label>
            <p className="border p-2 rounded-md bg-gray-100">
              {profile.username}
            </p>
          </div>
          <div>
            <label className="text-gray-600 text-sm font-medium">
              Full Name
            </label>
            <p className="border p-2 rounded-md bg-gray-100">
              {profile.fullname}
            </p>
          </div>
          <div>
            <label className="text-gray-600 text-sm font-medium">
              Email address
            </label>
            <p className="border p-2 rounded-md bg-gray-100">
              {profile.email || 'N/A'}
            </p>
          </div>
          <div>
            <label className="text-gray-600 text-sm font-medium">
              Phone Number
            </label>
            <p className="border p-2 rounded-md bg-gray-100">
              {profile.phoneNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">Address</h3>
        <p className="border p-2 rounded-md bg-gray-100">
          {profile.address || 'Not Provided'}
        </p>
      </div>

      {/* System Information */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">
          System Information
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-gray-600 text-sm font-medium">
              Created At
            </label>
            <p className="border p-2 rounded-md bg-gray-100">
              {new Date(profile.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <label className="text-gray-600 text-sm font-medium">
              Updated At
            </label>
            <p className="border p-2 rounded-md bg-gray-100">
              {new Date(profile.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="flex justify-end mt-6">
        <button
          className="flex items-center px-4 py-4 bg-red-500 text-white rounded-md hover:bg-black"
          onClick={() => setModalVisible(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      </div>

      {/* Update Profile Modal */}
      <UpdateProfile
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onUpdated={fetchProfile}
      />
    </div>
  );
};

export default DisplayProfile;
