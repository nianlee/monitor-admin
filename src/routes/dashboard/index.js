import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Table,
  Form,
  Select,
  Button,
  Cascader,
  Card,
  Progress, Input
} from "antd";
import { connect } from "dva";
import Alarm from "./components/Alarm";
import EquipmentSummary from "./components/EquipmentSummary";
import { routerRedux } from "dva/router";
import styles from "./style.less";
import classNames from "classnames";
import DeviceDetail from "components/device-detail";

const Dashboard = ({ dashboard, dispatch, form }) => {
  const childProps = { dashboard, dispatch };
  const render = (text, record) => {
    if (text === "异常") {
      return <span style={{ color: "red" }}>{text}</span>;
    } else {
      return text;
    }
  };

  //定义列
  const columns = [
    {
      title: "设备编码",
      dataIndex: "code",
      key: "code",
      className: styles.columnCenter
    },
    {
      title: "安装地址",
      dataIndex: "detailAddr",
      key: "detailAddr",
      className: styles.columnCenter,
      width: "30%"
    },
    {
      title: "网络",
      dataIndex: "networkState",
      key: "networkState",
      className: styles.columnCenter,
      render: render
    },
    {
      title: "供电",
      dataIndex: "powerSupplyState",
      key: "powerSupplyState",
      className: styles.columnCenter,
      render: render
    },
    {
      title: "环境",
      dataIndex: "environmentState",
      key: "environmentState",
      className: styles.columnCenter,
      render: render
    },
    {
      title: "安防",
      dataIndex: "securityState",
      key: "securityState",
      className: styles.columnCenter,
      render: render
    },
    {
      title: "防雷",
      dataIndex: "lightningProtectionState",
      key: "lightningProtectionState",
      className: styles.columnCenter,
      render: render
    },
    {
      title: "漏电",
      dataIndex: "leakageState",
      key: "leakageState",
      className: styles.columnCenter,
      render: render
    },
    {
      title: "设备检修",
      dataIndex: "overhaulState",
      className: styles.center,
      key: "overhaulState",
      render: (text, record) => {
        if (record.overhaulState == 1) {
          return "检修中";
        } else if (record.overhaulState == 0) {
          return "--";
        }
      }
    },
    {
      title: "操作",
      dataIndex: "操作",
      className: styles.columnCenter,
      render: (text, record) => renderOperation(text, record)
    }
  ];

  function renderOperation(text, record) {
    return (
      <div>
        <a
          onClick={() => {
            dispatch({
              type: "dashboard/queryDeviceBySn",
              payload: { deviceSn: record.sn }
            });

            dispatch({
              type: "dashboard/queryDeviceByAlarmInfo",
              payload: { sn: record.sn }
            });

            dispatch({
              type: "dashboard/updateState",
              payload: { deviceModalVisible: true }
            });
          }}
        >
          查看详情
        </a>

        <a
          onClick={() => dispatch(routerRedux.push(`/gis/${record.sn}`))}
          style={{ marginLeft: 12 }}
        >
          查看地图位置
        </a>
      </div>
    );
  }

  const areaLoadData = selectedOptions => {
    dispatch({
      type: "dashboard/queryAreaByParentCode",
      payload: selectedOptions
    });
  };

  const FormItem = Form.Item;
  const { getFieldDecorator } = form;
  const { Option } = Select;
  const deviceTypeLists = dashboard.deviceTypes.map(type => (
    <Option key={type.name}>{type.value}</Option>
  ));
  const deviceStateLists = dashboard.deviceState.map(type => (
    <Option key={type.value}>{type.name}</Option>
  ));

  function handleFormReset() {
    form.resetFields();
  }

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const cascaderAreaId = values.CascaderObject;
        const payload = {
          //...devices.queryParamsCache,
          ...values
        };
        if (cascaderAreaId) {
          payload.areaLevel = cascaderAreaId.length;
          payload.areaCode = cascaderAreaId[cascaderAreaId.length - 1];
        }
        delete payload.CascaderObject;
        dispatch({
          type: "dashboard/queryDevices",
          payload
        });
      }
    });
  };

  // 分页请求
  function handlePage(pagination) {
    dispatch({ type: "dashboard/updatePagination", payload: pagination });
    dispatch({
      type: "dashboard/queryDevices",
      payload: {
        page: pagination.current,
        rows: pagination.pageSize
      }
    });
  }

  return (
    <div>
      <Row gutter={24} style={{ marginTop: 5 }}>
        <Col>
          <EquipmentSummary {...childProps} />
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: 20 }}>
        <Col span="24">
          <Card title="设备信息列表">
            <Form onSubmit={handleSubmit} layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={5}>
                  <FormItem label="设备区域">
                    {getFieldDecorator("CascaderObject")(
                      <Cascader
                        placeholder="请选择"
                        options={dashboard.regionList}
                        loadData={areaLoadData}
                        changeOnSelect
                      />
                    )}
                  </FormItem>
                </Col>
                <Col md={5}>
                  <FormItem label="设备类型">
                    {getFieldDecorator("deviceType")(
                      <Select
                        showSearch
                        placeholder="请选择设备类型"
                        style={{ width: 180 }}
                      >
                        {deviceTypeLists}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={5}>
                  <FormItem label="设备状态">
                    {getFieldDecorator("deviceState")(
                      <Select placeholder="请选择" style={{ width: 180 }}>
                        {deviceStateLists}
                      </Select>
                    )}
                  </FormItem>
                </Col>

                <Col md={5}>
                  <FormItem label="设备编码">
                    {getFieldDecorator("deviceCode", {
                      rules: [
                        {
                          required: false,
                          message: "请输入设备正确的编码!"
                        }
                      ]
                    })(<Input placeholder="设备编码" />)}
                  </FormItem>
                </Col>

                <Col md={4}>
                  <FormItem>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: 100 }}
                    >
                      查询
                    </Button>
                    <Button
                      style={{ marginLeft: 0, width: 100 }}
                      onClick={handleFormReset}
                      htmlType="submit"
                    >
                      重置
                    </Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <Table
              bordered
              style={{ marginTop: 20 }}
              dataSource={dashboard.dataSource}
              columns={columns}
              pagination={dashboard.pagination}
              onChange={handlePage}
              size="small"
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: "30px" }}>
        <Col span="24">
          <Alarm {...childProps} />
        </Col>
      </Row>

      <DeviceDetail
        visible={dashboard.deviceModalVisible}
        detailInfo={dashboard.deviceDetailInfo}
        alarmInfo={dashboard.deviceDetailAlarmInfo}
        closeFun={() => {
          dispatch({
            type: "dashboard/updateState",
            payload: { deviceModalVisible: false }
          });
        }}
      />

      <div
        className={classNames({
          [styles.inspectorLoading]: true,
          [styles.inspectionShow]: dashboard.inspectionShow
        })}
      >
        <Progress
          type="circle"
          percent={dashboard.inspectionProgress}
          status="active"
          width={150}
        />
        <p>巡检中...</p>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object
};

const WrappedAdd = Form.create()(Dashboard);
export default connect(({ dashboard }) => ({ dashboard }))(WrappedAdd);
