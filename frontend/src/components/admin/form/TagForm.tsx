import React from 'react';
import { Form, Input, Button } from 'antd';
import axios, { setToken } from '../../../helper/client';
import { AdminContext } from '../../../context/adminContext';
import toast from '../../common/toast';
import { set } from 'local-storage';

const TagForm: React.FC = () => {
  const endPoint = '/tags/admin-tag/';
  const { state, dispatch } = React.useContext(AdminContext);

  React.useEffect(() => {
    if (state.token !== '') {
      fetchData(state.token);
    }
  }, [state.token]);

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

  const fetchData = async (token: string) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    setToken(token);
    const res = await axios.get(endPoint);
    if (res.status === 200) {
      console.log(res.data);
      setFields([
        {
          name: 'name',
          value: res.data.name,
        },
      ]);
    }
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
  };

  const onFinish = async (values: any) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const data = {
        name: values.name,
      };
      const res = await axios.patch(endPoint, data);
      if (res.status === 200) {
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
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
      <Form.Item label="name" name="name" rules={[{ required: true, message: 'Please input name' }]}>
        <Input placeholder="name" />
      </Form.Item>

      <Form.Item colon={false}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TagForm;
