import React from 'react';
import { Form, Input, Button } from 'antd';
import { login } from '../../../service/admin/auth';
import { useHistory } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const history = useHistory();

  const onFinish = (values: any) => {
    console.log("onFinishSita")
    login(history, values);
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <Form.Item name="email" rules={[{ required: true, message: 'requreid email' }]}>
        <Input aria-label="email" placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input aria-label="password" type="password" placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" aria-label="login-submit" htmlType="submit" className="login-form-button">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
