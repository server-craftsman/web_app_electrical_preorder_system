import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import RunRoutes from './routes/run/run.route';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ScrollTopUI } from './app/ui/scroll.top.ui';
import Loading from './app/redux/loading/loading';

export const App = () => {
  interface RootState {
    loading: boolean;
  }

  const isLoading = useSelector((state: RootState) => state.loading);

  return (
    <>
      {isLoading && <Loading />}
      <Suspense>
        <RunRoutes />
      </Suspense>

      <ToastContainer />
      <ScrollTopUI />
    </>
  );
};
