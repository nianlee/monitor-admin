import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import styles from "../style.less";
//import { routerRedux } from "dva/router";
//import { queryDeviceBySn } from "services/dashboard";
//import { formatState } from "utils";

const ReportTable = ({ report, dispatch, queryAlarmHis, updateState }) => {
  /*const viewDetail = payload => {
    queryDeviceBySn(payload).then(resData => {
      if (resData.success) {
        const info = formatState(resData.data.rows[0].datDeviceDetailDTO); // 固定属性
        const deviceDetailInfo = {
          name: info.name,
          deviceDetailMetas: []
        };

        const deviceDetailMetas = deviceDetailInfo.deviceDetailMetas;

        deviceDetailMetas.push({
          key: "设备名称",
          title: "设备名称",
          description: info.name
        });

        deviceDetailMetas.push({
          key: "mac",
          title: "mac",
          description: info.mac
        });

        deviceDetailMetas.push({
          key: "设备类型",
          title: "设备类型",
          description: info.type
        });

        deviceDetailMetas.push({
          key: "设备状态",
          title: "设备状态",
          description: info.state
        });

        deviceDetailMetas.push({
          key: "硬件版本",
          title: "硬件版本",
          description: info.hardwareVersion
        });

        deviceDetailMetas.push({
          key: "设备地址",
          title: "设备地址",
          description: info.detailAddr
        });

        // 动态属性
        const deviceDynamicDTOS = resData.data.rows[0].deviceDynamicDTOS;
        if (deviceDynamicDTOS) {
          deviceDynamicDTOS.forEach(item => {
            item = formatState(item);
            deviceDetailMetas.push({
              key: item.attributeDesc,
              title: item.attributeName,
              description: item.attributeValue
            });
          });
        }

        const newDeviceDetailMetas = [];
        const length = deviceDetailMetas.length;
        let child = [];

        // 分割数组，每三个元素为一个子元素
        deviceDetailMetas.forEach((item, index) => {
          if (index % 3 === 0) {
            child.push(item);
            if (index == length - 1) {
              // 如果是最后一个元素，添加进去
              newDeviceDetailMetas.push(child);
            }
          }
          if (index % 3 === 1) {
            child.push(item);
            if (index == length - 1) {
              newDeviceDetailMetas.push(child);
            }
          }
          if (index % 3 === 2) {
            child.push(item);
            newDeviceDetailMetas.push(child);
            child = [];
          }
        });

        deviceDetailInfo.deviceDetailMetas = newDeviceDetailMetas;

        updateState({ deviceDetailInfo, deviceModalVisible: true });
      } else {
        message.error(resData.message);
      }
    });
  };*/

  const renderOperation = (text, record) => {
    return (
      <div>

      </div>
    );
  };

  const columns = [
    {
      title: "设备编码",
      dataIndex: "deviceCode",
      className: styles.center,
      key: "deviceCode"
    },
    {
      title: "报警类型",
      dataIndex: "alarmCategoryName",
      className: styles.center,
      key: "alarmCategoryName"
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
  queryAlarmHis: PropTypes.func,
  updateState: PropTypes.func
};

export default ReportTable;

/**
 *
 <a
 onClick={() => viewDetail({ deviceSn: record.sn })}
 style={{ marginLeft: 8 }}
 >
 详细信息
 </a>

 <a
 onClick={() => dispatch(routerRedux.push(`/gis/${record.sn}`))}
 style={{ marginLeft: 8 }}
 >
 查看地图位置
 </a>
 */
