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

  const genTreeNode = treeData => {
    return treeData.map(item => {
      if (item.children.length > 0) {
        return <TreeNode title={renderNodeTitle(item.name)} key={item.id}>
          {genTreeNode(item.children)}
        </TreeNode>
      } else {
        return <TreeNode title={renderNodeTitle(item.name)} key={item.id} />
      }
    })
  }

  return (
    <div className={styles.container}>
      <Tree
        showLine
        defaultExpandedKeys={['0-0-0']}
        onSelect={this.onSelect}
        className="region"
      >
       {genTreeNode(region.regionTreeData)}
      </Tree>
    </div>
  )
}

Region.propTypes = {
  region: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ region }) => ({ region }))(Region)
