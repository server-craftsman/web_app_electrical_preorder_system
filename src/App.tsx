import { Suspense } from 'react';
import Lottie from 'lottie-react';
import { useSelector } from 'react-redux';
import RunRoutes from './routes/run/run.route';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ScrollTopUI } from './app/ui/scroll.top.ui';
import loadingAnimation from './assets/loadinganimation.json';

export const App = () => {
  interface RootState {
    loading: boolean;
  }

  const isLoading = useSelector((state: RootState) => state.loading);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-screen z-99999 opacity-80">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      )}
      <Suspense>
        <RunRoutes />
      </Suspense>

      <ToastContainer />
      <ScrollTopUI />
    </>
  );
};
