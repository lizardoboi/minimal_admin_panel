import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../store/auth/actions';
import { RootState } from '../store/rootReducer';

const { Title } = Typography;

export default function LoginPage() {
    const dispatch = useDispatch();
    const auth = useSelector((s: RootState) => s.auth);
    const [email, setEmail] = useState('test@test.ru');
    const [password, setPassword] = useState('khro2ij3n2730');

    const onFinish = () => {
        dispatch(loginRequest(email, password));
    };

    return (
        <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <Card style={{ width: 360 }}>
                <Title level={3}>Вход</Title>
                {auth.error && <Alert type="error" message={auth.error} style={{ marginBottom: 12 }} />}
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item label="E-mail" required>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Пароль" required>
                        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={auth.loading}>
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}