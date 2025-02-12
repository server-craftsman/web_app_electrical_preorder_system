import logo1 from '../../assets/Elecee_logo.jpg';

export const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      {/* Bottom Section */}
      <div className="bg-white py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src={logo1}
                alt="Eureka Logo"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-2xl font-bold text-black">Elecee</span>
            </div>
            <p className="text-gray-600">
              Elecee - Sản phẩm đột phá sáng tạo trên bàn làm việc của bạn
            </p>
            <div className="mt-4 space-y-2">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 transition flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-2"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.125v-3.622h3.125v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.73 0 1.324-.593 1.324-1.324v-21.35c0-.732-.594-1.325-1.325-1.325z"/>
                </svg>
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 transition flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-2"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.719 0-4.92 2.201-4.92 4.917 0 .386.044.762.128 1.124-4.087-.205-7.713-2.164-10.141-5.144-.423.725-.666 1.562-.666 2.457 0 1.694.863 3.188 2.175 4.065-.802-.025-1.558-.246-2.218-.616v.062c0 2.366 1.684 4.342 3.918 4.788-.41.111-.843.171-1.287.171-.315 0-.621-.031-.921-.088.622 1.943 2.428 3.355 4.568 3.395-1.674 1.312-3.785 2.096-6.075 2.096-.394 0-.783-.023-1.168-.068 2.168 1.39 4.742 2.204 7.514 2.204 9.025 0 13.965-7.479 13.965-13.965 0-.213-.005-.426-.014-.637.961-.694 1.797-1.562 2.457-2.549z"/>
                </svg>
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 transition flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-2"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.334 3.608 1.309.975.975 1.247 2.242 1.309 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.334 2.633-1.309 3.608-.975.975-2.242 1.247-3.608 1.309-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.334-3.608-1.309-.975-.975-1.247-2.242-1.309-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.334-2.633 1.309-3.608.975-.975 2.242-1.247 3.608-1.309 1.265-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.012-4.947.071-1.281.059-2.563.334-3.637 1.408-1.074 1.074-1.349 2.356-1.408 3.637-.059 1.28-.071 1.688-.071 4.947s.012 3.667.071 4.947c.059 1.281.334 2.563 1.408 3.637 1.074 1.074 2.356 1.349 3.637 1.408 1.28.059 1.688.071 4.947.071s3.667-.012 4.947-.071c1.281-.059 2.563-.334 3.637-1.408 1.074-1.074 1.349-2.356 1.408-3.637.059-1.28.071-1.688.071-4.947s-.012-3.667-.071-4.947c-.059-1.281-.334-2.563-1.408-3.637-1.074-1.074-2.356-1.349-3.637-1.408-1.28-.059-1.688-.071-4.947-.071zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.324c-2.296 0-4.162-1.866-4.162-4.162s1.866-4.162 4.162-4.162 4.162 1.866 4.162 4.162-1.866 4.162-4.162 4.162zm6.406-11.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z"/>
                </svg>
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 transition flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-2"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.75 19h-2.5v-8.5h2.5v8.5zm-1.25-9.75c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm13.25 9.75h-2.5v-4.25c0-1.035-.965-1.75-2-1.75s-2 .715-2 1.75v4.25h-2.5v-8.5h2.5v1.25c.5-.75 1.5-1.25 2.5-1.25 2.071 0 3.5 1.429 3.5 3.5v5.5z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
          {/* Column 2: Promotions */}
          <div>
            <h4 className="text-lg font-bold text-black mb-4">
              Thông tin khuyến mãi
            </h4>
            <ul className="space-y-2">
              <li className="text-gray-600">Lofree Flow Lite</li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div>
            <h4 className="text-lg font-bold text-black mb-4">
              Hỗ trợ khách hàng
            </h4>
            <ul className="space-y-2">
              <li className="text-gray-600">Theo dõi đơn hàng</li>
              <li className="text-gray-600">Review sản phẩm</li>
              <li className="text-gray-600">Hướng dẫn sử dụng</li>
              <li className="text-gray-600">Tin công nghệ</li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-lg font-bold text-black mb-4">Liên hệ</h4>
            <p className="text-gray-600">
              Gọi ngay: <span className="font-bold">0869872830</span>
            </p>
            <p className="text-gray-600">Email: elecee@gmail.com</p>
            <p className="text-gray-600">
              Địa chỉ: 174/13A, đường 63, tổ 8, ấp Láng cát, Xã Tân Phú Trung.
              huyện Củ Chi, TP. HCM
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
