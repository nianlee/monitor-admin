import React from "react";
import { Modal, List } from "antd";
import PropTypes from "prop-types";

const ListItem = List.Item;
const ListItemMeta = ListItem.Meta;

const DeviceDetailModal = ({ dispatch, devices }) => {
  return (
    <Modal
      visible={devices.deviceDetailModalVisible}
      onCancel={() =>
        dispatch({
          type: "devices/updateState",
          payload: { deviceDetailModalVisible: false }
        })
      }
      footer={false}
    >
      <List
        bordered
        style={{ margin: 20 }}
        header={
          <div style={{ fontSize: 18, fontWeight: 600 }}>
            《{devices.deviceDetailInfo.name}》的详细信息
          </div>
        }
        dataSource={devices.deviceDetailInfo.deviceDetailMetas}
        renderItem={item => (
          <ListItem>
            <ListItemMeta title={item.title} description={item.description} />
          </ListItem>
        )}
      />
    </Modal>
  );
};

DeviceDetailModal.propTypes = {
  dispatch: PropTypes.func,
  devices: PropTypes.object
};

export default DeviceDetailModal;
