import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

const AdminNavbar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { label: 'Option 1', key: '1', icon: <PieChartOutlined /> },
        { label: 'Option 2', key: '2', icon: <DesktopOutlined /> },
        {
            label: 'User',
            key: 'sub1',
            icon: <UserOutlined />,
            children: [
                { label: 'Tom', key: '3' },
                { label: 'Bill', key: '4' },
                { label: 'Alex', key: '5' },
            ],
        },
        {
            label: 'Team',
            key: 'sub2',
            icon: <TeamOutlined />,
            children: [
                { label: 'Team 1', key: '6' },
                { label: 'Team 2', key: '8' },
            ],
        },
        { label: 'Files', key: '9', icon: <FileOutlined /> },
    ];

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} className="min-h-screen">
            <div className="h-16 flex items-center justify-center text-white font-bold text-lg">
                {collapsed ? "E" : "Elecee"}
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
        </Sider>
    );
};

export default AdminNavbar;
