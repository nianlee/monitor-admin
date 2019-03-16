import React from "react";
import PropTypes from "prop-types";
import styles from "../style.less";
import { Button, Input, message,Tag } from "antd";

import { refreshData, stopRefreshData } from "utils";

const EquipmentSummary = ({ dashboard, dispatch }) => {
  const inspector = () => {
    dispatch({ type: "dashboard/batchInspectionDevices" }).then(runToken => {
      if (runToken) {
        stopRefreshData();

        if (dashboard.inspectionTimer) {
          clearInterval(dashboard.inspectionTimer);
        }

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
          type: "dashboard/queryDevices",
          payload: { page: "1", rows: "10" }
        });


      }
    });
  };

  const setRefreshTime = () => {
    const value = Number(dashboard.inspectionTime)
    if (Number.isNaN(value)) {
      message.error('巡检时间为数字')
      return
    }
    if (!value) {
      message.error('请输入巡检时间')
      return
    }
    message.success('设置成功');

    if (dashboard.inspectionOpenTimer) {
      clearInterval(dashboard.inspectionOpenTimer)
    }

    const timer = setInterval(() => {
      inspector()
    }, value * 60 * 1000)

    dispatch({
      type: "dashboard/save",
      payload: {
        inspectionOpenTimer: timer
      }
    })
  }

  const stopRefreshTime = () => {

    if (dashboard.inspectionOpenTimer) {
      clearInterval(dashboard.inspectionOpenTimer) //直接停止循环
    }
  }

  const inspectionHandle = e => {
    dispatch({
      type: "dashboard/save",
      payload: {
        inspectionTime: e.target.value
      }
    })
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
        <Input placeholder="设定巡检时间" value={dashboard.inspectionTime} style={{ width: 120, height:30 }} onChange={e => inspectionHandle(e)} />
        <Tag style={{height:30}}>分钟</Tag>
        <Button
          style={{ width: 100, marginLeft: 5 }}
          type="primary"
          onClick={setRefreshTime}
        >
          定时巡检
        </Button>

        <Button
          style={{ width: 100, marginLeft: 5 }}
          type="primary"
          onClick={stopRefreshTime}
        >
          停止巡检
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
