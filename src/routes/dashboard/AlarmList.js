import React, { Component } from "react";
import styles from "./style.less";
import { Table, message, Button } from "antd";
import { queryAlarmDevices, queryDeviceBySn } from "services/dashboard";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { formatState, formateDynamic } from "utils";
import DeviceDetail from "components/device-detail";

class AlarmList extends Component {
  constructor(props) {
    super(props);

    this.columns = [
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
      },
      {
        title: "操作",
        dataIndex: "操作",
        className: styles.center,
        width: "20%",
        render: (text, record) => this.renderOperation(text, record)
      }
    ];

    this.state = {
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共${total}条数据`
      },
      alarmList: [],
      deviceDetailInfo: {},
      visible: false
    };

    this.paginationChange(this.state.pagination);
  }

  onBack() {
    const { history } = this.props;
    history.push("/dashboard");
  }

  renderOperation(text, record) {
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
  }

  goMap(id) {
    this.props.history.push("/gis/" + id);
  }

  viewDetail(t, info) {
    queryDeviceBySn({ deviceSn: info.sn }).then(resData => {
      if (resData.success) {
        const info = formatState(resData.data.rows[0].datDeviceDetailDTO); // 固定属性

        const deviceDetailInfo = {
          name: info.name,
          baseInfo: [],
          statusInfo: [],
          dynamicInfo: []
        };

        const baseInfo = deviceDetailInfo.baseInfo;

        baseInfo.push({
          key: "设备编码",
          label: "设备编码",
          value: info.code
        });

        baseInfo.push({
          key: "mac",
          label: "mac",
          value: info.mac
        });

        baseInfo.push({
          key: "设备类型",
          label: "设备类型",
          value: info.type
        });

        baseInfo.push({
          key: "固件版本",
          label: "固件版本",
          value: info.firmwareVersion
        });

        baseInfo.push({
          key: "硬件版本",
          label: "硬件版本",
          value: info.hardwareVersion
        });

        baseInfo.push({
          key: "设备状态",
          label: "设备状态",
          value: info.state
        });

        baseInfo.push({
          key: "安装地址",
          label: "安装地址",
          value: (info.installAreaInfo && info.installAreaInfo.allName) || ""
        });
        baseInfo.push({
          key: "更新时间",
          label: "安装地址",
          value: info.dataUpTime
        });

        // 动态属性
        const deviceDynamicDTOS = resData.data.rows[0].deviceDynamicDTOS;
        const dynamicInfo = [];
        const statusInfo = [];

        if (deviceDynamicDTOS) {
          deviceDynamicDTOS.forEach(item => {
            item = formateDynamic(item);

            // 状态信息
            if (
              item.attributeCode == "ACInput" ||
              item.attributeCode == "leakageState" ||
              item.attributeCode == "DI1" ||
              item.attributeCode == "incline" ||
              item.attributeCode == "DI2"
            ) {
              statusInfo.push({
                key: item.attributeCode,
                label: item.attributeName,
                value: item.attributeValue
              });
            } else {
              // 动态信息
              dynamicInfo.push({
                key: item.attributeCode,
                label: item.attributeName,
                value: item.attributeValue
              });
            }
          });
        }

        deviceDetailInfo.statusInfo = statusInfo;
        deviceDetailInfo.dynamicInfo = dynamicInfo;

        this.setState({ deviceDetailInfo, visible: true });
      } else {
        message.error(resData.message);
      }
    });
  }

  paginationChange(pagination) {
    queryAlarmDevices({
      page: pagination.current,
      rows: pagination.pageSize
    }).then(res => {
      if (res.success) {
        const alarmList = res.data.rows.map(item => {
          item.key = item.id + Math.random(1);
          return item;
        });

        this.setState({
          pagination: {
            ...pagination,
            total: res.data.total
          },
          alarmList
        });
      } else {
        message.error(res.message);
      }
    });
  }

  render() {
    const renderTitle = () => {
      return (
        <div>
          <span className={styles.alarmListTableTitle}>报警设备列表</span>
          <Button
            type="primary"
            onClick={this.onBack.bind(this)}
            className={styles.backButton}
          >
            返回首页
          </Button>
        </div>
      );
    };

    return (
      <div style={{ background: "#fff" }}>
        <Table
          bordered
          columns={this.columns}
          dataSource={this.state.alarmList}
          pagination={this.state.pagination}
          title={renderTitle}
          onChange={this.paginationChange.bind(this)}
        />

        <DeviceDetail
          visible={this.state.visible}
          detailInfo={this.state.deviceDetailInfo}
          closeFun={() => {
            this.setState({ visible: false });
          }}
        />
      </div>
    );
  }
}

AlarmList.propTypes = {
  history: PropTypes.object
};

export default withRouter(AlarmList);
