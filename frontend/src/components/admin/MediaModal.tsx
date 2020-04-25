import React from "react"
import { Input, Pagination, Modal, Popover, Spin, Button } from 'antd';
import { list } from '../../service/admin/media';
import { AdminContext } from '../../context/adminContext';
import { IMediaList, IMediaListResult } from '../../types/media'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { EyeOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons'

interface IProps {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  target: any;
}
const MediaModal: React.FC<IProps> = ({ visible, setVisible, target }) => {
  const { Search } = Input;
  const { state } = React.useContext(AdminContext);
  const [data, setData] = React.useState<IMediaList | undefined>();
  const [page, setPage] = React.useState<number>(1);
  const [search, setSearch] = React.useState<string | undefined>();
  const [load, setLoad] = React.useState<boolean>(false);
  console.log({ data });
  React.useEffect(() => {
    if (visible) {
      console.log("effect")
      fetchData();
    }
  }, [visible, page, search])

  const fetchData = async () => {
    setLoad(true);
    try {
      const res = await list({ page, search });
      setData(res.data);
    } catch {
      console.log("error")
    }
    setLoad(false)
  };

  const handleClick = (value: IMediaListResult) => {

  }

  const handlePageChange = (page: number, pageSize?: number | undefined): void => {
    setPage(page);
  }

  const PopContent: React.FC = () => {
    return (
      <>
        <Button style={{ marginRight: 10 }} shape="circle" onClick={() => console.log("click")} icon={<PlusOutlined />} size="middle" />
        <Button style={{ marginRight: 10 }} shape="circle" onClick={() => console.log("click")} icon={<EyeOutlined />} size="middle" />
        {/* <Button shape="circle" onClick={() => console.log("click")} icon={<CloseOutlined />} size="middle" /> */}

      </>
    )
  }

  return (
    <Modal
      title="Media"
      className="media-modal"
      width={"90%"}
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
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
              <Popover title={value.name} content={PopContent}>
                <LazyLoadImage onClick={() => handleClick(value)} src={value.thumb} alt={value.name}></LazyLoadImage>
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