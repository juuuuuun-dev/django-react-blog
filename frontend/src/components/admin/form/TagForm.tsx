import React from 'react';
import { Form, Input, Button } from 'antd';
import { ITagData } from '../../../types/tags';


interface IProps {
  data?: ITagData;
  onSubmit: (values: any) => Promise<void>;
  error?: {
    name?: Array<string>
  }
}
const TagForm: React.FC<IProps> = ({ data, onSubmit, error }) => {
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
  console.log({ error })
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
      <Form.Item
        label="name"
        name="name"
        validateStatus={error && error.name ? "error" : "success"}
        help={error && error.name ? "This name already exists" : null}
        rules={[{ required: true, message: 'Please input name' }]}
      >
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
