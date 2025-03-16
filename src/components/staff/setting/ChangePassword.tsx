import { useState, ChangeEvent, FormEvent } from 'react';
import { UserService } from '../../../services/user/user.service';
import { useAuth } from '../../../contexts/AuthContexts';
import { ChangePasswordRequestModel } from '../../../models/api/request/user.req.model';
import { helper } from '../../../utils';

const ChangePassword = () => {
  const { getCurrentUser } = useAuth();
  const currentUser = getCurrentUser();
  const userId: string = currentUser?.id || '';

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const params: ChangePasswordRequestModel = {
        id: userId,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };
      await UserService.changePassword(userId, params);
      helper.notificationMessage(
        'Bạn đã thay đổi mật khẩu thành công!',
        'success'
      );
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      setError('Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-medium">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-md font-medium transition bg-blue-600 text-white hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Changing...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
