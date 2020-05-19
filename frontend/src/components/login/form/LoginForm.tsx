import React from 'react';
import { Form, Input, Button } from 'antd';
import { login } from '../../../service/admin/auth';
import { useHistory } from 'react-router-dom';
import { set } from 'local-storage';
import toast from '../../../components/common/toast';

const LoginForm: React.FC = () => {
  const history = useHistory();
  const onFinish = async (values: any) => {
    try {
      const { data } = await login(values);
      set<string>('token', data.access);
      set<string>('refresh', data.refresh);
      set<string>('username', data.username);
      set<string>('thumb', data.thumb);
      history.push('/admin/dashboard');
    } catch (e) {
      if (e.response.data.detail) {
        toast({ type: "ERROR", text: e.response.data.detail })
      } else {
        toast({ type: "ERROR" });
      }
    }
  };

  return (
    <>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item name="email" rules={[{ required: true, message: 'requreid email' }]}>
          <Input aria-label="input-email" placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input aria-label="input-password" type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" aria-label="login-submit" htmlType="submit" className="login-form-button">
            Login
        </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
