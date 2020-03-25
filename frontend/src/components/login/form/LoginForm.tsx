import React from 'react';
import { Form, Input, Button, message } from 'antd';

import axios from '../../../helper/client';
import { set } from 'local-storage';
import { useHistory } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const history = useHistory();

  const onFinish = (values: any) => {
    axios
      .post('/blog_auth/token/', values)
      .then(res => {
        const { data } = res;
        set<string>('token', data.access);
        set<string>('refresh', data.refresh);
        set<string>('username', data.username);
        history.push('/admin/dashboard');
      })
      .catch(e => {
        console.log(e);
        message.error('Request error');
      });
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <Form.Item name="email" rules={[{ required: true, message: 'requreid email' }]}>
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input type="password" placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
