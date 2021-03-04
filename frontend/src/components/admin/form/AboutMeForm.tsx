import { Button, Form, Input } from 'antd';
import React from 'react';

import { AboutMeFormProps } from '../../../types/aboutMe';
import MarkdownEditor from '../../common/MarkdownEditor';

const AboutMeForm: React.FC<AboutMeFormProps> = (props) => {
  const { data, onSubmit } = props;
  const [form] = Form.useForm();
  const [content, setContent] = React.useState<string>("");

  React.useEffect(() => {
    if (data) {
      setContent(data.content)
      form.setFieldsValue({
        page_title: data.page_title,
        content: data.content,
      });
    }
  }, [data, form]);

  const onFinish = async (values: any) => {
    if (content) {
      values["content"] = content;
    }
    onSubmit(values);
  };

  

  return (
    <>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 18 }}
        name="about_me"
        className="login-form"
        form={form}
        onFinish={onFinish}
      >

        <Form.Item label="About me page title" name="page_title" rules={[{ required: true, message: 'Please input page title' }]}>
          <Input aria-label="input-page-title" placeholder="page title" />
        </Form.Item>

        <Form.Item label="content" name="content">
          {/* <Input.TextArea aria-label="textarea-content" rows={6} placeholder="desciption" /> */}
          <MarkdownEditor onChangeHandler={setContent} value={content} />

        </Form.Item>
        

        <Form.Item>
          <Button disabled={!props.isStaff} aria-label="form-submit" type="primary" htmlType="submit" className="login-form-button">
            Submit
        </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AboutMeForm;
