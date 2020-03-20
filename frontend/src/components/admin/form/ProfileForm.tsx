import React from 'react';
import { Form, Input, Button } from 'antd';
import axios, { setToken } from '../../../helper/client';
import { get } from 'local-storage';
import { AdminContext } from '../../../context/adminContext';
import toast from '../../common/toast';

const ProfileForm: React.FC = () => {
  const endPoint = '/user/user-profile/';
  const { state, dispatch } = React.useContext(AdminContext);
  React.useEffect(() => {
    if (state.token !== '') {
      fetchData(state.token);
    }
  }, [state.token]);

  const [fields, setFields] = React.useState([
    {
      name: 'username',
      value: ''
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

  const fetchData = async (token: string) => {
    setToken(token);
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
  };

  const onFinish = async (values: any) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const data = {
        username: values.username,
        profile: {
          message: values.message,
          url: values.url
        }
      }
      const res = await axios.patch(endPoint, data);
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      toast({ type: 'SUCCESS' });
    } catch {
      console.log("error")
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
      <Form.Item label="message" name="message" rules={[{ required: false, message: 'requreid email' }]}>
        <Input.TextArea placeholder="message" />
      </Form.Item>
      <Form.Item label="url" name="url" rules={[{ required: false, message: '' }]}>
        <Input placeholder="url" />
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
