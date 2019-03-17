import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Form, Row, Col, Select, Button, Modal } from "antd";
import styles from "./style.less";
import { routerRedux } from "dva/router";

const FormItem = Form.Item;
const Option = Select.Option;

const ControlDevice = ({ controldevice, dispatch, form }) => {

  // 控制设备请求
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {


      if (!err) {
        if(controldevice.type === 'one') {

          //const ACC = values.DDCC3;
          //delete values.DDCC3;
          //values.ACCtrl1 = ACC;
          const value = {...values,...controldevice.sn,};

          //console.log('DD',value);

          dispatch({
            type: "controldevice/control",
            payload: { ...value }
          });
        } else {

          const ACC = values.DDCC3;
          delete values.DDCC3;
          values.ACCtrl1 = ACC;
          const value = {...values,...controldevice.deviceSnArr};

          dispatch({
            type: "controldevice/batchControlDevice",
            payload: { ...value }
          });
        }

      }
    });
  };

  const { getFieldDecorator } = form;
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

  function handle() {
    dispatch(routerRedux.push("/devicemanage"));
    dispatch({
      type:"controldevice/hideModal"
    });
  }

  return (
    <div className={styles.formWrapper}>
      <Form onSubmit={handleSubmit} className="login-form">
        <Row gutter={24}>


          <Col span={12}>
            <FormItem {...formItemLayout} label="第1路交流">
              {getFieldDecorator("ACCtrl1", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="">&nbsp;</Option>
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem {...formItemLayout} label="第1路直流">
              {getFieldDecorator("DCCtrl1", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="">&nbsp;</Option>
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>


          <Col span={12}>
            <FormItem {...formItemLayout} label="第2路交流">
              {getFieldDecorator("ACCtrl2", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="">&nbsp;</Option>
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem {...formItemLayout} label="第2路直流">
              {getFieldDecorator("DCCtrl2", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="">&nbsp;</Option>
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem {...formItemLayout} label="交换机">
              {getFieldDecorator("DCCtrl4", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="">&nbsp;</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>


          <Col span={12}>
            <FormItem {...formItemLayout} label="第3路直流">
              {getFieldDecorator("DCCtrl3", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="">&nbsp;</Option>
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem {...formItemLayout} label="门锁">
              {getFieldDecorator("DCCtrl6", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="">&nbsp;</Option>
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button className={styles.cancelButton} onClick={handle}>
            返回
          </Button>
          <Button type="primary" htmlType="submit" className={styles.addButton}>
            确认
          </Button>
        </FormItem>
      </Form>

      <Modal
        title="消息"
        visible={controldevice.modalVisible}
        onOk={handle}
        onCancel={handle}
      >
        <p>{controldevice.messages}</p>
      </Modal>
    </div>
  );
};

ControlDevice.propTypes = {
  controldevice: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object
};

const WrappedAdd = Form.create()(ControlDevice);

export default connect(({ controldevice }) => ({ controldevice }))(WrappedAdd);

/*
<Col span={12}>
            <FormItem {...formItemLayout} label="设备地址">
              {getFieldDecorator("sn", {
                initialValue: controldevice.sn.sn
              })(<Input disabled={true} />)}
            </FormItem>
          </Col>
 */


/*
          <Col span={12}>
            <FormItem {...formItemLayout} label="第3路交流摄像机">
              {getFieldDecorator("DDCC3", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="4">&nbsp;</Option>
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          */

/*
<Col span={12}>
  <FormItem {...formItemLayout} label="第4路交流摄像机">
    {getFieldDecorator("ACCtrl2", {
      rules: [{ required: false, message: "请选择状态 !" }]
    })(
      <Select showSearch placeholder="请选择状态">
        <Option value="4">&nbsp;</Option>
        <Option value="0">关</Option>
        <Option value="1">开</Option>
        <Option value="2">重启</Option>
      </Select>
    )}
  </FormItem>
</Col>
*/

/**
 * <Col span={12}>
 <FormItem {...formItemLayout} label="风扇">
 {getFieldDecorator("DCCtrl5", {
                rules: [{ required: false, message: "请选择状态 !" }]
              })(
                <Select showSearch placeholder="请选择状态">
                  <Option value="">&nbsp;</Option>
                  <Option value="0">关</Option>
                  <Option value="1">开</Option>
                  <Option value="2">重启</Option>
                </Select>
              )}
 </FormItem>
 </Col>
 */
