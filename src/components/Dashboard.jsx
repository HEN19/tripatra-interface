/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Layout, Menu, Input, Form,Typography, Table, Select } from "antd";
import { useAuth } from "../context/AuthContext";
import { useProduct } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { DashboardOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { Option } = Select;

const Dashboard = () => {
    const { user, logout, handleProfile } = useAuth();
    const { products, loading, error, handleGetListProduct } = useProduct();
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState();
    const [isDashboardFetched, setIsDashboardFetched] = useState(false);
    const [isProfileFetched, setIsProfileFetched] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (selectedMenu === "dashboard" && !isDashboardFetched) {
            handleGetListProduct();
            setIsDashboardFetched(true);
        } else if (selectedMenu === "profile" && !isProfileFetched) {
            handleProfile();
            setIsProfileFetched(true);
        }
    }, [selectedMenu, handleGetListProduct, handleProfile, isDashboardFetched, isProfileFetched]);

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
                    <div style={contentContainerStyle}>
                        <div style={contentItemStyle}>
                            <Title level={3}>Welcome, {user?.username}!</Title>
                            {error ? (
                                <p style={{ color: "red" }}>{error}</p>
                            ) : (
                                <Table
                                    dataSource={products}
                                    loading={loading}
                                    rowKey="id"
                                    style={{ marginTop: "16px" }}
                                >
                                    <Table.Column title="Name" dataIndex="product_name" key="product_name" />
                                    <Table.Column title="Price" dataIndex="Price" key="Price" />
                                    <Table.Column title="Stock" dataIndex="product_stock" key="product_stock" />
                                </Table>
                            )}
                        </div>
                        <div style={contentItemStyle}>
                            <Title level={3}>Quick Info</Title>
                            <p>Product list is ready for viewing!</p>
                        </div>
                    </div>
                );
            case "profile":
                return (
                    <div style={contentContainerStyle}>
                        <div style={contentItemStyle}>
                            <Title level={3}>Profile Details</Title>
                            <Form
                                name="register"
                                layout="vertical"
                                initialValues={{
                                    first_name: user?.first_name,
                                    last_name: user?.last_name,
                                    gender: user?.gender,
                                    telephone: user?.telephone,
                                    email: user?.email,
                                    address: user?.address,
                                }}
                            >
                                <Form.Item
                                    label="First Name"
                                    name="first_name"
                                    rules={[{ required: true, message: "Please enter your first name!" }]}
                                >
                                    <Input placeholder={user?.first_name} />
                                </Form.Item>
                                <Form.Item
                                    label="Last Name"
                                    name="last_name"
                                    rules={[{ required: true, message: "Please enter your last name!" }]}
                                >
                                    <Input placeholder={user?.first_name} />
                                </Form.Item>
                                <Form.Item
                                    label="Gender"
                                    name="gender"
                                    rules={[{ required: true, message: "Please select your gender!" }]}
                                >
                                    <Select placeholder={user?.gender}>
                                        <Option value="L">Male</Option>
                                        <Option value="P">Female</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Telephone"
                                    name="telephone"
                                    rules={[
                                        { required: true, message: "Please enter your telephone number!" },
                                        { pattern: /^\d+$/, message: "Telephone must be numeric!" },
                                    ]}
                                >
                                    <Input placeholder={user?.telephone} />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        { required: true, message: "Please enter your email!" },
                                        { type: "email", message: "Please enter a valid email!" },
                                    ]}
                                >
                                </Form.Item>                                    
                                <Input placeholder={user?.email} />

                                <Form.Item
                                    label="Address"
                                    name="Address"
                                    rules={[
                                        { required: true, message: "Please enter your email!" },
                                        { type: "email", message: "Please enter a valid email!" },
                                    ]}
                                >
                                </Form.Item>                                    
                                <Input placeholder={user?.address} />
                            </Form>

                        </div>
                    </div>
                );
            default:
                return <div>No content available</div>;
        }
    };

    const contentContainerStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "24px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    };

    const contentItemStyle = {
        width: "48%",
        marginBottom: "16px",
        minWidth: "300px",
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
                    <Title level={3} style={{ margin: 0 }}>
                        Dashboard
                    </Title>
                </Header>
                <Content style={{ margin: "16px" }}>
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
