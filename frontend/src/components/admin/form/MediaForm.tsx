import { Button, Form, Input, Modal, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import React from 'react';

import { DeleteOutlined, EyeOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import toast from '../../../components/common/toast';
import { getBase64 } from '../../../helper/file';
import { MediaFormProps } from '../../../types/media';

const MediaForm: React.FC<MediaFormProps> = ({ data, onSubmit, isStaff, error }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [previewVisible, setPreviewVisible] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<File | undefined>();
  const [removeFile, setRemoveFile] = React.useState<boolean>(false)
  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);

  React.useEffect(() => {
    if (data) {
      setImageUrl(data.file);
      setHeight(data.height);
      setWidth(data.width);
      form.setFieldsValue(
        {
          name: data.name,
          file: null,
        },
      );
    }
  }, [data, form]);
  const onFinish = async (values: any) => {
    if (!imageUrl) {
      setRemoveFile(true);
      return false;
    }
    values.file = file;
    values.width = width;
    values.height = height;
    onSubmit(values)
  };
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
      getBase64(file, (imageUrl: string, image: HTMLImageElement) => {
        setLoading(true);
        setRemoveFile(false);
        setImageUrl(imageUrl);
        if (image) {
          setWidth(image.width);
          setHeight(image.height);
        }
      });
    }
    return false;
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const handleChange = (info: any) => {
    setFile(info.file)
  };

  const handlePreview = () => {
    setPreviewVisible(true);
  }

  const handleRemove = async (file: any) => {
    setImageUrl('')
    setHeight(0);
    setWidth(0);
    setFile(undefined);
    setLoading(false);
    setRemoveFile(true);
  }


  return (
    <>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 14 }}
        name="media"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          validateStatus={error && error.name ? "error" : "success"}
          help={error && error.name ? "This name already exists" : null}
          rules={[{ required: true, message: 'Please input name' }]}
        >
          <Input aria-label="media-form-name" placeholder="Name" />
        </Form.Item>

        <Form.Item
          label="File"
          validateStatus={file ? "success" : "error"}
          help={removeFile ? "Please selected file" : null}
        >
          <Upload
            name="file"
            listType="picture-card"
            className="file-uploader"
            aria-label="media-form-file"
            showUploadList={false}
            beforeUpload={beforeUpload}
            // onPreview={handlePreview}
            onChange={handleChange}
            onRemove={handleRemove}
          >
            {imageUrl ? <><img src={imageUrl} alt="avatar" style={{ width: '100%' }} /></> : uploadButton}
          </Upload>
          {imageUrl ? <><EyeOutlined style={{ marginRight: "10px" }} aria-label="media-form-preview" onClick={() => handlePreview()} /><DeleteOutlined aria-label="media-form-delete-image" onClick={handleRemove} /></> : <></>}
        </Form.Item>

        <Form.Item colon={false}>
          <Button disabled={!isStaff} aria-label="media-form-submit" type="primary" htmlType="submit" className="login-form-button">
            Submit
        </Button>
        </Form.Item>
      </Form>
      <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img data-testid="media-preview-modal" alt="preview" style={{ width: '100%' }} src={imageUrl} />
      </Modal>
    </>
  );
};

export default MediaForm;