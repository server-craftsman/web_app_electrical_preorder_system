import React, { useState, useEffect } from 'react';
import logoAnimation from '../../assets/loadinganimation.json';
import Lottie from 'lottie-react';
import './Loading.css';

const Loading: React.FC<{ timeout?: number }> = ({ timeout = 20000 }) => {
  const [showTimeout, setShowTimeout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimeout(true);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  return (
    <div className="loading-overlay">
      <div className="text-center">
        <Lottie
          animationData={logoAnimation}
          loop={true}
          className="h-[600px] w-[600px] animate-pulse opacity-95 drop-shadow-2xl filter transition-all duration-500 hover:scale-110"
          style={{
            filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.5))',
            animation: 'float 4s ease-in-out infinite',
          }}
        />

        {showTimeout && (
          <p className="mt-4 text-xl text-black">Vui lòng đợi trong giây lát</p>
        )}
      </div>
    </div>
  );
};

export default Loading;
