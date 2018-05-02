import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Layout, Dropdown, Icon } from 'antd'
import { Link } from 'react-router-dom'
import styles from './style.less'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
const Header = Layout.Header

const MHeader = ({
  app,
  location,
}) => {

  const getSelectedKeys = menu => {
    if (!menu) {
      return []
    }
    const selectedKeys = []
    const firstLevel = menu.find(item => item.route === location.pathname)
    if (firstLevel) {
      selectedKeys.push(firstLevel.id.toString())
      return selectedKeys
    } 
    return selectedKeys
  }

  const userMenu = (
    <Menu style={{ lineHeight: '64px', borderBottom: 'none' }}>
      <MenuItem>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">详细信息</a>
      </MenuItem>
      <MenuItem>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">修改信息</a>
      </MenuItem>
      <MenuItem>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">退出</a>
      </MenuItem>
    </Menu>
  );
  


  const renderMenu = () => {
    const genMenuItem = (data) => {
      return data.map(item => {
        return <MenuItem key={item.id}><Link to={item.route}>{item.name}</Link></MenuItem>
      })
    }

    return app.menu.map(item => {
      if (item.children) {
        return <SubMenu key={item.id} title={item.name}>{genMenuItem(item.children)}</SubMenu>
      }
      return <MenuItem key={item.id}><Link to={item.route}>{item.name}</Link></MenuItem>
    })
  }

  const selectedKeys = getSelectedKeys(app.menu)

  return (
    <Header>
      <div className={styles.logo}>智能物联远程设备监控系统</div>
      <div className={styles.user}>
        <Dropdown overlay={userMenu}>
          <a>
            {app.user.name}<Icon type="down" />
          </a>
        </Dropdown>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        selectedKeys={selectedKeys}
        style={{ lineHeight: '64px', borderBottom: 'none' }}
      >
        {renderMenu()}
      </Menu>
    </Header>
  )
}

MHeader.propTypes = {
  app: PropTypes.object,
  location: PropTypes.object,
}

export default MHeader
