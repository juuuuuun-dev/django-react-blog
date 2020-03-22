import React from 'react';
import { Form, Input, Button } from 'antd';

import axios from '../../../helper/client';
import { useHistory, useParams } from 'react-router-dom';
import toast from '../../common/toast';

const PasswordResetConfirmForm = () => {
  const history = useHistory();
  const { uid, token } = useParams();
  console.log(uid, token)
  const onFinish = async (values: any) => {
    try {
      const endPoint = `/user/password-reset-confirm/${uid}/${token}/`;
      const res = await axios.post(endPoint, values);
      if (res.status === 200) {
        toast({ type: 'SUCCESS', text: 'Success changed password' });
        history.push("/login")
      }
    } catch {
      toast({ type: 'ERROR' });
    }
  };

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      name="normal_login"
      className="login-form"
      onFinish={onFinish}
    >
      <Form.Item label="New password" name="new_password" rules={[
        { required: true, message: 'requreid new password' },
        { min: 6, message: "6 characters or more" },
      ]}>
        <Input placeholder="new password" />
      </Form.Item>

      <Form.Item label="Confirm password" name="new_password2" rules={[
        { required: true, message: 'requreid confirm password' },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (!value || getFieldValue('new_password') === value) {
              return Promise.resolve();
            }
            return Promise.reject('The two passwords that you entered do not match!');
          },
        }),
      ]}>
        <Input placeholder="Confirm Password" />
      </Form.Item>

      <Form.Item
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Button type="primary" htmlType="submit" className="login-form-button">
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PasswordResetConfirmForm;
