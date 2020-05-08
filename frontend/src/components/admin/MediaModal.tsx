import React from "react"
import { Input, Pagination, Modal, Popover, Spin, Button } from 'antd';
import { list } from '../../service/admin/media';
import { AdminContext } from '../../context/adminContext';
import { IMediaList, IMediaListResult } from '../../types/media'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons'

interface IProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  visible: boolean;
  setVisible: (bool: boolean) => void;
  target: any;
}
const MediaModal: React.FC<IProps> = ({ content, setContent, visible, setVisible, target }) => {
  const { Search } = Input;
  const { state } = React.useContext(AdminContext);
  const [data, setData] = React.useState<IMediaList | undefined>();
  const [page, setPage] = React.useState<number>(1);
  const [search, setSearch] = React.useState<string | undefined>();
  const [load, setLoad] = React.useState<boolean>(false);

  const fetchData = React.useCallback(async () => {
    setLoad(true);
    try {
      const res = await list({ page, search });
      setData(res.data);
    } catch {
      console.log("error")
    }
    setLoad(false)
  }, [page, search]);

  React.useEffect(() => {
    if (visible) fetchData();
  }, [fetchData, visible, page, search])

  const handlePageChange = (page: number, pageSize?: number | undefined): void => {
    setPage(page);
  }

  const handleAdd = (value: IMediaListResult): void => {
    console.log("handleAdd");
    const start = target.textAreaRef.selectionStart;
    const text = `![${value.name}](${value.file})`;
    const newContent = content.substr(0, start) + text + content.substr(start);
    setContent(newContent);
    setVisible(false);
  }

  const handleClose = () => {
    setVisible(false);
  }

  const handlePreview = (imageUrl: string) => {
    window.open(imageUrl, "imgwindow")
  }


  return (
    <Modal
      title="Media"
      className="media-modal"
      width={"90%"}
      visible={visible}
      footer={null}
      onCancel={() => handleClose()}
    >
      <Search
        style={{ marginBottom: 15 }}
        placeholder="input search text"
        onSearch={value => setSearch(value)}
        enterButton
        allowClear
      />
      <Spin spinning={load}>
        <div className="media-thumbs clearfix">
          {data?.results.map((value, index) => {
            return <div className="media-thumbs__item" key={index}>
              <Popover title={value.name} content={
                <>
                  <Button data-testid="add-media-code-btn" style={{ marginRight: 10 }} shape="circle" onClick={() => handleAdd(value)} icon={<PlusOutlined />} size="middle" />
                  <Button style={{ marginRight: 10 }} shape="circle" onClick={() => handlePreview(value.file)} icon={<EyeOutlined />} size="middle" />
                </>
              }>
                <LazyLoadImage data-testid={`media-list-${value.id}`} src={value.thumb} alt={value.name}></LazyLoadImage>
              </Popover>
            </div>
          })}
        </div>
      </Spin>
      <Pagination
        defaultCurrent={page}
        pageSize={state.pageSize}
        total={data?.count}
        onChange={handlePageChange}
      />
    </Modal>
  )

}


export default MediaModal;