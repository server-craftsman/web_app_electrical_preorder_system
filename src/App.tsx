import { Suspense } from 'react';
// import ScrollToTopButton from "./components/generic/home/ScrollToTopButton";
import Loading from './app/redux/loading';
import { useSelector } from 'react-redux';
import RunRoutes from './routes/run/run.route';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const isLoading = useSelector((state: any) => state.loading);

  return (
    <>
      {isLoading && <Loading />}
      <Suspense>
        <RunRoutes />
      </Suspense>

      {/* <ScrollToTopButton /> */}
      <ToastContainer />
    </>
  );
};
