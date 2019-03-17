import React from "react";
import {Modal, Input, message} from "antd";
import PropTypes from "prop-types";
//import style from "./style.less";

const PasswordModal = ({ dispatch, devices }) => {

  const onOk = () => {

    console.log('input',devices.upgradePassword);

    const value = Number(devices.upgradePassword);
    if (Number.isNaN(value)) {
      message.error('请输入密码');
      return
    }
    if (!value) {
      message.error('请输入密码');
      return
    }

    console.log('size',devices.selectedRowKeys.length);
    if(devices.selectedRowKeys.length >= 1) { //批量升级
      console.log('批量升级',devices.selectedRowKeys.join(","));
      dispatch({ type: "devices/deviceUpgradeBatch",
        payload: { encodePassword: value,
          passwordModalVisible: false,
          deviceSnList: devices.selectedRowKeys.join(",")}
      });
    }

    if(devices.selectedRowKeys.length == 0) { // 单个升级
      console.log('单个升级',devices.selectedRowKeys);
      dispatch({ type: "devices/checkUpgradePassword",
        payload: { encodePassword: value,
          sn:devices.upgradeSn}
      });
    }

  };


  const onCancel = () => {
    dispatch({ type: "devices/save",
      payload: { passwordModalVisible: false}});
  };


  const inputPassword = e => {
    dispatch({
      type: "devices/save",
      payload: {
        upgradePassword: e.target.value
      }
    })
  }

  return (

    <Modal
      title="密码验证"
      visible={devices.passwordModalVisible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <div>
        <Input placeholder="请输入密码" value={devices.upgradePassword} onChange={e => inputPassword(e)} style={{ flex:1, width: 120, height:30 }} />
      </div>



    </Modal>
  );
};

PasswordModal.propTypes = {
  dispatch: PropTypes.func,
  devices: PropTypes.object,
  form: PropTypes.object
};

export default PasswordModal;


