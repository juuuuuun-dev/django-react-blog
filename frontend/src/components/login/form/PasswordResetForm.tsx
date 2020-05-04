import React from 'react';
import { Form, Input, Button } from 'antd';
import { passwordReset } from '../../../service/admin/auth';
import toast from '../../common/toast';
interface PasswordResetFormProps {
  setSending: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordResetForm = ({ setSending }: PasswordResetFormProps) => {
  const onFinish = async (values: any) => {
    try {
      const res = await passwordReset(values.email);
      if (res.data.sending) {
        toast({ type: 'SUCCESS', text: 'Sending email' });
        setSending(true);
      } else {
        toast({ type: 'ERROR', text: "Email sending error" });
      }
    } catch (e) {
      toast({ type: 'ERROR' });
    }
  };

  return (
    <Form name="normal_login" className="login-form" onFinish={onFinish}>
      <Form.Item name="email" rules={[{ required: true, message: 'requreid email' }]}>
        <Input aria-label="input-password-reset-email" placeholder="Your email" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" aria-label="submit-password-reset-email" htmlType="submit" className="login-form-button">
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PasswordResetForm;
