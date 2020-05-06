import React from 'react';
import { Form, Input, Button } from 'antd';
import { AdminContext } from '../../../context/adminContext';
import toast from '../../common/toast';
import { set } from 'local-storage';
import { retrieve, patch } from '../../../service/admin/profile';

const ProfileForm: React.FC = () => {
  const { state, dispatch } = React.useContext(AdminContext);

  const fetchData = React.useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    const res = await retrieve();
    setFields([
      {
        name: 'username',
        value: res.data.username,
      },
      {
        name: 'message',
        value: res.data.profile.message,
      },
      {
        name: 'url',
        value: res.data.profile.url,
      },
    ]);
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
  }, [dispatch]);

  React.useEffect(() => {
    if (state.hasToken) fetchData();
  }, [fetchData, state.hasToken]);

  const [fields, setFields] = React.useState([
    {
      name: 'username',
      value: '',
    },
    {
      name: 'message',
      value: '',
    },
    {
      name: 'url',
      value: '',
    },
  ]);


  const onFinish = async (values: any) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const data = {
        username: values.username,
        profile: {
          message: values.message,
          url: values.url,
        },
      };
      await patch(data);
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      set<string>('username', values.username);
      toast({ type: 'SUCCESS' });
    } catch {
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      toast({ type: 'ERROR' });
    }
  };

  return (
    <Form
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 14 }}
      name="normal_login"
      className="login-form"
      fields={fields}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item label="username" name="username" rules={[{ required: true, message: 'Please input your username' }]}>
        <Input placeholder="username" />
      </Form.Item>
      <Form.Item label="url" name="url" rules={[{ required: false, message: '' }]}>
        <Input placeholder="url" />
      </Form.Item>
      <Form.Item label="message" name="message" rules={[{ required: false, message: 'requreid email' }]}>
        <Input.TextArea rows={6} placeholder="message" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
