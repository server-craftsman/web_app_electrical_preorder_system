import React from "react";
import { useCart } from "../../../../contexts/CartContext";
import { Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const CheckoutSummary: React.FC = () => {
    const { cartItems, updateQuantity } = useCart();
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="checkout-summary w-1/2 p-4 bg-gray-50 shadow-md rounded-lg">
            <h2 className="text-xl font-bold pb-2">Đơn hàng của bạn</h2>
            <ul className="divide-y">
                {cartItems.map(item => (
                    <li key={item.id} className="py-4 flex items-center gap-4">
                        <div className="relative">
                            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1/2 -translate-y-1/2">
                                {item.quantity}
                            </span>
                        </div>
                        <div className="flex-1 flex flex-col">
                            <span className="font-medium">{item.name}</span>
                            <div className="flex items-center gap-2 mt-2">
                                <Button
                                    icon={<MinusOutlined />}
                                    size="small"
                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                />
                                <span className="text-lg">{item.quantity}</span>
                                <Button
                                    icon={<PlusOutlined />}
                                    size="small"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                />
                            </div>
                        </div>
                        <span className="font-bold">{(item.price * item.quantity).toLocaleString()}đ</span>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between font-bold text-lg mt-3">
                <span>Tổng cộng</span>
                <span>{totalPrice.toLocaleString()}đ</span>
            </div>

            <Button
                type="primary"
                className="w-full mt-4 bg-black text-white py-2"
                onClick={() => alert("Đặt hàng thành công!")}
            >
                Đặt hàng
            </Button>
        </div>
    );
};

export default CheckoutSummary;
