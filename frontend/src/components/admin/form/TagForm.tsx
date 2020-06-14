import { Button, Form, Input } from 'antd';
import React from 'react';

import { TagFormProps } from '../../../types/tags';

const TagForm: React.FC<TagFormProps> = ({ data, onSubmit, error }) => {
  const [fields, setFields] = React.useState([
    {
      name: 'name',
      value: '',
    },
    {
      name: 'slug',
      value: '',
    }
  ]);
  React.useEffect(() => {
    if (data) {
      setFields([
        {
          name: 'name',
          value: data.name
        },
        {
          name: 'slug',
          value: data.slug
        },
      ]);
    }
  }, [data]);
  const onFinish = async (values: any) => {
    onSubmit(values)
  };

  return (
    <Form
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 14 }}
      name="tag"
      fields={fields}
      onFinish={onFinish}
    >
      <Form.Item
        label="name"
        name="name"
        validateStatus={error && error.name ? "error" : "success"}
        help={error && error.name ? error.name[0] : null}
        rules={[{ required: true, message: 'Please input name' }]}
      >
        <Input aria-label="input-name" placeholder="name" />
      </Form.Item>

      <Form.Item
        label="slug"
        extra="Used for url. If you change it, the URL will change"
        name="slug"
        validateStatus={error && error.slug ? "error" : "success"}
        help={error && error.slug ? error.slug[0] : null}
        rules={[{ required: true, type: 'string', message: 'Please input slug' }]}
      >
        <Input aria-label="input-slug" placeholder="Used for url" />
      </Form.Item>

      <Form.Item colon={false}>
        <Button type="primary" aria-label="form-submit" htmlType="submit" className="login-form-button">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TagForm;
