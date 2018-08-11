import React, { Component } from "react";
import { connect } from "dva";
import { Row, message } from "antd";
import { queryAlarmResultHis } from "services/dashboard";
import PropTypes from "prop-types";

import ReportTable from "./components/ReportTable";
import ReportForm from "./components/ReportForm";
import DetailModal from "./components/DetailModal";

import styles from "./style.less";

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceHisList: [], // 预警设备历史数据
      queryParamsCache: {}, // 查询参数缓存
      deviceModalVisible: false, // 详情modal visible
      deviceDetailInfo: {}, // 设备详情

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
    const data = { ...this.state.queryParamsCache, ...params }; // 添加缓存参数

    queryAlarmResultHis(data).then(res => {
      if (res.success) {
        const deviceHisList = res.data.rows.map(item => {
          item.key = item.id + Math.random(1);
          return item;
        });

        this.setState({
          deviceHisList,
          pagination: {
            ...this.state.pagination,
            current: res.data.curPage,
            total: res.data.total
          },
          queryParamsCache: data // 更新缓存参数
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
          <ReportForm queryAlarmHis={params => this.queryAlarmHis(params)} />
        </Row>
        <Row className={styles.tableWrapper}>
          <ReportTable
            queryAlarmHis={params => this.queryAlarmHis(params)}
            dispatch={this.props.dispatch}
            report={this.state}
            updateState={payload => this.updateState(payload)}
          />
        </Row>

        <DetailModal
          report={this.state}
          updateState={payload => this.updateState(payload)}
        />
      </div>
    );
  }
}

Report.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(Report);
