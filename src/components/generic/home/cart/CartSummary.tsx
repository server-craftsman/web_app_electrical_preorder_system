import React from "react";
import { useCart } from "../../../../contexts/CartContext";
import { Button } from "antd";
import { useNavigate } from "react-router-dom"; 

interface CartSummaryProps {
    selectedItems: string[]; 
}

const CartSummary: React.FC<CartSummaryProps> = ({ selectedItems }) => {
    const { cartItems } = useCart();
    const navigate = useNavigate(); 

    const totalPrice = cartItems
        .filter(item => selectedItems.includes(item.id)) 
        .reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-sm">
            <h2 className="text-xl font-bold border-b pb-2">Tạm tính</h2>
            <p className="text-right text-lg font-semibold">{totalPrice.toLocaleString()}đ</p>

            <div className="flex justify-between text-gray-600 mt-2">
                <span>Thuế</span>
                <span>0đ</span>
            </div>

            <div className="flex justify-between font-bold text-lg mt-3">
                <span>Tổng cộng</span>
                <span>{totalPrice.toLocaleString()}đ</span>
            </div>

            <p className="text-sm text-gray-500 mt-1">(Chưa bao gồm phí vận chuyển)</p>

            <Button
                type="primary"
                className="w-full mt-4 bg-black text-white py-2"
                onClick={() => navigate("/checkout")} 
                disabled={selectedItems.length === 0} 
            >
                Tiến hành thanh toán
            </Button>

            <Button
                type="text"
                className="w-full mt-2 text-gray-700 underline"
                onClick={() => navigate("/product")} 
            >
                Tiếp tục mua sắm
            </Button>
        </div>
    );
};

export default CartSummary;
