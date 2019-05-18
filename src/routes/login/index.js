import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Form, Input, Button, Icon, Row, Col } from "antd";
import styles from "./style.less";

const FormItem = Form.Item;

const Login = ({ login, dispatch, form }) => {

  /*
  dispatch({
    type: "login/loginNoCode",
    payload: { userName:'superadmin',userPw:'111111',very_code:'',remember:'1',very_code_flag:'false'}
  });
  */

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: "login/loginNoCode",
          payload: { ...values ,very_code_flag:'false'}
        });
      }
    });
  };


  const { getFieldDecorator } = form;

  const changeVerifyCode = () => {
    dispatch({
      type: "login/updateState",
      payload: { randomKey: login.randomKey + 1 }
    });
  };

  return (
    <div className={styles.background}>
      <div className={styles.formWrapper}>
        <Form onSubmit={handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator("userName", {
              rules: [{ required: true, message: "请输入用户名!" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder=""
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("userPw", {
              rules: [{ required: true, message: "请输入密码!" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder=""
              />
            )}
          </FormItem>
          <Row gutter={16}>
            <Col span="14">
              <FormItem>
                {getFieldDecorator("very_code", {
                  rules: [{ required: false, message: "请输入验证码!" }]
                })(<Input placeholder="验证码"/>)}
              </FormItem>
            </Col>
            <Col span="10">
              <FormItem>
                <a onClick={changeVerifyCode}>
                  <img
                    src={login.getVerifyCode + "?" + login.randomKey}
                    alt=""
                  />
                </a>
              </FormItem>
            </Col>
          </Row>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginFormButton}
              onClick={true}
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object
};

const WrappedLogin = Form.create()(Login);

export default connect(({ login }) => ({ login }))(WrappedLogin);
