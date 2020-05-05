import React from 'react';
import { Form, Input, Button, Upload, Modal } from 'antd';
import { IMediaData } from '../../../types/media';
import { RcFile } from 'antd/lib/upload';
import { LoadingOutlined, PlusOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import toast from '../../../components/common/toast';
import { getBase64 } from '../../../helper/file';

interface IProps {
  data?: IMediaData;
  onSubmit: (values: any) => Promise<void>;
  error?: {
    name?: Array<string>,
    file?: Array<string>,
  }
}
const MediaForm: React.FC<IProps> = ({ data, onSubmit, error }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [previewVisible, setPreviewVisible] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<File | undefined>();
  const [removeFile, setRemoveFile] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (data) {
      setImageUrl(data.file);
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
      // move getBase64
      getBase64(file, (imageUrl: string) => {
        setLoading(true);
        setRemoveFile(false);
        setImageUrl(imageUrl);
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
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log("done")
      // getBase64(info.file.originFileObj, (imageUrl: string) => {
      //   setLoading(true);
      //   setImageUrl(imageUrl);
      // });
    }
  };

  const handlePreview = () => {
    setPreviewVisible(true);
  }

  const handleRemove = async (file: any) => {
    setImageUrl('')
    setFile(undefined);
    setLoading(false);
    setRemoveFile(true);
  }


  return (
    <>
      <Form
        labelCol={{ span: 3 }}
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
          // name="file"
          validateStatus={file ? "success" : "error"}
          help={removeFile ? "Please selected file" : null}
        // rules={[{ required: true, message: 'Please selected file' }]}
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
          <Button aria-label="media-form-submit" type="primary" htmlType="submit" className="login-form-button">
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