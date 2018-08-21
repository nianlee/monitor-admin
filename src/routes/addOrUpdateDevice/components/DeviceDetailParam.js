import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Icon, Card, Row, Col } from "antd";

const FormItem = Form.Item;
const formItemLayout = {
  // eslint-disable-line
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const DeviceDetailParam = ({ detail, dispatch, form }) => {
  const { getFieldDecorator } = form;

  return (
    <div>
      <Card title="温度参数">
        <Form className="login-form">
          <Row gutter={24}>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card title="湿度参数">
        <Form className="login-form">
          <Row gutter={24}>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card title="交流电流">
        <Form className="login-form">
          <Row gutter={24}>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card title="交流电压">
        <Form className="login-form">
          <Row gutter={24}>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="sn码" // eslint-disable-line
              >
                {getFieldDecorator("sn码", {
                  rules: [{ required: true, message: "请输入设备an码!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="设备sn码"
                  />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

DeviceDetailParam.propTypes = {
  detail: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object
};

export default DeviceDetailParam;
