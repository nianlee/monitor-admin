import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import styles from "../style.less";

const ReportTable = ({ loginlog, dispatch }) => {
  const columns = [
    {
      title: "用户名",
      dataIndex: "userName",
      className: [styles.center],
      key: "userName"
    },
    {
      title: "登录时间",
      dataIndex: "loginTime",
      className: [styles.center],
      key: "loginTime"
    },
    {
      title: "登录ip",
      dataIndex: "loginIp",
      className: [styles.center],
      key: "loginIp"
    }
  ];

  const paginationChange = pagination => {
    dispatch({
      type: "loginlog/queryLog",
      payload: {
        page: pagination.current,
        rows: pagination.pageSize,
        loginType: 1
      }
    });
  };

  return (
    <Table
      bordered
      dataSource={loginlog.userLogList}
      columns={columns}
      pagination={loginlog.pagination}
      onChange={paginationChange}
    />
  );
};

ReportTable.propTypes = {
  loginlog: PropTypes.object,
  dispatch: PropTypes.func
};

export default ReportTable;
