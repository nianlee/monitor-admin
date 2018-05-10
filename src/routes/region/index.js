import React from 'react'
import PropTypes from 'prop-types'
import { Tree, Menu, Dropdown, Icon, Popconfirm } from 'antd'
import { connect } from 'dva'

import styles from './style.less'

const TreeNode = Tree.TreeNode
const MenuItem = Menu.Item

const Region = ({ region, dispatch }) => {
  const handleMenuClick = key => {
    console.log(key)
  }

  const handleDelete = key => {
    console.log(key)
  }

  const operaterMenu = () => {
    return (
      <Menu onClick={ key => handleMenuClick(key) } style={{ width: 150 }}>
        <MenuItem key='add'>
          <a className={styles.menuA}>添加下级</a>
        </MenuItem>
        <MenuItem key='edit'>
          <a className={styles.menuA}>修改</a>
        </MenuItem>
        <MenuItem key='del'>
          <Popconfirm title="您确认要删除吗?" onConfirm={handleDelete} okText="确认" cancelText="取消">
            <a className={styles.menuA}>删除</a>
          </Popconfirm>
        </MenuItem>
      </Menu>
    )
  }

  const renderNodeTitle = (title) => {
    return <div className={styles.nodeTitle}>
        <span>{title}</span>
        <Dropdown overlay={operaterMenu()} placement="bottomRight">
          <span className={styles.editIcon}><Icon type="edit" /></span>
        </Dropdown>
      </div>
  }

  return (
    <div className={styles.container}>
      <Tree
        showLine
        defaultExpandedKeys={['0-0-0']}
        onSelect={this.onSelect}
        className="region"
      >
        <TreeNode title={renderNodeTitle('重庆市')} key="0-0">
          <TreeNode title={renderNodeTitle('万州区')} key="0-0-0">
            <TreeNode title={renderNodeTitle('1')} key="0-0-0-0" />
            <TreeNode title={renderNodeTitle('2')} key="0-0-0-1" />
            <TreeNode title={renderNodeTitle('3')} key="0-0-0-2" />
          </TreeNode>
          <TreeNode title={renderNodeTitle('渝中区')} key="0-0-1">
            <TreeNode title={renderNodeTitle('1')} key="0-0-1-0" />
          </TreeNode>
          <TreeNode title={renderNodeTitle('渝北区')} key="0-0-2">
            <TreeNode title={renderNodeTitle('1')} key="0-0-2-0" />
            <TreeNode title={renderNodeTitle('2')} key="0-0-2-1" />
          </TreeNode>
        </TreeNode>
      </Tree>
    </div>
  )
}

Region.propTypes = {
  region: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ region }) => ({ region }))(Region)
