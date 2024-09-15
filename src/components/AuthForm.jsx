// src/components/AuthForm.jsx
import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { toast } from 'react-toastify';

const { Title } = Typography;

const AuthForm = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:8000/auth/${isLogin ? 'login' : 'register'}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                }
            );

            const data = await response.json();

            if (response.ok) {
                toast.success(`${isLogin ? 'Logged in' : 'Registered'} successfully!`);
                onAuthSuccess(data); // Pass user data to parent
            } else {
                toast.error(data.message || 'Authentication failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form">
            <Title level={3}>{isLogin ? 'Login' : 'Register'}</Title>
            <Form
                name="auth"
                onFinish={onFinish}
                layout="vertical"
                style={{ maxWidth: 300 }}
            >
                <Form.Item
                    label="User ID"
                    name="id"
                    rules={[{ required: true, message: 'Please input your User ID!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        {isLogin ? 'Login' : 'Register'}
                    </Button>
                </Form.Item>
            </Form>
            <Button type="link" onClick={toggleMode}>
                {isLogin
                    ? "Don't have an account? Register"
                    : 'Already have an account? Login'}
            </Button>
        </div>
    );
};

export default AuthForm;