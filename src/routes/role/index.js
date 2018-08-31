import React from "react";
import PropTypes from "prop-types";
import { routerRedux } from "dva/router";
import { Table, Popconfirm } from "antd";
import { connect } from "dva";

import styles from "./style.less";

const Role = ({ role, dispatch }) => {
  const columns = [
    {
      title: "角色名称",
      dataIndex: "roleName",
      className: [styles.center],
      key: "roleName"
    },
    {
      title: "角色描述",
      dataIndex: "roleDesc",
      className: [styles.center],
      key: "roleDesc"
    },
    {
      title: "状态",
      className: [styles.center],
      dataIndex: "roleState",
      key: "roleState"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      className: [styles.center],
      key: "createDate"
    },
    {
      title: "操作",
      dataIndex: "opertor",
      className: [styles.center],
      key: "opertor",
      // eslint-disable-next-line
      render: (text, record) => {
        return (
          <div>
            <a onClick={() => update(record)} className={styles.title}>
              修改
            </a>
            <Popconfirm
              title={`您确认删除【${record.roleName}】吗？`}
              onConfirm={() => deletes(record)}
            >
              <a className={styles.title}>删除</a>
            </Popconfirm>
          </div>
        );
      }
    }
  ];

  const update = record => {
    dispatch(routerRedux.push(`/manage/role/2/${record.id}`));
  };

  const deletes = record => {
    dispatch({ type: "role/deleteRole", payload: { id: record.id } });
  };

  function handleTableChange(pagination) {
    dispatch({ type: "users/updatePagination", payload: pagination });
    dispatch({
      type: "users/queryUserList",
      payload: {
        page: pagination.current,
        rows: pagination.pageSize
      }
    });
  }

  return (
    <div className="role">
      <Table
        bordered
        columns={columns}
        dataSource={role.roleList}
        pagination={role.pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

Role.propTypes = {
  role: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ role }) => ({ role }))(Role);

/*
 const add = () => {
    dispatch(routerRedux.push(`/manage/role/1`));
  };
  <a onClick={add} className={styles.title}>
    新增
  </a>
 */
