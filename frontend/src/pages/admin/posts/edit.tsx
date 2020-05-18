import React, { useState, Suspense } from 'react';
import { retrieve, update, destroy } from '../../../service/admin/posts';
import { AdminContext } from '../../../context/adminContext';
import Form from '../../../components/admin/form/PostForm'
import { PostDetail, PostFormItem } from '../../../types/posts';
import toast from '../../../components/common/toast';
import { useHistory, useParams } from 'react-router-dom';
import DeleteBtn from '../../../components/admin/DeleteBtn';
import { Row, Col, Button, Switch } from 'antd';
import PostPreview from '../../../components/admin/PostPreview';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';


const Edit: React.FC = () => {
  const [state, dispatch] = React.useContext(AdminContext);
  const [data, setData] = useState<PostDetail | undefined>();
  const [formItem, setFormItem] = useState<PostFormItem | undefined>();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [cover, setCover] = useState<string>('');
  const [error, setError] = useState({})
  const [editorSpan, setEditorSpan] = useState<number>(12);
  const [previewSpan, setPreviewSpan] = useState<number>(12);
  const { id } = useParams();
  const history = useHistory();
  const redirectPath = "/admin/posts";

  const fetchData = React.useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const res = await retrieve(id);
      setData(res.data.post);
      setTitle(res.data.post.title);
      setContent(res.data.post.content);
      setCover(res.data.post.title);
      setFormItem({ categories: res.data.categories, tags: res.data.tags });
    } catch (e) {
      toast({ type: 'ERROR' });
    }

    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
  }, [dispatch, id]);

  React.useEffect(() => {
    if (state.hasToken) fetchData();
  }, [fetchData, state.hasToken]);


  // edit
  const onSubmit = async (values: any) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const data = {
        id: values.id,
        title: values.title,
        content: values.content,
        is_show: values.is_show,
        category: values.category,
        tag: values.tag,
      };
      const res = await update(id, data);
      if (res.status === 200) {
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
        toast({ type: 'SUCCESS' });
        history.push(redirectPath);
      }
    } catch (e) {
      if (e.response.data) {
        setError(e.response.data)
      }
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      toast({ type: 'ERROR' });
    }
  }
  // delete
  const onDelete = async () => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const res = await destroy(id);
      if (res.status === 204) {
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
        toast({ type: 'DELETE' });
        history.push(redirectPath);
      }
    } catch {
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      toast({ type: 'ERROR' });
    }
  }

  const onChange = (value: any) => {
    setTitle(value.title)
    setContent(value.content)
  }

  const getSpanSize = (editor: number, preview: number) => {

  }

  return (
    <>
      <div style={{ marginBottom: 15 }}>
        <Switch size="small" style={{ marginRight: 10 }} checkedChildren={<EditOutlined />} unCheckedChildren={<EditOutlined />} onClick={() => setEditorSpan(editorSpan === 12 ? 0 : 12)} defaultChecked />
        <Switch size="small" checkedChildren={<EyeOutlined />} unCheckedChildren={<EyeOutlined />} onClick={() => setPreviewSpan(previewSpan === 12 ? 0 : 12)} defaultChecked />
      </div>
      <DeleteBtn onDelete={onDelete} />
      <Row gutter={[30, 20]}>
        <Col span={previewSpan === 0 && editorSpan !== 0 ? 24 : editorSpan}>
          <Suspense fallback={<h1>Loading profile...</h1>}>
            <Form data={data} onChange={onChange} formItem={formItem} onSubmit={onSubmit} error={error} />
          </Suspense>
        </Col>
        <Col span={editorSpan === 0 && previewSpan !== 0 ? 24 : previewSpan}>
          <PostPreview title={title} content={content} cover={cover} />
        </Col>
      </Row>
    </>
  );
};

export default Edit;
