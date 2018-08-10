import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import styles from "../style.less";

// import { routerRedux } from "dva/router";

const ReportTable = ({ report, dispatch, queryAlarmHis }) => {
  const renderOperation = (text, record) => {
    return (
      <div>
        <a
          onClick={() => this.viewDetail(text, record)}
          style={{ marginLeft: 8 }}
        >
          详细信息
        </a>

        <a onClick={() => this.goMap(record.sn)} style={{ marginLeft: 8 }}>
          查看地图位置
        </a>
      </div>
    );
  };

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
    },
    {
      title: "操作",
      dataIndex: "操作",
      className: styles.center,
      width: "20%",
      render: (text, record) => renderOperation(text, record)
    }
  ];

  const paginationChange = pagination => {
    queryAlarmHis({
      page: pagination.current,
      rows: pagination.pageSize
    });
  };

  return (
    <Table
      bordered
      dataSource={report.deviceHisList}
      columns={columns}
      pagination={report.pagination}
      onChange={paginationChange}
    />
  );
};

ReportTable.propTypes = {
  report: PropTypes.object,
  dispatch: PropTypes.func,
  queryAlarmHis: PropTypes.func
};

export default ReportTable;
