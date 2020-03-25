import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from '../../../helper/client';
import { AdminContext } from '../../../context/adminContext';
import toast from '../../common/toast';
import { set } from 'local-storage';

const ProfileForm: React.FC = () => {
  const endPoint = '/users/user-profile/';
  const { state, dispatch } = React.useContext(AdminContext);

  React.useEffect(() => {
    if (state.hasToken) {
      fetchData();
    }
  }, [state.hasToken]);

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

  const fetchData = async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    // setToken(token);
    const res = await axios.get(endPoint);
    if (res.status === 200) {
      console.log(res.data);
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
    }
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
  };

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
      const res = await axios.patch(endPoint, data);
      if (res.status === 200) {
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
        set<string>('username', values.username);
        toast({ type: 'SUCCESS' });
      }
    } catch {
      console.log('error');
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
