import { Button, Form, Input } from 'antd';
import React from 'react';

import { validateSlug } from '../../../helper/validation';
import { TagFormProps } from '../../../types/tags';

const TagForm: React.FC<TagFormProps> = ({ data, onSubmit, isStaff, error }) => {
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
        help={error && error.name ? error.name[0] : null}
        rules={[{ required: true, message: 'Please input name' }]}
      >
        <Input aria-label="input-name" placeholder="name" />
      </Form.Item>

      <Form.Item
        label="slug"
        extra="Used for url. If you change it, the URL will change"
        name="slug"
        help={error && error.slug ? error.slug[0] : null}
        rules={[
          { required: true, message: 'Please input slug' },
          { pattern: new RegExp(validateSlug.pattern), message: validateSlug.message },
        ]}
      >
        <Input aria-label="input-slug" placeholder="Used for url" />
      </Form.Item>

      <Form.Item colon={false}>
        <Button disabled={!isStaff} type="primary" aria-label="form-submit" htmlType="submit" className="login-form-button">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TagForm;
