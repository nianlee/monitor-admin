import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import { routerRedux } from "dva/router";
import styles from "../style.less";

const columns = [
  {
    title: "设备sn",
    dataIndex: "sn",
    className: styles.center,
    key: "sn"
  },
  {
    title: "设备预警信息",
    dataIndex: "alarmInfo",
    className: styles.center,
    key: "alarmInfo"
  },
  {
    title: "预警开始时间",
    dataIndex: "alarmStartTime",
    className: styles.center,
    key: "alarmStartTime"
  },
  {
    title: "预警结束时间",
    dataIndex: "alarmEndTime",
    className: styles.center,
    key: "alarmEndTime"
  }
];
const Alarm = ({ dashboard, dispatch }) => {
  const goMore = () => {
    dispatch(routerRedux.push("/alarmlist"));
  };

  const renderFooter = () => {
    return (
      <a className={styles.more} onClick={goMore}>
        查看更多
      </a>
    );
  };

  const renderTitle = () => {
    return <span className={styles.tableTitle}>报警设备列表</span>;
  };

  return (
    <div className={styles.tableWrapper}>
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
