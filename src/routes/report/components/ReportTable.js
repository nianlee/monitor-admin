import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import styles from "../style.less";
import { routerRedux } from "dva/router";

const ReportTable = ({ report, dispatch }) => {
  const dataSource = [];

  for (let i = 0; i <= 100; i++) {
    dataSource.push({
      key: i.toString(),
      sn: `设备编号${i}`,
      name: `设备名称${i}`,
      state: `设备状态${i}`,
      type: `设备类型${i}`,
      allAreaId: `区域${i}`,
      detailAddr: `详细地址${i}`,
      carrierOperator: `运营商${i}`,
      manufacturer: `厂商${i}`,
      createTime: `创建时间${i}`
    });
  }

  const columns = [
    {
      title: "设备编号",
      dataIndex: "sn",
      className: styles.center,
      key: "sn"
    },
    {
      title: "设备名称",
      dataIndex: "name",
      className: styles.center,
      key: "name"
    },
    {
      title: "设备状态",
      dataIndex: "state",
      className: styles.center,
      key: "state"
    },
    {
      title: "设备类型",
      className: styles.center,
      dataIndex: "type",
      key: "type"
    },
    {
      title: "区域",
      dataIndex: "allAreaId",
      className: styles.center,
      key: "allAreaId"
    },
    {
      title: "详细地址",
      dataIndex: "detailAddr",
      className: styles.center,
      key: "detailAddr"
    },
    {
      title: "运营商",
      dataIndex: "carrierOperator",
      className: styles.center,
      key: "carrierOperator"
    },
    {
      title: "厂商",
      dataIndex: "manufacturer",
      className: styles.center,
      key: "manufacturer"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      className: styles.center,
      key: "createTime"
    },
    {
      title: "操作",
      dataIndex: "opertor",
      className: styles.center,
      key: "opertor",
      // eslint-disable-next-line
      render: (text, record) => (
        <a onClick={() => dispatch(routerRedux.push(`/gis/${record.sn}`))}>
          查看地图位置
        </a>
      )
    }
  ];

  return <Table bordered dataSource={dataSource} columns={columns} />;
};

ReportTable.propTypes = {
  report: PropTypes.object,
  dispatch: PropTypes.func
};

export default ReportTable;
