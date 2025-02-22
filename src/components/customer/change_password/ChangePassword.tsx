import { useState } from "react";

const ChangePasswordComponents = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Thay đổi mật khẩu với thông tin:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 -mt-10 min-h-[500px]">
      <h2 className="text-lg font-semibold mb-3">Thay Đổi Mật Khẩu</h2>
      <div className="flex flex-col justify-center min-h-[500px] ">
        <form onSubmit={handleSubmit} className="space-y-3 flex-row grid grid-cols-1 gap-6 ">
          {/* Mật khẩu hiện tại */}
          <div>
            <label className="block font-semibold">Mật khẩu hiện tại</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Nhập mật khẩu hiện tại"
              className="w-full p-2 rounded-lg border border-gray-300 mt-1"
            />
          </div>

          {/* Mật khẩu mới */}
          <div>
            <label className="block font-semibold">Mật khẩu mới</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
               placeholder="Nhập mật khẩu mới"
              className="w-full p-2 rounded-lg border border-gray-300 mt-1"
            />
          </div>

          {/* Xác nhận mật khẩu mới */}
          <div>
            <label className="block font-semibold">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
                 placeholder="Nhập lại mật khẩu mới"
              className="w-full p-2 rounded-lg border border-gray-300 mt-1"
            />
          </div>

          {/* Nút cập nhật */}
          <div>
            <button
              type="submit"
              className="w-full bg-red-500 p-2 rounded-lg font-semibold !text-white mt-3"
            >
              CẬP NHẬT MẬT KHẨU
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordComponents;
