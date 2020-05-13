import React from 'react';
import { Popover, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AdminContext } from '../../context/adminContext';
import { useLogout } from '../../service/admin/auth';

export default () => {
  const [{ username, thumb }] = React.useContext(AdminContext);
  const [logout] = useLogout();
  return React.useMemo(() => {
    return (
      <Popover content={<div style={{ cursor: "pointer" }} onClick={() => logout()}>Logout</div>} placement="bottom" trigger="click">
        <div className="username">
          <Avatar size="small" src={thumb} icon={<UserOutlined />} />
          <span className="username__text">{username}</span>
        </div>
      </Popover>
    )
  }, [thumb, username, logout]);
}