import React from 'react';
import { Form, Input, Button } from 'antd';
import { ITagData } from '../../../types/tags';
import axios from '../../../helper/client';
import { AdminContext } from '../../../context/adminContext';
import toast from '../../common/toast';
import { set } from 'local-storage';

interface IProps {
  data?: ITagData;
  onSubmit: (values: any) => Promise<void>;
}
const TagForm: React.FC<IProps> = ({ data, onSubmit }) => {
  const [fields, setFields] = React.useState([
    {
      name: 'name',
      value: '',
    },
  ]);
  React.useEffect(() => {
    if (data) {
      setFields([
        {
          name: 'name',
          value: data.name
        },
      ]);
    }
  }, [data]);

  const onFinish = async (values: any) => {
    onSubmit(values)
  };

  return (
    <Form
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 14 }}
      name="tag"
      fields={fields}
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
