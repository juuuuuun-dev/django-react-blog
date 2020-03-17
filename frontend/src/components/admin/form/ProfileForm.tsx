import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios, { setToken } from '../../../helper/client';
import { useHistory } from 'react-router-dom';
import { AdminContext } from '../../../context/adminContext';
import toast from '../../common/toast';

const ProfileForm: React.FC = () => {
  const history = useHistory();
  const endPoint = '/user/user-profile/';
  const { state, dispatch } = React.useContext(AdminContext);
  console.log('profile form');
  React.useEffect(() => {
    fetchData();
  }, []);

  const [fields, setFields] = React.useState([
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
    // setToken(state.token);
    const res = await axios.get(endPoint);
    if (res.status === 200) {
      console.log(res.data);
      setFields([
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
      const res = await axios.patch(endPoint, values);
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
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
      <Form.Item label="message" name="message" rules={[{ required: false, message: 'requreid email' }]}>
        <Input.TextArea placeholder="message" />
      </Form.Item>
      <Form.Item label="url" name="url" rules={[{ required: false, message: 'Please input your Password!' }]}>
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
