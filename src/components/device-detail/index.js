import React from "react";
import PropTypes from "prop-types";
import { Modal, Card, Row, Col } from "antd";
import Table from "./table";
import Tables from "./STable";

// let dataSource = [];
// for (let i = 0; i < 30; i++) {
//   dataSource.push({
//     label: "label-" + i,
//     key: "key" + i,
//     value: "value" + i
//   });
// }

const DeviceDetail = ({ visible, detailInfo, closeFun }) => {

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


  let statusInfos = detailInfo.statusInfo;
  if(statusInfos && statusInfos[0].key =='ACInput') {
    if(statusInfos[0].value=='0') {
      statusInfos[0].value = '正常'
    } else {
      statusInfos[0].value = '异常'
    }
  }

  if(statusInfos && statusInfos[5].key =='leakageState') {
    if(statusInfos[5].value=='0') {
      statusInfos[5].value = '正常'
    } else {
      statusInfos[5].value = '异常'
    }
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

  return (
    <Modal
      visible={visible}
      title={`《${detailInfo.name}》的详细信息`}
      width={900}
      onCancel={closeFun}
      footer={null}
    >
      <Row gutter={24}>
        <Col span={24}>
          <Card title="基本信息">
            <Table column={2} dataSource={detailInfo.baseInfo} />
          </Card>
        </Col>
      </Row>

      <div style={{ height: 10, width: "100%" }} />
      <Row gutter={24}>
        <Col span={24}>
          <Card title="状态信息">
            <Tables column={6} dataSource={stateInfo} />
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
    </Modal>
  );
};

DeviceDetail.propTypes = {
  visible: PropTypes.bool,
  detailInfo: PropTypes.object,
  closeFun: PropTypes.func
};

export default DeviceDetail;
