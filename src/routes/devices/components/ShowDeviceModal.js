import React from "react";
import { Modal, Form, Card } from "antd";
import PropTypes from "prop-types";
import styles from "./style.less";

const ShowModal = ({
  item,
  dynamic,
  form: { validateFields, getFieldsValue },
  ...modalPorps
}) => {
  const dynamicList = dynamic.map(d => (
    <div className={styles.summaryWrapper} key={d.indexOf}>
      <p>{d.attributeName}:</p>
      <p className={styles.itemWrapper}>{d.attributeValue}</p>
    </div>
  ));

  const modalOpts = {...modalPorps};
  const { dataUpTime } = {...modalPorps};
  const { firmwareVersion } = {...modalPorps};

  console.log('dataUpTime','firmwareVersion',dataUpTime,firmwareVersion)

  return (
    <Modal {...modalOpts}>
      <div>
        <div style={{ display: "flex" }}>
          <label className={styles.textTitle}>SN号编码: </label>
          <label>{item.sn}</label>
        </div>

        <div>
          <label className={styles.textTitle}>设备名称: </label>
          <label>{item.name}</label>
        </div>

        <div>
          <label className={styles.textTitle}>设备类型: </label>
          <label>{item.type}</label>
        </div>

        <div>
          <label className={styles.textTitle}>安装时间: </label>
          <label>{item.installTime}</label>
        </div>

        <div>
          <label className={styles.textTitle}>安装地址: </label>
          <label>{item.detailAddr}</label>
        </div>

        <div>
          <label className={styles.textTitle}>硬件版本: </label>
          <label>{item.hardwareVersion}</label>
        </div>

        <div>
          <label className={styles.textTitle}>固件版本: </label>
          <label>{dataUpTime}</label>
        </div>

        <div>
          <label className={styles.textTitle}>数据上报时间: </label>
          <label>{firmwareVersion}</label>
        </div>

        <Card title="设备信息汇总" className={styles.cardWrapper}>
          {dynamicList}
        </Card>
      </div>
    </Modal>
  );
};

ShowModal.propTypes = {
  form: PropTypes.object,
  type: PropTypes.string,
  item: PropTypes.array,
  dynamic: PropTypes.array,
  onOk: PropTypes.func
};

export default Form.create()(ShowModal);
