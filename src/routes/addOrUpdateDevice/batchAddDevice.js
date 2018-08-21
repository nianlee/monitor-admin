import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import api from "utils/api";
import { Card,Steps,Upload,Button,Form,Row,Col,message,Icon } from "antd";
import styles from "./style.less";
import { routerRedux } from "dva/router";

const Step = Steps.Step;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 48
  },
  wrapperCol: {
    span: 8
  }
};

const batchAddDevice = ({ batchAddDevice, dispatch,form }) => {

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        //const payload = { ...values, ...addFirmware.firmwareInfo };

        //console.log('pay',payload)
        //dispatch({ type: "addFirmware/add", payload });
      }
    });
  };

  function onCancel() {
    dispatch(routerRedux.push("/devicemanage"));
  }

  const props = {
    name: "file",
    action: api.batchUploadDevice,
    withCredentials: true,
    showUploadList: false,
    data: file => {

      return {'fileName':'batch_add_device_template.xls'};//form.getFieldsValue(["fileName"]);
    },

    onChange(info) {
      if (info.file.status === "done") {
        const { response } = info.file;

        if (response && response.code === 1000) {
          message.success(`${info.file.name} 上传成功`);
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} 上传失败`);
      }
    }
  };

  return (
    <Card title={"批量新增设备"}>
      <Steps>
        <Step status="finish" title="下载文件" description="下载批量添加文件模板" />
        <Step status="finish" title="填写参数" description="在文件中填写固定参数" />
        <Step status="finish" title="上传文件" description="填写好的参数文件上传" />
      </Steps>
      <div className={styles.batchAdd}>
        <div className={styles.batchAddItem}>
          <h2>1，下载文件</h2>
          <a href="http://118.24.66.103:8080/monitor-web/device/downloadBatchAddDeviceTemplate" download="门户批量导入设备模板.xls">
            点击下载
          </a>
        </div>

        <div className={styles.batchAddItem}>
          <h2>2，将要添加的设备参数填写在表中</h2>
        </div>

        <div className={styles.batchAddItem}>
          <Form onSubmit={handleSubmit} className="login-form">
            <Row gutter={24}>
              <Col span={16}>
                <h2>3，上传批量导入文件</h2>
                <FormItem {...formItemLayout}>
                  <Upload {...props}>
                    <Button>
                      <Icon type="upload" /> 点击上传文件
                    </Button>
                  </Upload>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>

        <Button className={styles.cancelButton} onClick={onCancel}>
          取消
        </Button>

      </div>

    </Card>
  );
};


batchAddDevice.propTypes = {
  batchAddDevice: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
};

const WrappedAddOrUpdateUser = Form.create()(batchAddDevice);

export default connect(({ batchAddDevice }) => ({ batchAddDevice }))(WrappedAddOrUpdateUser);
