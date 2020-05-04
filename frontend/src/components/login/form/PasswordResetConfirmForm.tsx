import React from 'react';
import { Form, Input, Button } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import toast from '../../common/toast';
import { passwordResetConfirm } from '../../../service/admin/auth';
import config from '../../../config/auth.json';

const PasswordResetConfirmForm = () => {
  const history = useHistory();
  const { uid, token } = useParams();
  const onFinish = async (values: any) => {
    try {
      await passwordResetConfirm({ uid, token, values })
      toast({ type: 'SUCCESS', text: 'Successful changed password' });
      history.push('/login');
    } catch (e) {
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
      <Form.Item
        label="New password"
        name="new_password"
        rules={[
          { required: true, message: 'requreid new password' },
          { min: config.passwordMin, message: `${config.passwordMin} characters or more` },
        ]}
      >
        <Input aria-label="input-new-password" placeholder="new password" />
      </Form.Item>

      <Form.Item
        label="Confirm password"
        name="new_password2"
        rules={[
          { required: true, message: 'requreid confirm password' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('new_password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input aria-label="input-new-password2" placeholder="Confirm Password" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" aria-label="submit-new-password" htmlType="submit" className="login-form-button">
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PasswordResetConfirmForm;
