import React, { Component } from "react";
import styles from "./style.less";
import { Table, message, Button, Modal, Input } from "antd";
import { queryAlarmDevices } from "services/dashboard";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const InputGroup = Input.Group;

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
        title: "设备状态",
        dataIndex: "state",
        className: styles.center,
        key: "state",
        render: (text, record) => {
          if (record.state == 1) {
            return "在线";
          } else if (record.state == 0) {
            return "离线";
          } else {
            return "故障";
          }
        }
      },
      {
        title: "操作",
        dataIndex: "操作",
        className: styles.center,
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
      deviceInfo: "",
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
          href="javascript:;"
          onClick={() => this.goMap(record.sn)}
          style={{ marginLeft: 8 }}
        >
          位置
        </a>

        <a
          href="javascript:;"
          onClick={() => this.checkDevice(text, record)}
          style={{ marginLeft: 8 }}
        >
          查看
        </a>
      </div>
    );
  }

  goMap(id) {
    this.props.history.push("/gis/" + id);
  }

  checkDevice(t, info) {
    this.setState({
      deviceInfo: info
    });

    setTimeout(() => {
      this.setState({
        visible: true
      });
    }, 2000);
  }

  paginationChange(pagination) {
    queryAlarmDevices({
      page: pagination.current,
      rows: pagination.pageSize
    }).then(res => {
      if (res.success) {
        const alarmList = res.data.rows.map(item => {
          item.key = item.id;
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
    this.setState({
      visible: true
    });
  }

  hideModal() {
    this.setState({
      visible: false,
      deviceInfo: ""
    });
  }

  render() {
    const renderTitle = () => {
      return <span className={styles.tableTitle}>警告列表</span>;
    };

    return (
      <div className="alarm">
        <Table
          bordered
          columns={this.columns}
          dataSource={this.state.alarmList}
          pagination={this.state.pagination}
          title={renderTitle}
          onChange={this.paginationChange.bind(this)}
        />
        <Modal
          width={800}
          height={500}
          visible={this.state.visible}
          title="设备详情"
          okText="确认"
          cancelText="取消"
          onOk={this.hideModal.bind(this)}
          onCancel={this.hideModal.bind(this)}
        >
          <InputGroup>
            <div>
              <label>sn 码</label>
              <Input
                className={styles.InputWrapper}
                value={this.state.deviceInfo.sn}
                disabled={true}
              />
            </div>

            <div>
              <label>设备 名称</label>
              <Input
                className={styles.InputWrapper}
                value={this.state.deviceInfo.name}
                disabled={true}
              />
            </div>

            <div>
              <label>设备 类型</label>
              <Input
                className={styles.InputWrapper}
                value={this.state.deviceInfo.type}
                disabled={true}
              />
            </div>

            <div>
              <label>设备安装时间</label>
              <Input
                className={styles.InputWrapper}
                value={this.state.deviceInfo.install_time}
                disabled={true}
              />
            </div>

            <div>
              <label>设备安装地址</label>
              <Input
                className={styles.InputWrapper}
                value={this.state.deviceInfo.detail_addr}
                disabled={true}
              />
            </div>

            <div>
              <label>预警开始时间</label>
              <Input
                className={styles.InputWrapper}
                value={this.state.deviceInfo.alarm_start_time}
                disabled={true}
              />
            </div>
          </InputGroup>
        </Modal>
        <Button
          type="primary"
          onClick={this.onBack.bind(this)}
          className={styles.backButton}
        >
          返回
        </Button>
      </div>
    );
  }
}

AlarmList.propTypes = {
  history: PropTypes.object
};

export default withRouter(AlarmList);
