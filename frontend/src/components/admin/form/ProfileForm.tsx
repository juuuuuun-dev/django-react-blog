import { Button, Form, Input, Modal, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import React from 'react';

import { DeleteOutlined, EyeOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import toast from '../../../components/common/toast';
import { getBase64 } from '../../../helper/file';
import { ProfileFormProps } from '../../../types/profile';

// import ImgCrop from 'antd-img-crop';


const ProfileForm: React.FC<ProfileFormProps> = (props) => {
  const { data, onSubmit } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [previewVisible, setPreviewVisible] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<File | undefined>();
  const [removeFile, setRemoveFile] = React.useState<boolean>(false)
  const [showModal, setShowModal] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (data) {
      setImageUrl(data.avator);
      form.setFieldsValue({
        public_name: data.public_name,
        message: data.message,
        url: data.url,
      });
    }
  }, [data, form]);

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
        setRemoveFile(false);
        setImageUrl(imageUrl);
      });
      // cropp用
      // setFile(new File([file], file.name))
    }
    return false;
  }
  const onFinish = async (values: any) => {
    if (!imageUrl) {
      setRemoveFile(true);
      return false;
    }
    values.avator = file;
    onSubmit(values);
  };

  const handleChange = (info: any) => {
    setFile(info.file)
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log("done")
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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 18 }}
        name="public_profile"
        className="login-form"
        form={form}
        onFinish={onFinish}
      >
        {/* <Form.Item label="username" name="username" rules={[{ required: true, message: 'Please input your username' }]}>
        <Input data-testid="input-username" placeholder="username" />
      </Form.Item> */}
        <Form.Item label="Public name" name="public_name" rules={[{ required: true, message: 'Please input your username' }]}>
          <Input aria-label="input-public_name" placeholder="public name" />
        </Form.Item>
        <Form.Item
          label="Avator"
          validateStatus={file ? "success" : "error"}
          help={removeFile ? "Please selected file" : null}
        >
          {/* <ImgCrop rotate > */}
          <Upload
            name="avator"
            listType="picture-card"
            className="file-uploader"
            aria-label="input-avator"
            showUploadList={false}
            beforeUpload={beforeUpload}
            // onPreview={handlePreview}
            onChange={handleChange}
            onRemove={handleRemove}
          >
            {imageUrl ? <><img src={imageUrl} alt="avatar" style={{ width: '100%' }} /></> : uploadButton}
          </Upload>
          {/* </ImgCrop> */}
          {imageUrl ? <><EyeOutlined style={{ marginRight: "10px" }} aria-label="image-preview" onClick={() => handlePreview()} /><DeleteOutlined aria-label="delete-image" onClick={handleRemove} /></> : <></>}

        </Form.Item>
        <Form.Item label="Url" name="url" rules={[{ required: false, message: '' }]}>
          <Input aria-label="input-url" placeholder="url" />
        </Form.Item>
        <Form.Item label="Message" name="message" rules={[{ required: false, message: 'requreid email' }]}>
          <Input.TextArea aria-label="textarea-message" rows={6} placeholder="message" />
        </Form.Item>

        <Form.Item>
          <Button disabled={!props.isStaff} aria-label="form-submit" type="primary" htmlType="submit" className="login-form-button">
            Submit
        </Button>
        </Form.Item>
      </Form>
      <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img data-testid="preview-modal" alt="preview" style={{ width: '100%' }} src={imageUrl} />
      </Modal>
      <Modal visible={showModal} onCancel={() => setShowModal(false)} footer={null}>
        <img data-testid="cropp-image" src={imageUrl} alt="preview" style={{ maxWidth: '100%' }} />
      </Modal>
    </>
  );
};

export default ProfileForm;
