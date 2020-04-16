import React from 'react';
import { Form, Input, Button, Upload, Modal } from 'antd';
import { IMediaData } from '../../../types/media';
import { RcFile } from 'antd/lib/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import toast from '../../../components/common/toast';

const getBase64 = (img: any, callback?: any) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

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
      form.setFieldsValue(
        {
          name: data.name,
          path: data.path,
          file: null,
        },
      );
    }
  }, [data]);
  const onFinish = async (values: any) => {
    console.log({ values })
    // onSubmit(values)
  };
  // (file: RcFile, FileList: RcFile[]) => boolean | PromiseLike<void>) | undefined
  const beforeUpload = (file: RcFile, FileList: RcFile[]) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      // message.error('You can only upload JPG/PNG file!');
      toast({ type: 'ERROR', text: 'You can only upload JPG/PNG file!' })
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast({ type: 'ERROR', text: 'Image must smaller than 2MB!' })
    }
    console.log({ file })
    getBase64(file, (imageUrl: string) => {
      setLoading(true);
      setRemoveFile(false);
      setImageUrl(imageUrl);
    });
    return false;
    // setPreFile(file);
    // return isJpgOrPng && isLt2M;
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const handleChange = (info: any) => {
    console.log('handle');
    console.log({ info })

    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: string) => {
        setLoading(true);
        setImageUrl(imageUrl);
      });
    }
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      // file.preview = await getBase64(file.originFileObj);
      console.log('handlePreview')
      setPreviewVisible(true)
    }
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
        // fields={fields}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          validateStatus={error && error.name ? "error" : "success"}
          help={error && error.name ? "This name already exists" : null}
          rules={[{ required: true, message: 'Please input title' }]}
        >
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          label="File"
          name="file"
          validateStatus={file ? "success" : "error"}
          help={removeFile ? "Please selected file" : null}
          rules={[{ required: true, message: 'Please selected file' }]}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            beforeUpload={beforeUpload}
            onPreview={handlePreview}
            onChange={handleChange}
            onRemove={handleRemove}
          >
            {imageUrl ? null : uploadButton}
          </Upload>
        </Form.Item>


        <Form.Item colon={false}>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Submit
        </Button>
        </Form.Item>
      </Form>
      <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img alt="example" style={{ width: '100%' }} src={imageUrl} />
      </Modal>
    </>
  );
};

export default MediaForm;
