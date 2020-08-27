import { Button, Input, Modal, Pagination, Popover, Spin } from 'antd';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { EyeOutlined, PlusOutlined } from '@ant-design/icons';

import toast from '../../components/common/toast';
import { AdminContext } from '../../context/adminContext';
import { list } from '../../service/admin/media';
import { MediaDetail, MediaList, MediaModalProps } from '../../types/media';

const MediaModal: React.FC<MediaModalProps> = ({ visible, setVisible, handleAddMedia }) => {
  const { Search } = Input;
  const [{ pageSize }] = React.useContext(AdminContext);
  const [data, setData] = React.useState<MediaList | undefined>();
  const [page, setPage] = React.useState<number>(1);
  const [search, setSearch] = React.useState<string | undefined>();
  const [load, setLoad] = React.useState<boolean>(false);

  const fetchData = React.useCallback(async () => {
    setLoad(true);
    try {
      const res = await list({ page, search });
      setData(res.data);
    } catch {
      toast({ type: 'ERROR' })
    }
    setLoad(false)
  }, [page, search]);

  React.useEffect(() => {
    if (visible) fetchData();
  }, [fetchData, visible, page, search])

  const handlePageChange = (page: number, pageSize?: number | undefined): void => {
    setPage(page);
  }

  const handleAdd = (value: MediaDetail): void => {
    // const text = `![${value.name}](${value.file})`;
    const text = `<img src="${value.file}" alt="${value.name}" width="${value.width}" height="${value.height}" loading="lazy">`
    handleAddMedia(text);

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
        <div className="media-thumbs clearfix" data-testid="media-modal">
          {data?.results.map((value, index) => {
            return <div className="media-thumbs__item" key={index}>
              <Popover title={value.name} content={
                <>
                  <Button data-testid="add-media-code-btn" style={{ marginRight: 10 }} shape="circle" onClick={() => handleAdd(value)} icon={<PlusOutlined />} size="middle" />
                  <Button style={{ marginRight: 10 }} shape="circle" onClick={() => handlePreview(value.file)} icon={<EyeOutlined />} size="middle" />
                </>
              }>
                <div data-testid={`media-list-${value.id}`}>
                  <LazyLoadImage src={value.thumb} alt={value.name}></LazyLoadImage>
                </div>
              </Popover>
            </div>
          })}
        </div>
      </Spin>
      <Pagination
        defaultCurrent={page}
        pageSize={pageSize}
        total={data?.count}
        onChange={handlePageChange}
      />
    </Modal>
  )

}


export default MediaModal;