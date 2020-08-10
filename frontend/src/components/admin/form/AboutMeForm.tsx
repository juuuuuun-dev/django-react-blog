import { Button, Form, Input, Modal } from 'antd';
import React from 'react';

import { AboutMeFormProps } from '../../../types/aboutMe';

const AboutMeForm: React.FC<AboutMeFormProps> = (props) => {
  const { data, onSubmit } = props;
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [previewVisible, setPreviewVisible] = React.useState<boolean>(false);

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

  const onFinish = async (values: any) => {
    onSubmit(values);
  };

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

        <Form.Item label="Public name" name="public_name" rules={[{ required: true, message: 'Please input your username' }]}>
          <Input aria-label="input-public_name" placeholder="public name" />
        </Form.Item>

        <Form.Item label="Url" name="url" rules={[{ required: false, message: '' }]}>
          <Input aria-label="input-url" placeholder="url" />
        </Form.Item>
        <Form.Item label="Message" name="message" rules={[{ required: false, message: 'requreid email' }]}>
          <Input.TextArea aria-label="textarea-message" rows={6} placeholder="message" />
        </Form.Item>

        <Form.Item>
          <Button aria-label="form-submit" type="primary" htmlType="submit" className="login-form-button">
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

export default AboutMeForm;
