import React from "react";
import PropTypes from "prop-types";
import styles from "../style.less";
import {Button, Input} from "antd";

import { refreshData, stopRefreshData } from "utils";

const EquipmentSummary = ({ dashboard, dispatch }) => {
  const inspector = () => {
    dispatch({ type: "dashboard/batchInspectionDevices" }).then(runToken => {
      if (runToken) {
        stopRefreshData();

        const inspectionTimer = setInterval(() => {
          dispatch({
            type: "dashboard/queryBatchInspectionDevicesProgress",
            payload: { runToken }
          }).then(progress => {
            if (progress == "finish") {
              refreshData(dispatch, true);
            }
          });
        }, 3000);

        dispatch({
          type: "dashboard/save",
          payload: { inspectionTimer }
        });

        // 巡检完毕过后在刷新一次设备列表
        dispatch({
          type: "queryDevices",
          payload: { page: "1", rows: "10" }
        });

      }
    });
  };

  const setRefreshTime = () => {
    dispatch({
      type: "queryDevices",
      payload: { page: "1", rows: "10" }
    });
  }

  return (
    <div className={styles.summaryWrapper}>
      <div className={styles.item}>
        <p className={styles.summaryTitle}>设备总数</p>
        <p className={styles.number}>{dashboard.TotalCount}</p>
      </div>
      <div className={styles.item}>
        <p className={styles.summaryTitle}>设备正常数</p>
        <p className={styles.number}>{dashboard.OnlineCount}</p>
      </div>
      <div className={styles.item}>
        <p className={styles.summaryTitle}>设备故障数</p>
        <p className={styles.number}>{dashboard.AlarmCount}</p>
      </div>
      <div className={styles.item}>
        <p className={styles.summaryTitle}>设备正常率</p>
        <p className={styles.number}>
          {(dashboard.OnlineRate * 100).toFixed(2)}%
        </p>
      </div>
      <div className={styles.item}>
        <p className={styles.summaryTitle}>设备故障率</p>
        <p className={styles.number}>
          {(dashboard.AlarmRate * 100).toFixed(2)}%
        </p>
      </div>
      <div className={styles.item}>
        <Button
          style={{ marginLeft: 25, marginTop: 5, width: 100 }}
          type="primary"
          loading={dashboard.inspectionLoading}
          onClick={inspector}
        >
          一键巡检
        </Button>
      </div>

      <div className={styles.summaryWrapper}>
        <Input placeholder="设定巡检时间" />
        <Button
          style={{width: 100,marginLeft: 5}}
          type="primary"
          onClick={setRefreshTime}
        >
          确定
        </Button>
      </div>
    </div>
  );
};

EquipmentSummary.propTypes = {
  dashboard: PropTypes.object,
  dispatch: PropTypes.func
};

export default EquipmentSummary;
