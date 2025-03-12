import { useState } from 'react';
import DisplayProfile from '../../../components/staff/setting/DisplayProfile';
import ChangePassword from '../../../components/staff/setting/ChangePassword';

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('profile')}
        >
          View Profile
        </button>
        <button
          className={`px-4 py-2 font-medium ml-4 ${activeTab === 'password' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('password')}
        >
          Change Password
        </button>
      </div>

      {activeTab === 'profile' ? <DisplayProfile /> : <ChangePassword />}
    </div>
  );
};

export default Profile;