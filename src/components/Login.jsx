/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Form, Input, Typography, Alert } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
    const { handleLogin, error, loading } = useAuth();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const { username, password } = values;
        await handleLogin(username, password);
        if (!error) navigate("/dashboard");
    };

    return (
        <div className="login-container" style={{ maxWidth: "400px", margin: "0 auto", padding: "50px" }}>
            <Title level={2} style={{ textAlign: "center" }}>
                Login
            </Title>
            <Form
                form={form}
                name="login"
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ username: "", password: "" }}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: "Please enter your username!" }]}
                >
                    <Input placeholder="Enter your username" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please enter your password!" }]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>
                {error && (
                    <Alert
                        message="Error"
                        description={error}
                        type="error"
                        showIcon
                        style={{ marginBottom: "16px" }}
                    />
                )}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
