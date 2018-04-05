import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Layout } from 'antd'
import { Link } from 'react-router-dom'
import styles from './style.less'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
const Header = Layout.Header

const MHeader = ({
  app,
}) => {

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

  return (
    <Header>
      <div className={styles.logo}>智能物联远程设备监控系统</div>
      <div className={styles.user}>用户信息</div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px', borderBottom: 'none' }}
      >
        {renderMenu()}
      </Menu>
    </Header>
  )
}

MHeader.propTypes = {
  app: PropTypes.object,
}

export default MHeader
