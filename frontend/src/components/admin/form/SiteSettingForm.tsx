import { Button, Checkbox, Col, Form, Input, Modal, Row, Typography, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import React from 'react';

import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';

import toast from '../../../components/common/toast';
import { getBase64 } from '../../../helper/file';
import { SiteSettingsFormProps } from '../../../types/siteSettings';

const SiteSettingForm: React.FC<SiteSettingsFormProps> = (props) => {
  const { data, config, onSubmit } = props;
  const { Text } = Typography;
  const [form] = Form.useForm();
  const [logoUrl, setLogoUrl] = React.useState<string>('');
  const [mainImageUrl, setMainImageUrl] = React.useState<string>('');
  const [logoFile, setLogoFile] = React.useState<File | undefined>();
  const [mainImageFile, setMainImageFile] = React.useState<File | undefined>();
  const [previewVisible, setPreviewVisible] = React.useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = React.useState<string>('');
  const [deleteLogo, setDeleteLogo] = React.useState<boolean>(false);
  const [deleteMainImage, setDeleteMainImage] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (data) {
      if (data.logo) {
        setLogoUrl(data.logo);
      }
      if (data.main_image) {
        setMainImageUrl(data.main_image)
      }
      form.setFieldsValue({
        name: data.name,
        description: data.description,
      });
    }
  }, [data, form]);

  const beforeUploadLogo = (file: RcFile, FileList: RcFile[]) => {
    const isPng = file.type === 'image/png';
    if (!isPng) {
      toast({ type: 'ERROR', text: 'You can only upload PNG file!' })
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast({ type: 'ERROR', text: 'Image must smaller than 2MB!' })
    }
    if (isPng && isLt2M) {
      getBase64(file, (imageUrl: string) => {
        setLogoUrl(imageUrl);
      });
    }
    return false;
  }

  const beforeUploadMainImage = (file: RcFile, FileList: RcFile[]) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
    if (!isJpgOrPng) {
      toast({ type: 'ERROR', text: 'You can only upload PNG file!' })
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast({ type: 'ERROR', text: 'Image must smaller than 2MB!' })
    }
    if (isJpgOrPng && isLt2M) {
      getBase64(file, (imageUrl: string) => {
        setMainImageUrl(imageUrl);
      });
    }
    return false;
  }

  const onFinish = async (values: any) => {
    values.delete_logo = deleteLogo;
    values.delete_main_image = deleteMainImage;
    values.logo = logoFile;
    values.main_image = mainImageFile;
    onSubmit(values);
  };

  const handleChangeLogo = (info: any) => {
    setLogoFile(info.file)
    if (info.file.status === 'uploading') {
      return;
    }
  };

  const handleChangeMainImage = (info: any) => {
    setMainImageFile(info.file)
    if (info.file.status === 'uploading') {
      return;
    }
  };

  const handlePreview = ({ url }: { url: string }) => {
    setPreviewVisible(true);
    setPreviewUrl(url)
  }

  const handleRemove = async ({ type }: { type: string }) => {
    if (type === 'logo') {
      setLogoUrl('')
      setLogoFile(undefined);
    } else if (type === 'main_image') {
      setMainImageUrl('')
      setMainImageFile(undefined);
    }
  }


  const uploadButton = (
    <div>
      {<PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 18 }}
        name="siteSettings"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label="Site name" name="name" rules={[{ required: true, message: 'Please input your username' }]}>
          <Input aria-label="input-name" placeholder="Site name" />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: false, message: 'requreid description' }]}>
          <Input.TextArea aria-label="textarea-description" rows={6} placeholder="description" />
        </Form.Item>

        <Form.Item
          label="Logo"
          validateStatus={logoFile ? "success" : "error"}
        >

          <Text type="danger">Used for header and JSON-LD</Text><br /><span>w{config?.logo_size.width}px * h{config?.logo_size.height}px (transparent PNG)</span>
          <Row>
            <Col flex="100px">
              <Upload
                name="logo"
                listType="picture-card"
                className="file-uploader"
                aria-label="input-logo"
                showUploadList={false}
                beforeUpload={beforeUploadLogo}
                onChange={handleChangeLogo}
                onRemove={() => handleRemove({ type: 'logo' })}
              >
                {logoUrl ? <><img src={logoUrl} aria-label="logo-url" alt="logo" /></> : uploadButton}
              </Upload>
            </Col>

          </Row>
          {/* </ImgCrop> */}
          {logoUrl ? <><EyeOutlined style={{ marginRight: "10px" }} aria-label="image-preview" onClick={() => handlePreview({ url: logoUrl })} /><DeleteOutlined style={{ marginRight: "10px" }} aria-label="delete-logo-url" onClick={() => handleRemove({ type: 'logo' })} /></> : <></>}
          {data?.logo && <Checkbox aria-label="set-delete-logo" onClick={() => setDeleteLogo(!deleteLogo)}>Delete from server</Checkbox>}
        </Form.Item>

        <Form.Item
          label="Site main image"
          validateStatus={logoFile ? "success" : "error"}
        >
          <Text type="danger">Used for JSON-LD</Text><br /><span>w{config?.main_image_size.width}px * h{config?.main_image_size.height}px</span>
          <Upload
            name="main_image"
            listType="picture-card"
            className="file-uploader"
            aria-label="input-main-logo"
            showUploadList={false}
            beforeUpload={beforeUploadMainImage}
            onChange={handleChangeMainImage}
            onRemove={() => handleRemove({ type: 'main_image' })}
          >
            {mainImageUrl ? <><img src={mainImageUrl} aria-label="main-image-url" alt="main_image" /></> : uploadButton}
          </Upload>
          {/* </ImgCrop> */}
          {mainImageUrl ? <><EyeOutlined style={{ marginRight: "10px" }} aria-label="image-preview" onClick={() => handlePreview({ url: mainImageUrl })} /><DeleteOutlined style={{ marginRight: "10px" }} aria-label="delete-main-image-url" onClick={() => handleRemove({ type: 'main_image' })} /></> : <></>}
          {data?.main_image && <Checkbox aria-label="set-delete-main-image" onClick={() => setDeleteMainImage(!deleteMainImage)}>Delete from server</Checkbox>}
        </Form.Item>

        <Form.Item>
          <Button aria-label="form-submit" type="primary" htmlType="submit" className="login-form-button">
            Submit
        </Button>
        </Form.Item>
      </Form>
      <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img data-testid="preview-modal" alt="preview" style={{ width: '100%' }} src={previewUrl} />
      </Modal>
    </>
  );
};

export default SiteSettingForm;
