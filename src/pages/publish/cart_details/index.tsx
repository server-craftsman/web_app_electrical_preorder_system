import { useCart } from "../../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import CartItem from "../../../components/generic/home/cart/CartItems";
import CartSummary from "../../../components/generic/home/cart/CartSummary";
import { Empty, Button } from "antd";
import { ROUTER_URL } from '../../../const/router.path';
import { useState } from "react";

const CartPage = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState<string[]>(cartItems.map(item => item.id)); 
    
    return (
        <div className="p-6 max-w-8xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Giỏ hàng của bạn</h1>
            {cartItems.length > 0 ? (
                <div className="flex flex-col md:flex-row gap-6 mx-auto w-full">
                    <div className="md:w-3/4 w-[1000px]">
                      
                        <CartItem cartItems={cartItems} setSelectedItems={setSelectedItems} />
                    </div>
                    <div className="w-[320px]">
                        <CartSummary selectedItems={selectedItems} />
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
