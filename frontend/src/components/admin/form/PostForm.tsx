import 'easymde/dist/easymde.min.css';

import { Button, Col, Form, Image, Input, Row, Select, Switch, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import SimpleMDE from 'react-simplemde-editor';

import {
    DeleteOutlined, EditOutlined, EyeOutlined, LoadingOutlined, PlusOutlined
} from '@ant-design/icons';

import PostPreview from '../../../components/admin/PostPreview';
import toast from '../../../components/common/toast';
import { getBase64 } from '../../../helper/file';
import { MediaDetail } from '../../../types/media';
import { PostFormProps } from '../../../types/posts';
import MediaModal from '../../admin/MediaModal';
import MarkdownContent from '../../common/MarkdownContent';

const PostForm: React.FC<PostFormProps> = ({ data, formItem, onSubmit, error }) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [title, setTitle] = useState<string>('')
  const [isShow, setIsShow] = React.useState<boolean>(false)
  const [mediaModalVisible, setMediaModalVisible] = React.useState<boolean>(false)
  const [content, setContent] = React.useState<string>("");
  const [codemirror, setCodeMirror] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [file, setFile] = React.useState<File | undefined>();
  const [editorSpan, setEditorSpan] = useState<number>(12);
  const [previewSpan, setPreviewSpan] = useState<number>(12);
  const [mediaModalType, setMediaModalType] = useState<'cover' | 'content'>('cover');

  React.useEffect(() => {
    if (data) {
      setContent(data.content)
      setTitle(data.title)
      setImageUrl(data.cover)
      form.setFieldsValue(
        {
          title: data.title,
          slug: data.slug,
          content: data.content,
          is_show: data.is_show || false,
          category: data.category,
          tag: data.tag,
        },
      );
      setIsShow(data.is_show || false)
    }
  }, [data, form, formItem]);

  const onFinish = async (values: any) => {
    values.is_show = isShow;
    values.content = content;
    // values.cover = file;
    if (file) {
      values.cover = imageUrl;
    }
    onSubmit(values)
  };

  const handleAddMedia = (value: MediaDetail) => {
    if (mediaModalType === 'content') {
      const text = `<img src="${value.file}" alt="${value.name}" width="${value.width}" height="${value.height}" loading="lazy">`
      if (codemirror) {
        const { line, ch } = codemirror.getCursor();
        codemirror.replaceRange(text, { line: line, ch: ch })
        setContent(codemirror.getValue())
      }
    }
    // @TODO cover image
    if (mediaModalType === 'cover') {
      console.log("coverdayo")
    }

  }

  const beforeUpload = (file: RcFile, FileList: RcFile[]) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
    if (!isJpgOrPng) {
      toast({ type: 'ERROR', text: 'You can only upload JPG/PNG file!' })
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast({ type: 'ERROR', text: 'Image must smaller than 2MB!' })
    }
    if (isJpgOrPng && isLt2M) {
      getBase64(file, (imageUrl: string) => {
        setLoading(true);
        setImageUrl(imageUrl);
      });
      // cropp
      // setFile(new File([file], file.name))
    }
    return false;
  }

  const handleCoverChange = (info: any) => {
    setFile(info.file)
  };

  const handleCoverSelect = () => {
    setMediaModalType('cover');
    setMediaModalVisible(true)
  }

  const handleCoverRemove = async (file: any) => {
    setImageUrl('')
    setFile(undefined);
    setLoading(false);
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <>
      <div style={{ marginBottom: 15 }}>
        <Switch size="small" data-testid="switch-editor" style={{ marginRight: 10 }} checkedChildren={<EditOutlined />} unCheckedChildren={<EditOutlined />} onClick={() => setEditorSpan(editorSpan === 12 ? 0 : 12)} defaultChecked />
        <Switch size="small" data-testid="switch-preview" checkedChildren={<EyeOutlined />} unCheckedChildren={<EyeOutlined />} onClick={() => setPreviewSpan(previewSpan === 12 ? 0 : 12)} defaultChecked />
      </div>
      <Row gutter={[30, 20]}>
        {editorSpan ? <Col data-testid="col-editor" span={previewSpan === 0 && editorSpan !== 0 ? 24 : editorSpan}>
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
              help={error && error.title ? error.title[0] : null}
              rules={[{ required: true, message: 'Please input title' }]}
            >
              <Input
                onChange={(e) => setTitle(e.target.value)}
                aria-label="input-title"
                placeholder="Title" />
            </Form.Item>

            <Form.Item
              label="slug"
              extra="Used for url. If you change it, the URL will change"
              name="slug"
              validateStatus={error && error.slug ? "error" : "success"}
              help={error && error.slug ? error.slug[0] : null}
              rules={[
                { required: true, message: 'Please input slug' },
                { pattern: new RegExp("^[a-z0-9_-]*$"), message: 'The slug must contain only lowercase letters, numbers, and hyphens/underscores.' },
              ]}
            >
              <Input aria-label="input-slug" placeholder="Used for url" />
            </Form.Item>

            <Form.Item
              label="Cover"
            // validateStatus={error && error.coer ? "error" : "success"}
            // help={error && error.title ? "This title already exists" : null}
            // rules={[{ required: true, message: 'Please input title' }]}
            >
              <Image
                width={160}
                height={160}
                src="error"
                fallback="data:image/png;base64,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"
              />
              <Button
                style={{
                  marginLeft: 10,
                }}
                onClick={handleCoverSelect}
              >
                Select cover image
              </Button>
              <Upload
                name="cover"
                listType="picture-card"
                className="file-uploader"
                aria-label="input-cover"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleCoverChange}
                onRemove={handleCoverRemove}
              >
                {imageUrl ? <><img src={imageUrl} alt="avatar" style={{ width: '100%' }} /></> : uploadButton}
              </Upload>
              {/* </ImgCrop> */}
              {imageUrl ? <><DeleteOutlined aria-label="delete-cover" onClick={handleCoverRemove} /></> : <></>}
            </Form.Item>
            <Form.Item
              label="Content"
            // name="content"
            // rules={[{ required: true, message: 'Please input content' }]}
            >
              <SimpleMDE
                data-testid="text-area"
                onChange={setContent}
                value={content}
                options={{
                  previewRender(text) {
                    return ReactDOMServer.renderToString(
                      <MarkdownContent content={text} />
                    )
                  },
                  toolbar: ["bold", "italic", "heading", "|", "quote", "code", "table", "|", "preview", "side-by-side", "fullscreen", {
                    name: "custom",
                    action: async function customFunction(editor) {
                      await new Promise((resolve) => {
                        setCodeMirror(editor.codemirror)
                        resolve();
                      })
                      setMediaModalType('content');
                      setMediaModalVisible(true)
                    },
                    className: "fa fa-image",
                    title: "Add media",

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
                // optionLabelProp="label"
                filterOption={(input, option) => {
                  if (option) {
                    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  return false
                }}
              >
                {formItem?.categories?.map((value, index) => {
                  return <Option label={value.name} aria-label={`option-category-${value.id}`} key={index} value={value.id}>{value.name}</Option>
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
                  return <Option label={value.name} aria-label={`option-tag-${value.id}`} key={index} value={value.id}>{value.name}</Option>
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Show"
              name="is_show"
            >
              <Switch data-testid="switch-is_show" checkedChildren="show" unCheckedChildren="show" checked={isShow} onClick={() => setIsShow(isShow !== true)} />
            </Form.Item>

            <Form.Item colon={false}>
              <Button aria-label="form-submit" type="primary" htmlType="submit" className="login-form-button">
                Submit
          </Button>
            </Form.Item>
          </Form>
        </Col> : null}
        {previewSpan ? <Col data-testid="col-preview" span={editorSpan === 0 && previewSpan !== 0 ? 24 : previewSpan}>
          <PostPreview title={title} content={content} cover={imageUrl} />
        </Col> : null}
      </Row>
      {
        mediaModalVisible &&
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
