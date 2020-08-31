import { Button, Form, Input } from 'antd';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import SimpleMDE from 'react-simplemde-editor';

import { AboutMeFormProps } from '../../../types/aboutMe';
import { MediaDetail } from '../../../types/media';
import MediaModal from '../../admin/MediaModal';
import PostDetailContent from '../../common/MarkdownContent';

const AboutMeForm: React.FC<AboutMeFormProps> = (props) => {
  const { data, onSubmit } = props;
  const [form] = Form.useForm();
  const [content, setContent] = React.useState<string>("");
  const [codemirror, setCodeMirror] = React.useState<any>();
  const [mediaModalVisible, setMediaModalVisible] = React.useState<boolean>(false)

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

  const handleAddMedia = (value: MediaDetail) => {
    const text = `<img src="${value.file}" alt="${value.name}" width="${value.width}" height="${value.height}" loading="lazy">`
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

        <Form.Item label="content" name="content">
          {/* <Input.TextArea aria-label="textarea-content" rows={6} placeholder="desciption" /> */}
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
