import { Outlet } from 'react-router-dom';
import { Header } from './header';
import { Footer } from './footer';
import { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContexts';
import { UserService } from '../../services/user/user.service';

export const MainLayout = () => {
  const { getCurrentUser } = useAuth();
  const currentUser = getCurrentUser();
  const profileFetchedRef = useRef(false);

  // Fetch user profile only once when component mounts
  useEffect(() => {
    // We'll only fetch the profile once and then store it in a global state or context
    // This is just to prevent continuous API calls
    const fetchUserProfile = async () => {
      if (!currentUser?.id || profileFetchedRef.current) return;

      try {
        // Set the ref before the API call to prevent multiple calls
        profileFetchedRef.current = true;

        const response = await UserService.getById(currentUser.id);
        if (response && response.data) {
          const userData = response.data?.data || response.data;

          // Instead of using a custom event, we could use a global state management solution
          // For now, we'll just store the data in localStorage as a simple solution
          localStorage.setItem('userProfile', JSON.stringify(userData));
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();

    // Clean up function
    return () => {
      // Reset the ref when the component unmounts
      profileFetchedRef.current = false;
    };
  }, [currentUser?.id]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 container mx-auto">
        <div className="flex justify-between items-start">
          {/* <motion.div
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
          </motion.div> */}

          <div className="flex-1 min-w-0 max-w-[1200px] mx-auto">
            <Outlet />
          </div>

          {/* <motion.div
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
          </motion.div> */}
        </div>
      </div>

      <Footer />
    </div>
  );
};
