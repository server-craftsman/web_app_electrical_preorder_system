import { Outlet } from 'react-router-dom';
import { Header } from './header';
import { Footer } from './footer';
import subOutlet from '../../assets/piucture_tet.jpg';
import { motion } from 'framer-motion';

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 container mx-auto">
        <div className="flex justify-between items-start">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 4, 
              ease: 'easeInOut', 
              repeat: Infinity, 
              repeatType: 'reverse',
            }}
            className="w-48 h-screen sticky top-0"
          >
            <div className="w-48 h-screen">
              <img
                src={subOutlet}
                alt="Left Banner"
                className="w-full h-full object-cover rounded-xl shadow-md animate-zoomInOut"
              />
            </div>
          </motion.div>

          <div className="flex-1 min-w-0 max-w-[1200px] mx-auto">
            <div className="bg-white rounded-xl shadow-lg">
              <Outlet />
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 4, 
              ease: 'easeInOut', 
              repeat: Infinity, 
              repeatType: 'reverse',
            }}
            className="w-48 h-screen sticky top-0"
          >
            <div className="w-48 h-screen">
              <img
                src={subOutlet}
                alt="Left Banner"
                className="w-full h-full object-cover rounded-xl shadow-md animate-zoomInOut"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
