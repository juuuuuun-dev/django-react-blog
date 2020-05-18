import React, { useState } from 'react';
import ReactDOMServer from "react-dom/server";
import { Form, Input, Button, Switch, Select } from 'antd';
import { PostFormProps } from '../../../types/posts';
import { CameraOutlined } from '@ant-design/icons';
import MediaModal from "../../admin/MediaModal";
import PostDetailContent from "../../../components/main/posts/PostDetailContent"
import { get } from 'local-storage';

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const PostForm: React.FC<PostFormProps> = ({ data, formItem, onSubmit, onChange, error }) => {
  const autoSaveId = String(data?.id) || "create-post";
  const contentRef = React.useRef(null);
  const { Option } = Select;
  const [form] = Form.useForm();
  // const [autoSaveId, setAutoSaveId] = useState<string>(String(data?.id) || "create-post");
  const [title, setTitle] = useState<string | undefined>(data?.title)
  const [isShow, setIsShow] = React.useState<boolean>(false)
  const [mediaModalVisible, setMediaModalVisible] = React.useState<boolean>(false)
  const [content, setContent] = React.useState<string>("");
  const [cursor, setCursor] = useState({})
  const [codemirror, setCodeMirror] = useState<any>();
  const triggerChange = (changedValue: any) => {
    if (onChange) {
      onChange({ title, isShow, ...data, ...changedValue });
    }
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const title = event.target.value;
    triggerChange({ title: title });
  }

  const onContentChange = (content: string): void => {
    setContent(content)
    triggerChange({ content: content });

  }

  React.useEffect(() => {
    if (data) {
      const autoSaveData = get('')
      console.log(String(data.id))
      // setAutoSaveId(`post-${String(data.id)}`)
      setContent(data.content)
      form.setFieldsValue(
        {
          title: data.title,
          content: data.content,
          is_show: data.is_show,
          category: data.category.id,
          tag: data.tag.map((value) => {
            return value.id
          })
        },
      );
      setIsShow(data.is_show || false)
    }
  }, [data, form]);
  const onFinish = async (values: any) => {
    values.content = content;
    onSubmit(values)
  };
  const setMillor = async (val: any) => {

  }
  const handleAddMedia = (text: string) => {
    console.log("handleAddMedia")
    if (codemirror) {
      console.log("あるy")
      console.log({ codemirror })
      const { line, ch } = codemirror.getCursor();
      codemirror.replaceRange(text, { line: line, ch: ch })
      onContentChange(codemirror.getValue())
    } else {
      console.log('ないよ')
    }
  }

  return (
    <>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        name="post"
        // fields={fields}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Title"
          name="title"
          validateStatus={error && error.title ? "error" : "success"}
          help={error && error.title ? "This title already exists" : null}
          rules={[{ required: true, message: 'Please input title' }]}
        >

          <Input
            onChange={onTitleChange}
            aria-label="input-title"
            placeholder="Title" />
        </Form.Item>
        <Button
          style={{ marginBottom: 10 }}
          size="small"
          data-testid="add-media-btn"
          icon={<CameraOutlined />}
          onClick={() => setMediaModalVisible(true)}
        >
          Add Media
        </Button>
        <Form.Item
          label="Content"
        // name="content"
        // rules={[{ required: true, message: 'Please input content' }]}
        >
          <SimpleMDE
            ref={contentRef}
            onChange={onContentChange}
            value={content}
            options={{
              previewRender(text) {
                return ReactDOMServer.renderToString(
                  <PostDetailContent content={text} />
                )
              },
              toolbar: ["bold", "italic", "heading", "|", "quote", {
                name: "custom",
                action: async function customFunction(editor) {
                  await new Promise((resolve) => {
                    setCodeMirror(editor.codemirror)
                    resolve();
                  })
                  // await setCodeMirror(editor.codemirror)
                  setCursor(editor.codemirror.getCursor());
                  setMediaModalVisible(true)
                },
                className: "fa fa-image",
                title: "Custom Button",
              }],
            }}
          />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please select category' }]}
        >
          <Select
            showSearch
            aria-label="select-category"
            style={{ width: 200 }}
            placeholder="Select a category"
            optionFilterProp="children"
            filterOption={(input, option) => {
              if (option) {
                return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              return false
            }}
          >
            {formItem?.categories?.map((value, index) => {
              return <Option aria-label={`option-category-${value.id}`} key={index} value={value.id}>{value.name}</Option>
            })}

          </Select>
        </Form.Item>
        <Form.Item
          label="Tag"
          name="tag"
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            aria-label="select-tag"
          >
            {formItem?.tags.map((value, index) => {
              return <Option aria-label={`option-tag-${value.id}`} key={index} value={value.id}>{value.name}</Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Show"
          name="is_show"
        >
          <Switch data-testid="switch-is_show" checked={isShow} onClick={() => setIsShow(isShow !== true)} />
        </Form.Item>

        <Form.Item colon={false}>
          <Button aria-label="form-submit" type="primary" htmlType="submit" className="login-form-button">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {mediaModalVisible &&
        <MediaModal
          handleAddMedia={handleAddMedia}
          visible={mediaModalVisible}
          setVisible={setMediaModalVisible}
        />
      }
    </>
  );
};

export default PostForm;
