import React from "react";
import { Modal, Form, Row, Col, Select } from "antd";
import PropTypes from "prop-types";

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const ControlParams = ({ dispatch, devices, form }) => {
  const { getFieldDecorator } = form;

  const onOk = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const payload = {
          ...values,
          deviceSnArr: devices.selectedRowKeys.join(",")
        };

        dispatch({ type: "devices/batchControlDevice", payload });
      }
    });
  };

  const onCancel = () => {
    dispatch({
      type: "devices/updateState",
      payload: { controlParamsModalVisible: false }
    });
  };

  return (
    <Modal
      title="批量重启"
      visible={devices.controlParamsModalVisible}
      onCancel={onCancel}
      width={800}
      onOk={onOk}
    >
      <Form className="login-form">
        <Row gutter={24}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="第1路交流控制">
              {getFieldDecorator("ACCtrl1", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="0">&nbsp;</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem {...formItemLayout} label="第2路交流控制">
              {getFieldDecorator("ACCtrl2", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="0">&nbsp;</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>


          <Col span={12}>
            <FormItem {...formItemLayout} label="第1路直流控制">
              {getFieldDecorator("DCCtrl1", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="0">&nbsp;</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem {...formItemLayout} label="第2路直流控制">
              {getFieldDecorator("DCCtrl2", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="0">&nbsp;</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem {...formItemLayout} label="第3路直流控制">
              {getFieldDecorator("DCCtrl3", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="0">&nbsp;</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem {...formItemLayout} label="第4路直流控制">
              {getFieldDecorator("DCCtrl4", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="0">&nbsp;</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

ControlParams.propTypes = {
  dispatch: PropTypes.func,
  devices: PropTypes.object,
  form: PropTypes.object
};

const WarpperControlParams = Form.create()(ControlParams);

export default WarpperControlParams;


/*
* <Col span={12}>
            <FormItem {...formItemLayout} label="第3路交流控制">
              {getFieldDecorator("ACCtrl3", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>
* */

/*
* <Col span={12}>
            <FormItem {...formItemLayout} label="第7路直流控制 ">
              {getFieldDecorator("DCCtrl7", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>
* */

/*
* <Col span={12}>
            <FormItem {...formItemLayout} label="第8路直流控制 ">
              {getFieldDecorator("DCCtrl8", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>
* */

/**
 *
 * <Col span={12}>
 <FormItem {...formItemLayout} label="第5路直流控制">
 {getFieldDecorator("DCCtrl5", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
 </FormItem>
 </Col>

 <Col span={12}>
 <FormItem {...formItemLayout} label="第6路直流控制 ">
 {getFieldDecorator("DCCtrl6", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
 </FormItem>
 </Col>
 */
