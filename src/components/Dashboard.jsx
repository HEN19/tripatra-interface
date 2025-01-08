/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Layout, Menu, Input, Form, Typography, Table, Select, Button, Modal, InputNumber, Space, Popconfirm } from "antd";
import { useAuth } from "../context/AuthContext";
import { useProduct } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { DashboardOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { deleteDataProduct } from "../api/products";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { Option } = Select;

const Dashboard = () => {
  const { user, logout, handleProfile, handleUpdate } = useAuth();
  const { products, error, handleGetListProduct, handleInsertProduct, handleUpdateProduct , handleDeleteProduct} = useProduct();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [isDashboardFetched, setIsDashboardFetched] = useState(false);
  const [isProfileFetched, setIsProfileFetched] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const resetForm = () => {
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    const { first_name, last_name, gender, telephone, email, address } = values;
    await handleUpdate(first_name, last_name, gender, telephone, email, address);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    setLoading(true);
    if (selectedMenu === "dashboard" && !isDashboardFetched) {
      handleGetListProduct();
      setIsDashboardFetched(true);
    } else if (selectedMenu === "profile" && !isProfileFetched) {
      handleProfile();
      setIsProfileFetched(true);
    }
    setLoading(false);
  }, [selectedMenu, handleGetListProduct, handleProfile, isDashboardFetched, isProfileFetched]);

  useEffect(() => {
    setLoading(true);
    if (selectedMenu === "dashboard") {
      setIsProfileFetched(false);
    } else if (selectedMenu === "profile") {
      setIsDashboardFetched(false);
    }
    setLoading(false);
  }, [selectedMenu]);

  if (!user) {
    return null;
  }

  const handleMenuClick = ({ key }) => {
    setSelectedMenu(key);
    if (key === "logout") {
      logout();
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      const values = await form.validateFields();
      await handleInsertDataProduct(values);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleInsertDataProduct = async (values) => {
    const { product_name, price, stock } = values;
    await handleInsertProduct(product_name, price, stock);
  };

  

  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return (
          <div style={contentContainerStyle}>
            <div style={contentItemStyle}>
              <Title level={3}>Welcome, {user?.last_name}!</Title>

              <Button
                style={{ margin: "0 8px" }}
                type="primary"
                block
                onClick={showModal}
              >
                {"Add Product"}
              </Button>
              <Modal
                title="Add Product"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="Save"
                cancelText="Cancel"
              >
                <Form
                  form={form}
                  name="Product"
                  layout="vertical"
                  initialValues={{ product_name: "" }}
                >
                  <Form.Item
                    label="Product Name"
                    name="product_name"
                    rules={[{ required: true, message: "Please enter Product Name!" }]}
                  >
                    <Input placeholder="Product Name" />
                  </Form.Item>
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                      { required: true, message: "Please enter Price!" },
                      { pattern: /^\d+$/, message: "Price must be numeric!" },
                    ]}
                  >
                    <InputNumber min={1} max={10000000000} defaultValue={0} />
                  </Form.Item>
                  <Form.Item
                    label="Stock"
                    name="stock"
                    rules={[
                      { required: true, message: "Please enter Stock!" },
                      { pattern: /^\d+$/, message: "Stock must be numeric!" },
                    ]}
                  >
                    <InputNumber min={1} max={10000000000} defaultValue={0} />
                  </Form.Item>
                </Form>
              </Modal>

              {error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : (
                <Table
                  dataSource={products}
                  rowKey="id"
                  style={{ marginTop: "16px" }}
                  loading={loading}
                  pagination={false}
                >
                  <Table.Column title="Product Name" dataIndex="product_name" key="product_name" />
                  <Table.Column title="Price" dataIndex="Price" key="Price" />
                  <Table.Column title="Stock" dataIndex="product_stock" key="product_stock" />
                  <Table.Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                      <Space size="middle">
                        <Popconfirm
                          title="Are you sure to delete?"
                        //   onConfirm={() => handleDeleteProduct(record.id)}
                        >                            
                        <Button danger >Delete</Button>
                        </Popconfirm>
                        <Button type="primary">Update</Button>
                      </Space>
                    )}
                  />
                </Table>
              )}
            </div>
          </div>
        );
      case "profile":
        return (
          <div style={contentContainerStyle}>
            <div style={contentItemStyle}>
              <Title level={3}>Profile Details</Title>
              <Form
                name="update-profile"
                layout="vertical"
                loading={loading}
                onFinish={handleSubmit}
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
                  <Input placeholder={user?.last_name} />
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
                  <Input placeholder={user?.email} />
                </Form.Item>
                <Form.Item label="Address" name="address">
                  <Input.TextArea placeholder={user?.address} maxLength={100} />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="button" onClick={resetForm} danger>
                    Cancel
                  </Button>
                  <Button
                    style={{ marginTop: "8px" }}
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        );
      default:
        return <div>No content available</div>;
    }
  };

  const contentContainerStyle = {
    flex: 1,
    padding: "20rem 30rem",
    background: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    width: "calc(50% - 8px)",
    maxWidth: "calc(60% - 8px)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  };

  const contentItemStyle = {
    width: "calc(50% - 8px)",
    marginBottom: "16px",
    minWidth: "250px",
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
        <Content style={{ margin: "16px" }}>{renderContent()}</Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
