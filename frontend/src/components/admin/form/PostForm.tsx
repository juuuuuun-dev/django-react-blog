import React from 'react';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import { Form, Input, Button, Switch, Checkbox, Select } from 'antd';
import { IPostData, IPostFormItem } from '../../../types/posts';
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});
interface IProps {
  data?: IPostData;
  formItem?: IPostFormItem;
  onSubmit: (values: any) => Promise<void>;
  error?: {
    title?: Array<string>
  }
}
const PostForm: React.FC<IProps> = ({ data, formItem, onSubmit, error }) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [isShow, setIsShow] = React.useState<boolean>(false)
  React.useEffect(() => {
    if (data) {
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
  }, [data]);
  console.log({ isShow })
  const onFinish = async (values: any) => {
    onSubmit(values)
  };
  const [content, setContent] = React.useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">("write");
  return (
    <Form
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 14 }}
      name="tag"
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
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: 'Please input content' }]}
      >
        <ReactMde
          value={content}
          onChange={setContent}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
        {/* <Input.TextArea rows={16} placeholder="Content" /> */}
      </Form.Item>
      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select category' }]}
      >
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a person"
          optionFilterProp="children"
          filterOption={(input, option) => {
            if (option) {
              return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            return false
          }}
        >
          {formItem?.categories?.map((value, index) => {
            return <Option key={index} value={value.id}>{value.name}</Option>
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
          defaultValue={[]}
        >
          {formItem?.tags.map((value, index) => {
            return <Option key={index} value={value.id}>{value.name}</Option>
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label="Show"
        name="is_show"
      >
        <Switch checked={isShow} onClick={() => setIsShow(isShow != true)} />
      </Form.Item>

      <Form.Item colon={false}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
