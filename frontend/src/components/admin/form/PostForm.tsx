import React from 'react';
import { Form, Input, Button, Switch } from 'antd';
import { IPostData, IPostFormItem } from '../../../types/posts';


interface IProps {
  data?: IPostData;
  formItem?: IPostFormItem;
  onSubmit: (values: any) => Promise<void>;
  error?: {
    title?: Array<string>
  }
}
const PostForm: React.FC<IProps> = ({ data, formItem, onSubmit, error }) => {
  const [fields, setFields] = React.useState([
    {
      name: 'title',
      value: '',
    },
    {
      name: 'content',
      value: '',
    },
    {
      name: 'is_show',
      value: false,
    },
  ]);
  React.useEffect(() => {
    if (data) {
      setFields([
        {
          name: 'title',
          value: data.title
        },
        {
          name: 'content',
          value: data.content,
        },
        {
          name: 'is_show',
          value: data.is_show,
        },
      ]);
    }
  }, [data]);
  const onFinish = async (values: any) => {
    console.log({ values });
    // onSubmit(values)
  };

  const handleShow = () => {
    // const res = fields.map((value) => {
    //   if (value.name === 'is_show') {
    //     return {
    //       name: 'is_show',
    //       value: value.value !== true,
    //     }
    //   } else {
    //     return value;
    //   }
    // })
    // setFields(res);
    // console.log({ res })
    // setFields([]);
  }

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
      <Form.Item
        label="Show"
        name="is_show"
      >
        <Switch onChange={handleShow} />
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
