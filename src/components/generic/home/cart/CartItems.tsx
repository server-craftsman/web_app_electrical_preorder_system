import React, { useState, useEffect } from "react";
import { Table, Button, InputNumber, Checkbox, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons"; // Import icon DeleteOutlined
import { useCart } from "../../../../contexts/CartContext";

interface CartItemProps {
    cartItems: {
        id: string;
        name: string;
        price: number;
        imageUrl: string;
        quantity: number;
    }[];
    setSelectedItems: (selected: string[]) => void;
}

const CartItem: React.FC<CartItemProps> = ({ cartItems, setSelectedItems }) => {
    const { updateQuantity, removeFromCart } = useCart();
    const [selected, setSelected] = useState<string[]>(cartItems.map(item => item.id));

    useEffect(() => {
        setSelectedItems(selected);
    }, [selected, setSelectedItems]);

    const handleSelect = (id: string, checked: boolean) => {
        setSelected(prev => (checked ? [...prev, id] : prev.filter(item => item !== id)));
    };

    const handleRemove = (id: string) => {
        removeFromCart(id);
        setSelected(prev => prev.filter(item => item !== id));

        notification.config({
            top: 73,
        });

        notification.success({
            message: "Thành công!",
            description: "Đã xoá sản phẩm khỏi giỏ hàng.",
            placement: "topRight", 
            duration: 3, 
        });
    };
    
    const columns = [
        {
            title: "",
            dataIndex: "select",
            key: "select",
            render: (_: any, record: any) => (
                <Checkbox
                    checked={selected.includes(record.id)}
                    onChange={(e) => handleSelect(record.id, e.target.checked)}
                />
            ),
        },
        {
            title: <span className="text-xl font-semibold">Sản phẩm</span>,
            dataIndex: "product",
            key: "product",
            render: (_: any, record: any) => (
                <div className="flex items-center space-x-4">
                    <img src={record.imageUrl} alt={record.name} className="w-16 h-16 object-cover rounded" />
                    <span className="font-semibold">{record.name}</span>
                </div>
            ),
        },
        {
            title: <span className="text-xl font-semibold">Giá</span>,
            dataIndex: "price",
            key: "price",
            render: (price: number) => <span>{price.toLocaleString()} VND</span>,
        },
        {
            title: <span className="text-xl font-semibold">Số lượng</span>,
            dataIndex: "quantity",
            key: "quantity",
            width: 150,
            render: (quantity: number, record: any) => (
                <InputNumber
                    min={1}
                    value={quantity}
                    onChange={(value) => updateQuantity(record.id, Number(value))}
                    className="w-16"
                />
            ),
        },
        {
            title: "",
            key: "action",
            render: (_: any, record: any) => (
                <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />} 
                    onClick={() => handleRemove(record.id)}
                />
            ),
        },
    ];

    return (
        <div className="p-4">
            <Table
                columns={columns}
                dataSource={cartItems}
                rowKey="id"
                pagination={false}
                className="w-full max-w-4xl mx-auto shadow-lg rounded-lg text-lg"
            />
        </div>
    );
};

export default CartItem;
