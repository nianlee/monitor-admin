import React, { Component } from "react";
import { Row, message } from "antd";
import { queryAlarmResultHis } from "services/dashboard";

import ReportTable from "./components/ReportTable";
import ReportForm from "./components/ReportForm";

import styles from "./style.less";

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceHisList: [], // 预警设备历史数据
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共${total}条数据`
      }
    };

    this.queryAlarmHis({
      page: this.state.pagination.current,
      rows: this.state.pagination.pageSize
    });
  }

  queryAlarmHis(params) {
    queryAlarmResultHis(params).then(res => {
      if (res.success) {
        const deviceHisList = res.data.rows.map(item => {
          item.key = item.id + Math.random(1);
          return item;
        });

        this.setState({
          pagination: {
            ...this.state.pagination,
            total: res.data.total
          },
          deviceHisList
        });
      } else {
        message.error(res.message);
      }
    });
  }

  updateState(payload) {
    this.setState(payload);
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Row className={styles.searchWrapper}>
          <ReportForm
            dispatch={payload => this.updateState(payload)}
            report={this.state}
          />
        </Row>
        <Row className={styles.tableWrapper}>
          <ReportTable
            dispatch={payload => this.updateState(payload)}
            queryAlarmHis={params => this.queryAlarmHis(params)}
            report={this.state}
          />
        </Row>
      </div>
    );
  }
}

export default Report;
