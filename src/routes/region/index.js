import React from "react";
import PropTypes from "prop-types";
import { Tree, Menu, Dropdown, Icon, Popconfirm } from "antd";
import { connect } from "dva";
import AddOrUpdate from "./components/AddOrUpdate";

import { queryAreaByParentCode } from "services/region";

import styles from "./style.less";

const TreeNode = Tree.TreeNode;
const MenuItem = Menu.Item;

const Region = ({ region, dispatch }) => {
  const handleMenuClick = (e, data) => {
    e.domEvent.stopPropagation();
    if (e.key === "edit") {
      handleEdit(data);
    } else if (e.key === "add") {
      handleAdd(data);
    } else {
      // 删除
      dispatch({ type: "region/updateState", payload: { selectedData: data } });
    }
  };

  const handleDelete = () => {
    dispatch({
      type: "region/delAreaByCode",
      payload: { code: region.selectedData.code }
    });
  };

  const handleAdd = data => {
    dispatch({
      type: "region/updateState",
      payload: {
        modalVisible: true,
        selectedData: data,
        operateType: "add"
      }
    });
  };

  const handleEdit = data => {
    dispatch({
      type: "region/updateState",
      payload: {
        modalVisible: true,
        selectedData: data,
        operateType: "edit"
      }
    });
  };

  const operaterMenu = data => {
    const isRoot = data.id === 0;
    return (
      <Menu onClick={key => handleMenuClick(key, data)} style={{ width: 150 }}>
        <MenuItem key="add">
          <a className={styles.menuA}>添加下级</a>
        </MenuItem>
        {!isRoot ? (
          <MenuItem key="edit">
            <a className={styles.menuA}>修改</a>
          </MenuItem>
        ) : (
          ""
        )}
        {!isRoot ? (
          <MenuItem key="del">
            <Popconfirm
              title={`您确认要删除【${data.name}】吗?`}
              onConfirm={handleDelete}
              okText="确认"
              cancelText="取消"
            >
              <a className={styles.menuA}>删除</a>
            </Popconfirm>
          </MenuItem>
        ) : (
          ""
        )}
      </Menu>
    );
  };

  const renderNodeTitle = data => {
    return (
      <div className={styles.nodeTitle}>
        <span>{data.name}</span>
        <Dropdown overlay={operaterMenu(data)} placement="bottomRight">
          <span className={styles.editIcon}>
            <Icon type="edit" />
          </span>
        </Dropdown>
      </div>
    );
  };

  const genTreeNode = treeData => {
    return treeData.map(item => {
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode
            title={renderNodeTitle(item)}
            key={item.code}
            isLeaf={!item.isParent}
            dataRef={item}
          >
            {genTreeNode(item.children)}
          </TreeNode>
        );
      } else {
        return (
          <TreeNode
            title={renderNodeTitle(item)}
            key={item.code}
            isLeaf={!item.isParent}
            dataRef={item}
          />
        );
      }
    });
  };

  const onLoadData = node => {
    return new Promise((resolve, reject) => {
      if (node.props.children) {
        resolve();
        return;
      }
      queryAreaByParentCode({ parentCode: node.props.eventKey })
        .then(res => {
          if (res.success) {
            node.props.dataRef.children = res.data;

            dispatch({
              type: "region/updateState",
              payload: { regionTreeData: [...region.regionTreeData] }
            });

            resolve();
          } else {
            reject(res.message);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  return (
    <div className={styles.container}>
      <Tree
        showLine
        defaultExpandedKeys={["0"]}
        className="region"
        loadData={onLoadData}
      >
        {genTreeNode(region.regionTreeData)}
      </Tree>
      <AddOrUpdate region={region} dispatch={dispatch} />
    </div>
  );
};

Region.propTypes = {
  region: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ region }) => ({ region }))(Region);
