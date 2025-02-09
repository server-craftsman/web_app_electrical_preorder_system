import { useState, useEffect } from 'react';

export const ScrollTopUI = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <button
        onClick={handleScrollTop}
        className="fixed bottom-8 w-[53px] h-[53px] right-3 p-[1px] bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors flex flex-col items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"

          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 15.75l-7.5-7.5-7.5 7.5"
          />
        </svg>
        <span className="text-center px-[1px] text-xs mt-1">Lên đầu</span>
      </button>
    )
  );
};
