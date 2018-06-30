import React from "react";
import PropTypes from "prop-types";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Select,
  Upload,
  Card,
  Icon,
  message
} from "antd";
import { routerRedux } from "dva/router";
import { connect } from "dva";
import styles from "./style.less";
import api from "utils/api";

const FormItem = Form.Item;
const Option = Select.Option;

const AddFirmware = ({ form, dispatch, addFirmware }) => {
  // 添加固件
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const payload = { ...values, ...addFirmware.firmwareInfo };

        console.log('pay',payload)
        dispatch({ type: "addFirmware/add", payload });
      }
    });
  };

  const onCancel = () => {
    dispatch(routerRedux.push("/firmware"));
  };

  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  };

  const props = {
    name: "file",
    action: api.uploadFirmware,
    withCredentials: true,
    // showUploadList: false,
    data: file => {
      return form.getFieldsValue(["hardwareVersion", "firmwareVersion"]);
    },
    beforeUpload(file, fileList) {
      const values = form.getFieldsValue([
        "hardwareVersion",
        "firmwareVersion"
      ]);

      if (!values.hardwareVersion) {
        form.setFields({
          hardwareVersion: {
            errors: [new Error("请先输入硬件版本号")]
          }
        });
        message.error("请先输入硬件版本号");
        return false;
      }

      if (!values.firmwareVersion) {
        form.setFields({
          firmwareVersion: {
            errors: [new Error("请先输入固件版本号")]
          }
        });
        message.error("请先输入固件版本号");
        return false;
      }
    },
    onChange(info) {
      if (info.file.status === "done") {
        const { response } = info.file;

        if (response && response.code === 1000) {
          dispatch({
            type: "addFirmware/updateFirmwareInfo",
            payload: { ...response.data }
          });
          console.log('res',response)

          message.success(`${info.file.name} 上传成功`);
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} 上传失败`);
      }
    }
  };

  return (
    <Card title="添加固件">
      <Form onSubmit={handleSubmit} className="login-form">
        <Row gutter={24}>
          <Col span={8}>
            <FormItem {...formItemLayout} label="硬件版本号">
              {getFieldDecorator("hardwareVersion", {
                rules: [{ required: true, message: "请输入硬件版本号" }]
              })(<Input placeholder="请输入硬件版本号" />)}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem {...formItemLayout} label="固件版本号">
              {getFieldDecorator("firmwareVersion", {
                rules: [{ required: true, message: "请输入固件版本号" }]
              })(<Input placeholder="请输入固件版本号" />)}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem {...formItemLayout} label="下载类型">
              {getFieldDecorator("downloadType", {
                rules: [{ required: true, message: "请选择下载类型!" }]
              })(
                <Select
                  showSearch
                  placeholder="请选择下载类型"
                  optionLabelProp="children"
                  filterOption={(input, option) => {
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase());
                  }}
                >
                  <Option key="1" value="HTTP">
                    HTTP
                  </Option>
                  <Option key="2" value="FTP">
                    FTP
                  </Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem {...formItemLayout} label="固件名称">
              {getFieldDecorator("firmwareName", {
                rules: [{ required: true, message: "请输入固件名称" }]
              })(<Input placeholder="请输入固件名称" />)}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem {...formItemLayout} label="固件描述">
              {getFieldDecorator("firmwareDesc", {
                rules: [{ required: true, message: "请输入固件描述" }]
              })(<Input placeholder="请输入固件描述" />)}
            </FormItem>
          </Col>

          <Col span={8}>
            <FormItem {...formItemLayout} label="上传固件附件">
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> 点击上传附件
                </Button>
              </Upload>
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Button type="primary" htmlType="submit" className={styles.addButton}>
            确定
          </Button>
          <Button className={styles.cancelButton} onClick={onCancel}>
            取消
          </Button>
        </FormItem>
      </Form>
    </Card>
  );
};

AddFirmware.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  addFirmware: PropTypes.object
};

const WrappedAddOrUpdateUser = Form.create()(AddFirmware);

export default connect(({ addFirmware }) => ({ addFirmware }))(
  WrappedAddOrUpdateUser
);
