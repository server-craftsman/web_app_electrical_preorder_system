import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import RunRoutes from './routes/run/run.route';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ScrollTopUI } from './app/ui/scroll.top.ui';
import Loading from './app/redux/loading/loading';
import { CartProvider } from './contexts/CartContext'; // Import CartProvider

export const App = () => {
  interface RootState {
    loading: boolean;
  }

  const isLoading = useSelector((state: RootState) => state.loading);

  return (
    <CartProvider> {/* Bọc toàn bộ ứng dụng */}
      {isLoading && <Loading />}
      <Suspense>
        <RunRoutes />
      </Suspense>
      <ToastContainer />
      <ScrollTopUI />
    </CartProvider>
  );
};
