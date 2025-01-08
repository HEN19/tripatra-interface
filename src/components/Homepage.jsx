/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={homePageStyle}>
      <Title level={2}>Welcome to tripatra Test</Title>
      <Space direction="vertical" size="large">
        <Button 
          type="primary" 
          size="large" 
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button 
          size="large" 
          onClick={() => navigate("/register")}
        >
          Create Account
        </Button>
      </Space>
    </div>
  );
};

const homePageStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

export default HomePage;
