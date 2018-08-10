import React, { Component } from "react";
import styles from "./style.less";
import { Table, message, Button, Modal, List } from "antd";
import { queryAlarmDevices, queryDeviceBySn } from "services/dashboard";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const ListItem = List.Item;
const ListItemMeta = ListItem.Meta;

class AlarmList extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: "设备sn",
        dataIndex: "sn",
        className: styles.center,
        key: "sn"
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
        title: "设备类型",
        dataIndex: "type",
        className: styles.center,
        key: "type"
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
        const info = resData.data.rows[0].datDeviceDetailDTO; // 固定属性
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
            deviceDetailMetas.push({
              key: item.attributeDesc,
              title: item.attributeName,
              description: item.attributeValue
            });
          });
        }

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

  showModal() {
    this.setState({ visible: true });
  }

  hideModal() {
    this.setState({
      visible: false,
      deviceInfo: ""
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
        <Modal
          visible={this.state.visible}
          onCancel={() => this.setState({ visible: false })}
          footer={false}
        >
          <List
            style={{ margin: 20 }}
            header={
              <div style={{ fontSize: 18, fontWeight: 600 }}>
                《{this.state.deviceDetailInfo.name}
                》的详细信息
              </div>
            }
            bordered
            dataSource={this.state.deviceDetailInfo.deviceDetailMetas}
            renderItem={item => (
              <ListItem>
                <ListItemMeta
                  title={item.title}
                  description={item.description}
                />
              </ListItem>
            )}
          />
        </Modal>
      </div>
    );
  }
}

AlarmList.propTypes = {
  history: PropTypes.object
};

export default withRouter(AlarmList);
