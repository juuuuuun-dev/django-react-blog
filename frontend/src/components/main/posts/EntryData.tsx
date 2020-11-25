import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

import {
    ClockCircleOutlined, FolderOpenOutlined, SyncOutlined, TagOutlined
} from '@ant-design/icons';

import { MainContext } from '../../../context/mainContext';
import { EntryDataProps } from '../../../types/posts';

const EntryData: React.FC<EntryDataProps> = ({ post, showUpdateAt, showCategory, showTag }) => {
  const [{ dateFormat }] = React.useContext(MainContext);
  return React.useMemo(() => {
    return (
      <ul className="entry-data">
        <li className="entry-data__item">
          <time itemProp="datePublished" dateTime={post.created_at}><ClockCircleOutlined />{moment(post.created_at).format(dateFormat)}</time>
          {post.updated_at && showUpdateAt && <time itemProp="dateModified" style={{ marginLeft: 10 }} dateTime={post.updated_at}><SyncOutlined />{moment(post.updated_at).format(dateFormat)}</time>}
          {showCategory && <Link style={{ marginLeft: 10 }} to={`/categories/${post.category.slug}`}><FolderOpenOutlined />{post.category.name}</Link>}
        </li>
        {showTag && <li className="entry-data__item"><TagOutlined />
          {post.tag.map((value, index) => {
            return <Link style={{ marginRight: 10 }} to={`/tags/${value.slug}`} key={index}>{value.name}</Link>
          })}
        </li>
        }
      </ul>
    )
  }, [dateFormat, post, showUpdateAt, showCategory, showTag])

}

export default EntryData;