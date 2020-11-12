import { Button, Form, Input, Modal, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import React from 'react';

import { DeleteOutlined, EyeOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import toast from '../../../components/common/toast';
import { getBase64 } from '../../../helper/file';
import { SiteSettingsFormProps } from '../../../types/siteSettings';

const SiteSettingForm: React.FC<SiteSettingsFormProps> = (props) => {
  const { data, config, onSubmit } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [logoUrl, setLogoUrl] = React.useState<string>('');
  const [previewVisible, setPreviewVisible] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<File | undefined>();
  const [removeFile, setRemoveFile] = React.useState<boolean>(false)
  const [showModal, setShowModal] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (data) {
      if (data.logo) {
        setLogoUrl(data.logo);
      }
      form.setFieldsValue({
        name: data.name,
        description: data.description,
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
        setLogoUrl(imageUrl);
      });
      // cropp用
      // setFile(new File([file], file.name))
    }
    return false;
  }
  const onFinish = async (values: any) => {
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
    setLogoUrl('')
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
        name="siteSettings"
        className="login-form"
        form={form}
        onFinish={onFinish}
      >
        {/* <Form.Item label="username" name="username" rules={[{ required: true, message: 'Please input your username' }]}>
        <Input data-testid="input-username" placeholder="username" />
      </Form.Item> */}
        <Form.Item label="Site name" name="name" rules={[{ required: true, message: 'Please input your username' }]}>
          <Input aria-label="input-name" placeholder="Site name" />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: false, message: 'requreid description' }]}>
          <Input.TextArea aria-label="textarea-description" rows={6} placeholder="description" />
        </Form.Item>

        <Form.Item
          label="Logo"
          validateStatus={file ? "success" : "error"}
          help={removeFile ? "Please selected file" : null}
        >
          <Upload
            name="logo"
            listType="picture-card"
            className="file-uploader"
            aria-label="input-logo"
            showUploadList={false}
            beforeUpload={beforeUpload}
            // onPreview={handlePreview}
            onChange={handleChange}
            onRemove={handleRemove}
          >
            {logoUrl ? <><img src={logoUrl} alt="logo" style={{ width: '100%' }} /></> : uploadButton}
          </Upload>
          {/* </ImgCrop> */}
          {logoUrl ? <><EyeOutlined style={{ marginRight: "10px" }} aria-label="image-preview" onClick={() => handlePreview()} /><DeleteOutlined aria-label="delete-image" onClick={handleRemove} /></> : <></>}
        </Form.Item>

        <Form.Item>
          <Button aria-label="form-submit" type="primary" htmlType="submit" className="login-form-button">
            Submit
        </Button>
        </Form.Item>
      </Form>
      <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img data-testid="preview-modal" alt="preview" style={{ width: '100%' }} src={logoUrl} />
      </Modal>
      <Modal visible={showModal} onCancel={() => setShowModal(false)} footer={null}>
        <img data-testid="cropp-image" src={logoUrl} alt="preview" style={{ maxWidth: '100%' }} />
      </Modal>
    </>
  );
};

export default SiteSettingForm;
