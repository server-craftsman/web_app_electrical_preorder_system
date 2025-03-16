import React from 'react';

const SupportSection: React.FC = () => {
  return (
    <section className="mt-12 p-6 bg-blue-50 rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-semibold text-blue-600">Cần hỗ trợ?</h2>
      <p className="text-lg text-gray-700 mt-2">
        Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua{' '}
        <span className="text-blue-600">email</span> hoặc{' '}
        <span className="text-blue-600">số điện thoại</span>.
      </p>
    </section>
  );
};

export default SupportSection;
