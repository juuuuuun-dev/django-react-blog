import { Button, Form, Input } from 'antd';
import React from 'react';

import { CategoryFormProps } from '../../../types/categories';

const CategoryForm: React.FC<CategoryFormProps> = ({ data, onSubmit, error }) => {
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
        help={error && error.name ? "This name already exists" : null}
        rules={[{ required: true, message: 'Please input name' }]}
      >
        <Input aria-label="input-name" placeholder="name" />
      </Form.Item>

      <Form.Item
        label="slug"
        extra="Used for url. If you change it, the URL will change"
        name="slug"
        validateStatus={error && error.name ? "error" : "success"}
        help={error && error.slug ? "This slug already exists" : null}
        rules={[{ required: true, type: 'string', message: 'Please input slug' }]}
      >
        <Input aria-label="input-slug" placeholder="Used for url" />
      </Form.Item>

      <Form.Item colon={false}>
        <Button aria-label="form-submit" type="primary" htmlType="submit" className="login-form-button">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
