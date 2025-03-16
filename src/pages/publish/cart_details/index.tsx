// index.tsx
import { useEffect, useState } from 'react';
import { useCart } from '../../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import CartItem from '../../../components/generic/home/cart/CartItems';
import CartSummary from '../../../components/generic/home/cart/CartSummary';
import { Empty, Button } from 'antd';
import { ROUTER_URL } from '../../../const/router.path';
import { GetAllProductResponseModel } from '../../../models/api/response/product.res.model';
import { ProductService } from '../../../services/product/product.service';

const CartPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>(
    cartItems.map((item) => item.id)
  );
  const [campaignId, setCampaignId] = useState<string | null>(null);
  const [products, setProducts] = useState<GetAllProductResponseModel[]>([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await ProductService.getAll({});
        const productList = response.data.data.content || [];
        setProducts(Array.isArray(productList) ? productList : []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const productsInCart = products.filter((product) =>
      cartItems.some((cartItem) => cartItem.id === product.id)
    );

    const fetchCampaignIds = async () => {
      try {
        const campaignIds = await Promise.all(
          productsInCart.map(async (product) => {
            try {
              const response = await ProductService.getBySlug(product.slug);
              return response.data?.data?.campaign?.id;
            } catch (error) {
              console.error('Error fetching campaign by slug:', error);
              return null;
            }
          })
        );

        const validCampaignIds = campaignIds.filter((id) => id !== null);
        if (validCampaignIds.length > 0) {
          setCampaignId(validCampaignIds[0] || null);
        } else {
          setCampaignId(null);
        }
      } catch (error) {
        console.error('Error fetching campaign IDs:', error);
      }
    };

    if (productsInCart.length > 0) {
      fetchCampaignIds();
    }
  }, [products, cartItems]);

  return (
    <div className="p-6 max-w-8xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Giỏ hàng của bạn</h1>
      {cartItems.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-6 mx-auto w-full">
          <div className="md:w-3/4 w-[1000px]">
            <CartItem
              cartItems={cartItems}
              setSelectedItems={setSelectedItems}
            />
          </div>
          <div className="w-[320px]">
            <CartSummary
              selectedItems={selectedItems}
              campaignId={campaignId}
              products={products}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-40 mt-24">
          <Empty description="Giỏ hàng của bạn đang trống" />
          <Button
            type="primary"
            className="mt-4 text-lg px-6 py-2 !bg-red-500 !border-none"
            onClick={() => navigate(ROUTER_URL.COMMON.HOME)}
          >
            Mời bạn mua sản phẩm
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
