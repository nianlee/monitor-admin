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
import ShowDeviceModal from "./components/ShowDeviceModal";
import { routerRedux } from "dva/router";
//import styles from './style.less'

const DeviceManage = ({ devices, dispatch, form }) => {
  const FormItem = Form.Item;
  const { Option } = Select;
  const { modalVisible } = devices;
  const { getFieldDecorator } = form;
  const { selectedRowKeys } = devices;
  const deviceSnList = devices.deviceSnList;
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

  //modal 属性
  const modalProps = {
    item: devices.deviceInfos,
    dynamic: devices.deviceDynamicDTOS,
    visible: modalVisible,
    maskClosable: false,
    title: "设备详情",
    wrapperClassName: "vertical-center-modal",
    width: 1024,
    onOk(data) {
      dispatch({
        type: "devices/hideAddModal"
      });
    },
    onCancel() {
      dispatch({
        type: "devices/hideAddModal"
      });
    }
  };
  //定义列
  const columns = [
    {
      title: "设备sn编码",
      dataIndex: "sn",
      key: "sn"
      //width:'10%',
    },
    {
      title: "地址",
      dataIndex: "detailAddr",
      key: "detailAddr"
      //width:'10%',
    },
    {
      title: "设备类型",
      dataIndex: "type",
      key: "type"
      //width:'10%',
    },
    {
      title: "设备状态",
      dataIndex: "state",
      key: "state"
      //width:'10%',
    },

    {
      title: "操作",
      dataIndex: "操作",
      //width:'10%',
      render: (text, record) => renderOperation(text, record)
    }
  ];

  function renderOperation(text, record) {
    return (
      <div>
        <Popconfirm title="确定删除吗?" onConfirm={() => onDelete(record.id)}>
          <a href="javascript:;">删除</a>
        </Popconfirm>

        <a
          href="javascript:;"
          onClick={() => controlDevice(record.sn)}
          style={{ marginLeft: 8 }}
        >
          控制
        </a>

        <a
          href="javascript:;"
          onClick={() => updateDevice(record.sn)}
          style={{ marginLeft: 8 }}
        >
          升级
        </a>

        <a
          href="javascript:;"
          onClick={() => modifyDevice(record.id)}
          style={{ marginLeft: 8 }}
        >
          地址修改
        </a>

        <a
          href="javascript:;"
          onClick={() => checkDevice(record.sn)}
          style={{ marginLeft: 8 }}
        >
          查看
        </a>
      </div>
    );
  }

  function controlDevice(sn) {
    dispatch(routerRedux.push(`/controlDevice/${sn}`));
  }

  function updateDevice(sn) {
    dispatch(routerRedux.push(`/updatedevice/${sn}`));
  }

  function modifyDevice(id) {
    dispatch(routerRedux.push(`/modifydevice/${id}`));
  }

  // 设备查看
  function checkDevice(sn) {
    //console.log(sn)
    dispatch({
      type: "devices/queryDeviceInfos",
      payload: sn
    });
  }

  //添加设备函数
  function handleAdd() {
    console.log("handleAdd");
    dispatch(routerRedux.push("/adddevice"));
  }

  //删除设备函数
  function onDelete(id) {
    dispatch({
      type: "devices/deleteDevice",
      payload: { id: id }
    });
  }

  // 分页请求
  function handlePage(pagination) {
    dispatch({ type: "devices/updatePagination", payload: pagination });
    dispatch({
      type: "devices/queryDeviceList",
      payload: {
        page: pagination.current,
        rows: pagination.pageSize
      }
    });
  }

  function batchUpdae() {
    dispatch({
      type: "devices/batchUpdae",
      payload: { deviceSnList: deviceSnList }
    });
  }

  function handleFormReset() {
    form.resetFields();
  }

  function onSelectChange(selectedRowKeys, selectedRows) {
    console.log("selectedRowKeys changed: ", selectedRows);

    dispatch({
      type: "devices/updateSelect",
      payload: {
        selectedRowKeys: selectedRowKeys,
        selectedSns: selectedRows.sn
      }
    });
  }

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
          type: "devices/queryDeviceList",
          payload
        });
      }
    });
  };

  return (
    <div>
      <a>筛选</a>
      <Form onSubmit={handleSubmit} layout="inline">
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
                  optionLabelProp="children"
                  style={{ width: "200px" }}
                  filterOption={(input, option) => {
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase());
                  }}
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
      <div style={{ margin: "20px 0" }}>
        <Button type="primary" onClick={handleAdd}>
          添加
        </Button>
        <Button
          type="primary"
          onClick={batchUpdae}
          style={{ marginLeft: 8 }}
          disabled={!hasSelected}
        >
          批量升级
        </Button>
      </div>
      <ShowDeviceModal {...modalProps} />
      <Table
        bordered
        dataSource={devices.dataSource}
        rowSelection={rowSelection}
        columns={columns}
        pagination={devices.pagination}
        onChange={handlePage}
      />
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
