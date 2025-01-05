/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Form, Input, Typography, Alert, Select } from "antd";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const Registration = () => {
    const { handleRegister, error, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const {
            username,
            password,
            first_name,
            last_name,
            gender,
            telephone,
            email,
            address,
        } = values;
        await handleRegister(
            username,
            password,
            first_name,
            last_name,
            gender,
            telephone,
            email,
            address
        );
        if (!error) navigate("/login");
    };

    return (
        <div className="register-container" style={{ maxWidth: "500px", margin: "0 auto", padding: "50px" }}>
            <Title level={2} style={{ textAlign: "center" }}>
                Register
            </Title>
            <Form
                name="register"
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    username: "",
                    password: "",
                    first_name: "",
                    last_name: "",
                    gender: "",
                    telephone: "",
                    email: "",
                    address: "",
                }}
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
                <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[{ required: true, message: "Please enter your first name!" }]}
                >
                    <Input placeholder="Enter your first name" />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="last_name"
                    rules={[{ required: true, message: "Please enter your last name!" }]}
                >
                    <Input placeholder="Enter your last name" />
                </Form.Item>
                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{ required: true, message: "Please select your gender!" }]}
                >
                    <Select placeholder="Select your gender">
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
                    <Input placeholder="Enter your telephone number" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter your email!" },
                        { type: "email", message: "Please enter a valid email!" },
                    ]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: "Please enter your address!" }]}
                >
                    <Input.TextArea placeholder="Enter your address" rows={4} />
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
                        {loading ? "Registering..." : "Register"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Registration;
