import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import {
  Table,
  Button,
  Popconfirm,
  Row,
  Col,
  Form,
  Select,
  Cascader
} from "antd";
import ControlParams from "./components/ControlParams";
import { routerRedux } from "dva/router";
import styles from "./style.less";
import DeviceDetail2 from "components/device-detail/index2";

const DeviceManage = ({ devices, dispatch, form }) => {
  const FormItem = Form.Item;
  const { Option } = Select;
  const { getFieldDecorator } = form;
  const { selectedRowKeys } = devices;

  const hasSelected = selectedRowKeys.length > 0; // 是否有被选中
  const deviceTypeLists = devices.deviceTypes.map(type => (
    <Option key={type.name}>{type.value}</Option>
  ));

  const deviceStateLists = devices.deviceState.map(type => (
    <Option key={type.value}>{type.name}</Option>
  ));

  const areaLoadData = selectedOptions => {
    dispatch({
      type: "devices/queryAreaByParentCode",
      payload: selectedOptions
    });
  };

  //定义列
  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      className: styles.columnCenter
    },
    {
      title: "设备编码",
      dataIndex: "code",
      key: "code",
      className: styles.columnCenter
    },
    {
      title: "地址",
      dataIndex: "detailAddr",
      key: "detailAddr",
      className: styles.columnCenter,
      width: "30%"
    },
    {
      title: "设备类型",
      dataIndex: "type",
      key: "type",
      className: styles.columnCenter
    },
    {
      title: "设备状态",
      dataIndex: "state",
      key: "state",
      className: styles.columnCenter
    },

    {
      title: "操作",
      dataIndex: "操作",
      className: styles.columnCenter,
      render: (text, record) => renderOperation(text, record)
    }
  ];

  const renderOperation = (text, record) => {
    return (
      <div>
        <Popconfirm title="确定删除吗?" onConfirm={() => onDelete(record.id)}>
          <a>删除</a>
        </Popconfirm>

        <a onClick={() => controlDevice(record.sn)} style={{ marginLeft: 8 }}>
          控制
        </a>

        <a onClick={() => upgradeDevice(record)} style={{ marginLeft: 8 }}>
          升级
        </a>

        <a onClick={() => modifyDevice(record.sn)} style={{ marginLeft: 8 }}>
          设备修改
        </a>

        <a onClick={() => checkDevice(record.sn)} style={{ marginLeft: 8 }}>
          查看
        </a>
      </div>
    );
  };

  const controlDevice = sn => {
    dispatch(routerRedux.push(`/controlDevice/one/${sn}`)); // 1 为单个控制
  };

  const sns = devices.selectedRowKeys.join(",");
  // 批量控制
  const batchControl = () => {
    dispatch(routerRedux.push(`/controlDevice/batch/${sns}`)); // 2 为批量控制
  };

  const upgradeDevice = record => {
    dispatch({
      type: "devices/upgradeDevice",
      payload: { sn: record.sn }
    });
  };

  const modifyDevice = sn => {
    dispatch(routerRedux.push(`/device/${sn}`));
  };

  // 设备查看
  const checkDevice = sn => {
    dispatch({
      type: "devices/queryDeviceBySn",
      payload: { deviceSn: sn }
    });

    dispatch({
      type: "devices/save",
      payload: { deviceDetailModalVisible: true }
    });
  };

  //添加设备函数
  const handleAdd = () => {
    dispatch(routerRedux.push("/adddevice"));
  };

  //批量添加设备函数
  function batchHandleAdd() {
    dispatch(routerRedux.push("/batchadddevice"));
  }

  //删除设备函数
  const onDelete = id => {
    dispatch({
      type: "devices/delDeviceById",
      payload: { id: id }
    });
  };

  // 分页请求
  const handlePage = pagination => {
    dispatch({ type: "devices/updatePagination", payload: pagination });
    dispatch({
      type: "devices/queryDevices",
      payload: {
        page: pagination.current,
        rows: pagination.pageSize
      }
    });
  };

  // 批量升级
  const deviceUpgradeBatch = () => {
    dispatch({
      type: "devices/deviceUpgradeBatch",
      payload: { deviceSnList: devices.selectedRowKeys.join(",") }
    });
  };

  // 批量检修
  const batchOverhaul = () => {
    dispatch({
      type: "devices/batchOverhaulDevice",
      payload: {
        deviceSnArr: devices.selectedRowKeys.join(","),
        overhaulState: 1 // 1表示检修 0表示不检修
      }
    });
  };

  // 取消批量检修
  const cancelBatchOverhaul = () => {
    dispatch({
      type: "devices/batchOverhaulDevice",
      payload: {
        deviceSnArr: devices.selectedRowKeys.join(","),
        overhaulState: 0 // 1表示检修 0表示不检修
      }
    });
  };

  // 批量开门
  const batchReopen = () => {
    dispatch({
      type: "devices/batchControlDoorState",
      payload: {
        deviceSnArr: devices.selectedRowKeys.join(","),
        doorState: 1 // 1表示开门 0表示关门
      }
    });
  };

  // 批量重启
  const batchRestart = () => {
    dispatch({
      type: "devices/save",
      payload: { controlParamsModalVisible: true }
    });
  };

  const handleFormReset = () => {
    form.resetFields();
  };

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    dispatch({
      type: "devices/updateSelect",
      payload: {
        selectedRowKeys: selectedRowKeys,
        selectedSns: selectedRows.sn
      }
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const cascaderAreaId = values.CascaderObject;
        const payload = {
          ...devices.queryParamsCache,
          ...values
        };
        if (cascaderAreaId) {
          payload.areaLevel = cascaderAreaId.length;
          payload.areaCode = cascaderAreaId[cascaderAreaId.length - 1];
        }

        delete payload.CascaderObject;
        dispatch({
          type: "devices/queryDevices",
          payload
        });
      }
    });
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        layout="inline"
        style={{ background: "#fff", padding: 20 }}
      >
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="设备区域">
              {getFieldDecorator("CascaderObject")(
                <Cascader
                  placeholder="请选择"
                  options={devices.regionList}
                  loadData={areaLoadData}
                  changeOnSelect
                />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="设备类型">
              {getFieldDecorator("deviceType")(
                <Select
                  showSearch
                  placeholder="请选择设备类型"
                  style={{ width: "200px" }}
                >
                  {deviceTypeLists}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="设备状态">
              {getFieldDecorator("deviceState")(
                <Select placeholder="请选择" style={{ width: "200px" }}>
                  {deviceStateLists}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6}>
            <FormItem>
              <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                查询
              </Button>
              <Button
                style={{ marginLeft: 8, width: 100 }}
                onClick={handleFormReset}
              >
                重置
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>

      <div style={{ background: "#fff", padding: 20, marginTop: 20 }}>
        <Button type="primary" onClick={handleAdd}>
          添加
        </Button>

        <Button
          type="primary"
          onClick={batchHandleAdd}
          style={{ marginLeft: 15 }}
        >
          批量添加
        </Button>

        <Button
          type="primary"
          onClick={deviceUpgradeBatch}
          style={{ marginLeft: 15 }}
          disabled={!hasSelected}
        >
          批量升级
        </Button>
        <Button
          type="primary"
          disabled={!hasSelected}
          style={{ marginLeft: 15 }}
          onClick={batchRestart}
        >
          批量重启
        </Button>
        <Button
          type="primary"
          disabled={!hasSelected}
          style={{ marginLeft: 15 }}
          onClick={batchReopen}
        >
          批量开门
        </Button>
        <Button
          type="primary"
          disabled={!hasSelected}
          style={{ marginLeft: 15 }}
          onClick={batchOverhaul}
        >
          批量检修
        </Button>

        <Button
          type="primary"
          disabled={!hasSelected}
          style={{ marginLeft: 15 }}
          onClick={cancelBatchOverhaul}
        >
          取消批量检修
        </Button>
        <Button
          type="primary"
          disabled={!hasSelected}
          style={{ marginLeft: 15 }}
          onClick={batchControl}
        >
          批量控制
        </Button>
      </div>

      <DeviceDetail2
        visible={devices.deviceDetailModalVisible}
        closeFun={() => {
          dispatch({
            type: "devices/save",
            payload: { deviceDetailModalVisible: false }
          });
        }}
        detailInfo={devices.deviceDetailInfo}
      />

      <Table
        bordered
        dataSource={devices.dataSource}
        rowSelection={rowSelection}
        columns={columns}
        pagination={devices.pagination}
        onChange={handlePage}
        style={{ background: "#fff" }}
      />

      <ControlParams dispatch={dispatch} devices={devices} />
    </div>
  );
};

DeviceManage.propTypes = {
  devices: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object
};

const WrappedAdd = Form.create()(DeviceManage);

export default connect(({ devices }) => ({ devices }))(WrappedAdd);
