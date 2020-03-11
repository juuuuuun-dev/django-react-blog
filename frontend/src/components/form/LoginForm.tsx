import React, { FC } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from "axios"


const LoginForm: FC = () => {

  const onFinish = (values: any) => {
    console.log('Finish:', values);
    // const res = await axios.post
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'requreid email' }]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Login</Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
