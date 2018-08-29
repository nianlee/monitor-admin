import React from "react";
import { Modal, List } from "antd";
import PropTypes from "prop-types";

const ListItem = List.Item;
const ListItemMeta = ListItem.Meta;

const DeviceDetailModal = ({ dispatch, dashboard }) => {
  //console.log('detail',dashboard.deviceDetailInfo.deviceDetailMetas)
  return (
    <Modal
      visible={dashboard.deviceModalVisible}
      onCancel={() =>
        dispatch({
          type: "dashboard/updateState",
          payload: { deviceModalVisible: false }
        })
      }
      footer={false}
    >
      <List
        style={{ margin: 20 }}
        header={
          <div style={{ fontSize: 18, fontWeight: 600 }}>
            《{dashboard.deviceDetailInfo.name}》的详细信息
          </div>
        }
        bordered
        dataSource={dashboard.deviceDetailInfo.deviceDetailMetas}
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
  dashboard: PropTypes.object
};

export default DeviceDetailModal;
