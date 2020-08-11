import { Button, Form, Input } from 'antd';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import SimpleMDE from 'react-simplemde-editor';

import PostDetailContent from '../../../components/main/posts/PostDetailContent';
import { AboutMeFormProps } from '../../../types/aboutMe';
import MediaModal from '../../admin/MediaModal';

const AboutMeForm: React.FC<AboutMeFormProps> = (props) => {
  const { data, onSubmit } = props;
  const [form] = Form.useForm();
  const [content, setContent] = React.useState<string>("");
  const [codemirror, setCodeMirror] = React.useState<any>();
  const [mediaModalVisible, setMediaModalVisible] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (data) {
      setContent(data.description)
      form.setFieldsValue({
        page_title: data.page_title,
        description: data.description,
      });
    }
  }, [data, form]);

  const onFinish = async (values: any) => {
    if (content) {
      values["description"] = content;
    }
    onSubmit(values);
  };

  const handleAddMedia = (text: string) => {
    if (codemirror) {
      const { line, ch } = codemirror.getCursor();
      codemirror.replaceRange(text, { line: line, ch: ch })
      setContent(codemirror.getValue())
    }
  }

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

        <Form.Item label="Description" name="description">
          {/* <Input.TextArea aria-label="textarea-description" rows={6} placeholder="desciption" /> */}
          <SimpleMDE
            data-testid="text-area"
            onChange={setContent}
            value={content}
            options={{
              previewRender(text) {
                return ReactDOMServer.renderToString(
                  <PostDetailContent content={text} />
                )
              },
              toolbar: ["bold", "italic", "heading", "|", "quote", "code", "table", "|", "preview", "side-by-side", "fullscreen", {
                name: "custom",
                action: async function customFunction(editor) {
                  await new Promise((resolve) => {
                    setCodeMirror(editor.codemirror)
                    resolve();
                  })
                  setMediaModalVisible(true)
                },
                className: "fa fa-image",
                title: "Add media",
              }],
            }}
          />

        </Form.Item>
        <MediaModal
          handleAddMedia={handleAddMedia}
          visible={mediaModalVisible}
          setVisible={setMediaModalVisible}
        />

        <Form.Item>
          <Button aria-label="form-submit" type="primary" htmlType="submit" className="login-form-button">
            Submit
        </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AboutMeForm;
