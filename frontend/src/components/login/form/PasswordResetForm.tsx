import React from 'react';
import { Form, Input, Button, message } from 'antd';

import axios from '../../../helper/client';
import { set } from 'local-storage';
import { useHistory } from 'react-router-dom';
import toast from '../../common/toast';
interface PasswordResetFormProps {
  setSending: React.Dispatch<React.SetStateAction<boolean>>
}

const PasswordResetForm = ({ setSending }: PasswordResetFormProps) => {
  const history = useHistory();

  const onFinish = (values: any) => {
    axios
      .post('/user/password-reset/', values)
      .then(res => {
        const { data } = res;
        if (data.sending) {
          toast({ type: 'SUCCESS', text: 'sending email' });
          setSending(true)
        }
        console.log(data)
      })
      .catch(e => {
        console.log(e);
        message.error('Request error');
      });
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <Form.Item name="email" rules={[{ required: true, message: 'requreid email' }]}>
        <Input placeholder="Your email" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PasswordResetForm;
