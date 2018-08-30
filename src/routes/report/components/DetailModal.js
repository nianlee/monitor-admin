import React from "react";
import { Modal, List } from "antd";
import PropTypes from "prop-types";

const ListItem = List.Item;
const ListItemMeta = ListItem.Meta;

const DeviceDetailModal = ({ updateState, report }) => {
  return (
    <Modal
      visible={report.deviceModalVisible}
      onCancel={() => updateState({ deviceModalVisible: false })}
      footer={false}
      width={800}
    >
      <List
        style={{ margin: 20 }}
        header={
          <div style={{ fontSize: 18, fontWeight: 600 }}>
            《{report.deviceDetailInfo.name}
            》的详细信息
          </div>
        }
        bordered
        dataSource={report.deviceDetailInfo.deviceDetailMetas}
        renderItem={item => (
          <ListItem>
            {item.map(info => (
              <ListItemMeta
                key={info.key}
                title={info.title}
                description={info.description}
              />
            ))}
          </ListItem>
        )}
      />
    </Modal>
  );
};

DeviceDetailModal.propTypes = {
  updateState: PropTypes.func,
  report: PropTypes.object
};

export default DeviceDetailModal;
