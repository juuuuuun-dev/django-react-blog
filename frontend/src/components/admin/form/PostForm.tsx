import React from 'react';
import { Form, Input, Button } from 'antd';
import { ITagData } from '../../../types/posts';


interface IProps {
  data?: ITagData;
  onSubmit: (values: any) => Promise<void>;
  error?: {
    title?: Array<string>
  }
}
const PostForm: React.FC<IProps> = ({ data, onSubmit, error }) => {
  const [fields, setFields] = React.useState([
    {
      name: 'title',
      value: '',
    },
  ]);
  React.useEffect(() => {
    if (data) {
      setFields([
        {
          name: 'title',
          value: data.title
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
        label="Title"
        name="title"
        validateStatus={error && error.title ? "error" : "success"}
        help={error && error.title ? "This title already exists" : null}
        rules={[{ required: true, message: 'Please input title' }]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: 'Please input content' }]}
      >
        <Input.TextArea rows={16} placeholder="Content" />
      </Form.Item>

      <Form.Item colon={false}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
