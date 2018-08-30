import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import { routerRedux } from "dva/router";
import styles from "../style.less";

const columns = [
  {
    title: "设备编码",
    dataIndex: "code",
    className: styles.center,
    key: "code"
  },
  {
    title: "设备预警信息",
    dataIndex: "alarm_info",
    className: styles.center,
    key: "alarm_info"
  },
  {
    title: "预警开始时间",
    dataIndex: "alarm_start_time",
    className: styles.center,
    key: "alarm_start_time"
  },
  {
    title: "安装地址",
    dataIndex: "detailAddr",
    className: styles.center,
    key: "detailAddr"
  }
];
const Alarm = ({ dashboard, dispatch }) => {
  const onMore = () => {
    dispatch(routerRedux.push("/alarmlist"));
  };

  const renderFooter = () => {
    return (
      <a className={styles.more} onClick={onMore}>
        查看更多
      </a>
    );
  };

  const renderTitle = () => {
    return <span>报警设备列表</span>;
  };

  return (
    <div style={{ background: "#fff" }}>
      <Table
        bordered
        columns={columns}
        dataSource={dashboard.alarmList}
        pagination={false}
        title={renderTitle}
        footer={renderFooter}
      />
    </div>
  );
};

Alarm.propTypes = {
  dashboard: PropTypes.object,
  dispatch: PropTypes.func
};

export default Alarm;
