import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Table,Form,Select,Button,Cascader,Card } from 'antd' //eslint-disable-line
import { connect } from 'dva'
import Alarm from './components/Alarm'
import EquipmentSummary from "./components/EquipmentSummary"; //eslint-disable-line

const Dashboard = ({ dashboard, dispatch,form }) => {

  const childProps = { dashboard, dispatch };

  //定义列
  const columns = [
    {
      title: "设备编号",
      dataIndex: "sn",
      key: "sn",
      //width:'10%',
    },
    {
      title: "安装地址",
      dataIndex: "detailAddr",
      key: "detailAddr",
      //width:'10%',
    },
    {
      title: "供电",
      dataIndex: "powerSupplyState",
      key: "powerSupplyState",
      //width:'10%',
    },
    {
      title: "环境",
      dataIndex: "environmentState",
      key: "environmentState",
      //width:'10%',
    },
    {
      title: "网络",
      dataIndex: "networkState",
      key: "networkState",
      //width:'10%',
    },
    {
      title: "安防",
      dataIndex: "securityState",
      key: "securityState",
      //width:'10%',
    },
    {
      title: "防雷",
      dataIndex: "lightningProtectionState",
      key: "lightningProtectionState",
      //width:'10%',
    },
    {
      title: "漏电",
      dataIndex: "leakageState",
      key: "leakageState",
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
        <a
          href="javascript:;"
          onClick={() => checkDevice(record.sn)}
          style={{ marginLeft: 2 }}
        >
          查看
        </a>
      </div>
    );
  }

  // 设备查看
  function checkDevice(sn) {
    //console.log(sn)
    dispatch({
      type: "devices/queryDeviceInfos",
      payload: sn
    });
  }

  const areaLoadData = selectedOptions => {
    dispatch({
      type: "dashboard/queryAreaByParentCode",
      payload: selectedOptions
    });
  };

  const FormItem = Form.Item;
  //const { Option } = Select;
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
          type: "dashboard/queryDeviceList",
          payload
        });
      }
    });
  };

  // 分页请求
  function handlePage(pagination) {
    dispatch({ type: "dashboard/updatePagination", payload: pagination });
    dispatch({
      type: "dashboard/queryDeviceList",
      payload: {
        page: pagination.current,
        rows: pagination.pageSize
      }
    });
  }

  return (<div className="dashboard">
    <Row gutter={24} style={{ marginTop: '-5px' }}>
      <Col>
        <EquipmentSummary {...childProps} />
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span="24">
        <Card title="设备信息列表">
          <Form onSubmit={handleSubmit} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={6} sm={24}>
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
          <Table
            bordered
            dataSource={dashboard.dataSource}
            columns={columns}
            pagination={dashboard.pagination}
            onChange={handlePage}
          />
        </Card>
      </Col>
    </Row>
    <Row gutter={24} style={{ marginTop: '30px' }}>
      <Col span="24">
        <Alarm {...childProps} />
      </Col>
    </Row>
  </div>)
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
}

const WrappedAdd = Form.create()(Dashboard);
export default connect(({ dashboard }) => ({ dashboard }))(WrappedAdd);

//export default connect(({ dashboard }) => ({ dashboard }))(Dashboard)
