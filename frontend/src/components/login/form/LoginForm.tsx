import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';

import axios from '../../../helper/client';
import { set } from 'local-storage';
import { useHistory } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const history = useHistory();

  const onFinish = (values: any) => {
    axios
      .post('/blog_auth/login/', values)
      .then(res => {
        const { data } = res;
        set<string>('token', data.key);
        history.push('/admin/dashboard');
      })
      .catch(e => {
        console.log(e);
        message.error('Request error');
      });
  };

  return (
    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item name="email" rules={[{ required: true, message: 'requreid email' }]}>
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
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
