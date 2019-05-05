import React from "react";
import PropTypes from "prop-types";
import { Modal, Card, Row, Col } from "antd";
import Table from "./table";
import STable from "./STable";
import AlarmTable from "./AlarmTable";
//import SSTable from "./STable2";

// let dataSource = [];
// for (let i = 0; i < 30; i++) {
//   dataSource.push({
//     label: "label-" + i,
//     key: "key" + i,
//     value: "value" + i
//   });
// }

const DeviceDetail = ({ visible, detailInfo, closeFun,alarmInfo }) => {


  let statusInfos = detailInfo.statusInfo;
  let controlInfos = detailInfo.controlInfo;
  let alarmInfos = alarmInfo.alarmInfo;
  let dynamicInfo = [];

  if (detailInfo && detailInfo.dynamicInfo) {
    dynamicInfo = detailInfo.dynamicInfo.sort(
      (a, b) => a.key.localeCompare(
        b.key,
        'zh-Hans-CN',
        { sensitivity: 'accent' }
      )
    )
  }

  let stateInfo = [];
  if(statusInfos) {
    stateInfo = statusInfos.sort(
      (a,b) => a.key.localeCompare(
        b.key,
        'zh-Hans-CN',
        {sensitivity:'accent'}
      )
    )
  }


  let alarmInfoss = [];
  if(alarmInfos) {
    alarmInfoss = alarmInfos.sort(
      (a,b) => a.key.localeCompare(
        b.key,
        'zh-Hans-CN',
        {sensitivity:'accent'}
      )
    )
  }



  return (
    <Modal
      visible={visible}
      //title={`《${detailInfo.name}》的详细信息`}
      title="设备详细信息"
      width={900}
      onCancel={closeFun}
      footer={null}
    >
      <Row gutter={24}>
        <Col span={24}>
          <Card title="基本信息">
            <STable column={2} dataSource={detailInfo.baseInfo} />
          </Card>
        </Col>
      </Row>

      <div style={{ height: 10, width: "100%" }} />
      <Row gutter={24}>
        <Col span={24}>
          <Card title="状态信息">
            <Table column={6} dataSource={stateInfo} />
          </Card>
        </Col>
      </Row>

      <div style={{ height: 10, width: "100%" }} />
      <Row gutter={24}>
        <Col span={24}>
          <Card title="控制信息">
            <STable column={4} dataSource={controlInfos} />
          </Card>
        </Col>
      </Row>

      <div style={{ height: 10, width: "100%" }} />
      <Row gutter={24}>
        <Col span={24}>
          <Card title="模拟量信息">
            <Table column={3} dataSource={dynamicInfo} />
          </Card>
        </Col>
      </Row>

      <div style={{ height: 10, width: "100%" }} />
      <Row gutter={24}>
        <Col span={24}>
          <Card title="设备报警信息">
            <AlarmTable column={3} dataSource={alarmInfoss} />
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

DeviceDetail.propTypes = {
  visible: PropTypes.bool,
  detailInfo: PropTypes.object,
  alarmInfo:PropTypes.object,
  closeFun: PropTypes.func
};

export default DeviceDetail;
