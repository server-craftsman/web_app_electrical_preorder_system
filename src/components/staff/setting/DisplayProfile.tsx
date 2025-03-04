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
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <div className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Email
          </label>
          <p className="w-full border border-gray-300 rounded-md p-2 mt-1 bg-gray-100">
            {profile.email}
          </p>
        </div>

        {/* Profile Name */}
        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Profile Name
          </label>
          <p className="w-full border border-gray-300 rounded-md p-2 mt-1 bg-gray-100">
            {profile.fullname}
          </p>
        </div>

        {/* Username (Read-Only) */}
        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Username
          </label>
          <p className="w-full border border-gray-300 rounded-md p-2 mt-1 bg-gray-100">
            {profile.username}
          </p>
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Address
          </label>
          <p className="w-full border border-gray-300 rounded-md p-2 mt-1 bg-gray-100">
            {profile.address}
          </p>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Phone Number
          </label>
          <p className="w-full border border-gray-300 rounded-md p-2 mt-1 bg-gray-100">
            {profile.phoneNumber}
          </p>
        </div>

        {/* Role (Read-Only) */}
        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Role
          </label>
          <p className="w-full border border-gray-300 rounded-md p-2 mt-1 bg-gray-100">
            {profile.role}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-black"
          onClick={() => setModalVisible(true)}
        >
          Edit Profile
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
