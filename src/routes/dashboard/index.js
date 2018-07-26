import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Table,Form,Select,Button,Cascader,Card } from 'antd' //eslint-disable-line
import { connect } from 'dva'
import Alarm from './components/Alarm'
import Offline from './components/Offline'
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
      dataIndex: "type",
      key: "type",
      //width:'10%',
    },
    {
      title: "环境",
      dataIndex: "state",
      key: "state",
      //width:'10%',
    },
    {
      title: "网络",
      dataIndex: "state1",
      key: "state1",
      //width:'10%',
    },
    {
      title: "安防",
      dataIndex: "state2",
      key: "state2",
      //width:'10%',
    },
    {
      title: "防雷",
      dataIndex: "state3",
      key: "state3",
      //width:'10%',
    },
    {
      title: "漏电",
      dataIndex: "state4",
      key: "state4",
      //width:'10%',
    },
    {
      title: "交直流",
      dataIndex: "state5",
      key: "state5",
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

  const FormItem = Form.Item;
  //const { Option } = Select;
  const { getFieldDecorator } = form;

  return (<div className="dashboard">
    <Row gutter={24} style={{ marginTop: '-5px' }}>
      <Col>
        <EquipmentSummary {...childProps} />
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span="24">
        <Card title="设备信息列表">
          <a style={{fontSize:30}}>筛选</a>
          <Form onSubmit="" layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={6} sm={24}>
                <FormItem label="设备区域">
                  {getFieldDecorator("CascaderObject")(
                    <Cascader
                      placeholder="请选择"
                      //options={devices.regionList}
                      //loadData={areaLoadData}
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

                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col md={6} sm={24}>
                <FormItem label="设备状态">
                  {getFieldDecorator("deviceState")(
                    <Select placeholder="请选择" style={{ width: "200px" }}>

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
                    onClick=""
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
            //rowSelection={rowSelection}
            columns={columns}
            //pagination={devices.pagination}
            //onChange={handlePage}
          />
        </Card>
      </Col>
    </Row>
    <Row gutter={24} style={{ marginTop: '30px' }}>
      <Col span="12">
        <Alarm {...childProps} />
      </Col>
      <Col span="12">
        <Offline {...childProps} />
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
