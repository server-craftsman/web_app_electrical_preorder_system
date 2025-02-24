import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { Menu } from "antd";
import { ROUTER_URL } from '../../const';

import {
    UserOutlined,
    ShoppingCartOutlined,
    StarOutlined,
    LockOutlined,
    LogoutOutlined,
    RollbackOutlined,
} from "@ant-design/icons";

const CustomerNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [selectedKey, setSelectedKey] = useState("overview"); 

    const menuItems = [
        {
            label: 'Tổng quan',
            key: 'overview',
            icon: <StarOutlined style={{ fontSize: "20px" }} />,
            path: ROUTER_URL.CUSTOMER.BASE,
        },
        {
            label: 'Thông tin cá nhân',
            key: 'profile',
            icon: <UserOutlined style={{ fontSize: "20px" }} />,
            path: ROUTER_URL.CUSTOMER.PROFILE,
        },
        {
            label: 'Đơn hàng',
            key: "orders",
            icon: <ShoppingCartOutlined style={{ fontSize: "20px" }} />,
            path: ROUTER_URL.CUSTOMER.ORDERS,
        },
        {
            label: 'Hoàn trả đơn hàng',
            key: 'return-orders',
            icon: <RollbackOutlined style={{ fontSize: "20px" }} />,
            path: ROUTER_URL.CUSTOMER.RETURN_ORDER,
        },
        {
            label: 'Thay đổi mật khẩu',
            key: 'change-password',
            icon: <LockOutlined style={{ fontSize: "20px" }} />,
            path: ROUTER_URL.CUSTOMER.CHANGE_PASSWORD,
        },
        {
            label: 'Đăng xuất',
            key: 'logout',
            icon: <LogoutOutlined style={{ fontSize: "20px", color: "red" }} />,
            path: ROUTER_URL.CUSTOMER.LOGOUT,
        },
    ];


    useEffect(() => {
        const currentItem = menuItems.find(item => item.path === location.pathname);
        if (currentItem) {
            setSelectedKey(currentItem.key);
        } else {
            setSelectedKey("overview"); 
        }
    }, [location.pathname]); 

    return (
        <div className="flex items-center justify-center bg-gray-100 h-[590px]">
            <div className="bg-white shadow-md rounded-3xl p-8 w-80 h-full flex flex-col justify-center">
                <Menu
                    mode="vertical"
                    selectedKeys={[selectedKey]} 
                    className="space-y-6"
                    onClick={({ key }) => {
                        setSelectedKey(key);
                        const item = menuItems.find((menu) => menu.key === key);
                        if (item) {
                            navigate(item.path);
                        }
                    }}
                >
                    {menuItems.map((item) => (
                        <Menu.Item
                            key={item.key}
                            icon={item.icon}
                            className={`text-lg mb-2 rounded-lg transition-colors 
                                ${selectedKey === item.key ? "!bg-red-500 !text-white" : "!hover:bg-gray-200"}`}
                        >
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
        </div>
    );
};

export default CustomerNavbar;
