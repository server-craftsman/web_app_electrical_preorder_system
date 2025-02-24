import { useAuth } from "../../../contexts/AuthContexts";
import { useNavigate } from "react-router-dom";
import { ROUTER_URL } from "../../../const";
import { motion } from "framer-motion";

const OverviewComponents = () => {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  const userName = user?.fullName || "bạn";
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 -mt-10 min-h-[590px] flex flex-col items-center justify-center">
      <motion.div
        className="robot-container"
        animate={{
          x: [-10, 10, -10],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        {/* SVG Robot với cánh tay vẫy */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="robot-svg"
          width="100"
          height="100"
        >
          {/* Thân robot (màu đỏ) */}
          <rect x="35" y="40" width="30" height="40" fill="red" />

          <motion.circle
            cx="50"
            cy="30"
            r="15"
            fill="url(#gradient-head)"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />

          {/* Mắt robot với hiệu ứng nhấp nháy */}
          <motion.circle
            cx="43"
            cy="28"
            r="1"
            fill="white"
            animate={{
              r: [3, 5, 3],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="57"
            cy="28"
            r="3"
            fill="white"
            animate={{
              r: [3, 5, 3],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />

          {/* Mũi robot */}
          <polygon points="50,35 45,40 55,40" fill="white" transform="translate(0, -5)" />

          {/* Miệng robot */}
          <path
            d="M 43 42 Q 50 47 57 42"
            stroke="#fff"
            strokeWidth="1"
            fill="transparent"
            transform="translate(0, -3)"
          />

          {/* Cánh tay trái vẫy (màu hồng) */}
          <motion.rect
            x="20"
            y="45"
            width="10"
            height="30"
            fill="green"
            animate={{
              rotate: [0, 20, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          {/* Cánh tay phải vẫy (màu hồng) */}
          <motion.rect
            x="70"
            y="45"
            width="10"
            height="30"
            fill="purple"
            animate={{
              rotate: [0, -20, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          {/* Chân robot (màu xanh lá) */}
          <rect x="35" y="80" width="10" height="15" fill="blue" />
          <rect x="55" y="80" width="10" height="15" fill="blue" />

          {/* Thêm đổ bóng cho robot */}
          <defs>
            <filter id="f1" x="0" y="0" width="200%" height="200%">
              <feOffset result="offOut" dx="5" dy="5" in="SourceAlpha" />
              <feGaussianBlur result="blurOut" stdDeviation="3" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
            <linearGradient id="gradient-body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#ff7a34", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#ff6347", stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="gradient-head" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#ffdd00", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#ffb74d", stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="arm-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#f7a8b8", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#f06292", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      <h2 className="text-2xl font-bold text-center mt-4">
        Xin chào, {userName}!
      </h2>
      <p className="text-xl text-center text-gray-600 mt-4">
        Chào mừng bạn đến với hệ thống cửa hàng của chúng tôi! Tại đây, bạn có thể{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => navigate(ROUTER_URL.CUSTOMER.ORDERS)}
        >
          theo dõi đơn hàng gần nhất
        </span>,{" "}
        cập nhật{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => navigate(ROUTER_URL.CUSTOMER.PROFILE)}
        >
          thông tin tài khoản
        </span>{" "}
        và{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => navigate(ROUTER_URL.CUSTOMER.CHANGE_PASSWORD)}
        >
          cài đặt bảo mật
        </span>{" "}
        một cách dễ dàng.
      </p>
    </div>
  );
};

export default OverviewComponents;
