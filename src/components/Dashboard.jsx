/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Layout, Menu, Typography, Button } from "antd";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    DashboardOutlined,
    UserOutlined,
    LogoutOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState("dashboard"); // Keep track of selected menu

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user) {
        return null; 
    }

    const handleMenuClick = ({ key }) => {
        setSelectedMenu(key); 
        if (key === "logout") {
            logout();
        }
    };

    const renderContent = () => {
        switch (selectedMenu) {
            case "dashboard":
                return (
                    <div
                        style={{
                            padding: "24px",
                            background: "#fff",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Title level={3} style={{ margin: 0, display: "inline-block", whiteSpace: "nowrap" }}>
                            Welcome, {user?.username}!
                        </Title>
                        <Button type="primary" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                );
            case "profile":
                return (
                    <div
                        style={{
                            padding: "24px",
                            background: "#fff",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Title level={3} style={{ margin: 0, display: "inline-block", whiteSpace: "nowrap" }}>
                            Profile Details
                        </Title>
                        <p>Username: {user?.username}</p>
                        <p>Email: {user?.email}</p>
                    </div>
                );
            default:
                return <div>No content available</div>;
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible>
                <div
                    style={{
                        height: "64px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                    }}
                >
                    Tripatra Test
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    onClick={handleMenuClick}
                    selectedKeys={[selectedMenu]}
                    items={[
                        {
                            key: "dashboard",
                            icon: <DashboardOutlined />,
                            label: "Dashboard",
                        },
                        {
                            key: "profile",
                            icon: <UserOutlined />,
                            label: "Profile",
                        },
                        {
                            key: "logout",
                            icon: <LogoutOutlined />,
                            label: "Logout",
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 16px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Title level={3} style={{ margin: 0, display: "inline-block", whiteSpace: "nowrap" }}>
                        Dashboard
                    </Title>
                </Header>
                <Content
                    style={{
                        margin: "16px",
                        padding: "24px",
                        background: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    {renderContent()} 
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
