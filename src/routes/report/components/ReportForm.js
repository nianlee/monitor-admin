import React from "react";
import PropTypes from "prop-types";
import { Form, Button, DatePicker, Row, Col, Input } from "antd";
// import styles from './style.less'

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const ReportForm = ({ report, dispatch, form }) => {
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  const handleSubmit = e => {
    e.preventDefault();

    form.validateFieldsAndScroll((errs, values) => {
      if (!errs) {
        const params = { ...values };
        if (values.date) {
          params.alarmStartTime = values.date[0].format("YYYY-MM-DD hh:mm:ss");
          params.alarmEndTime = values.date[1].format("YYYY-MM-DD hh:mm:ss");
        }

        delete params.date;
      }
    });
  };

  return (
    <Form className="table-form" onSubmit={handleSubmit}>
      <Row gutter={16}>
        <Col span={6}>
          <FormItem label="时间选择" {...formItemLayout}>
            {getFieldDecorator("date", {})(<RangePicker />)}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="设备sn" {...formItemLayout}>
            {getFieldDecorator("sn", {})(<Input placeholder="请输入设备sn" />)}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="位置选择" {...formItemLayout}>
            {getFieldDecorator("alarmInfo", {})(
              <Input placeholder="请输入警告信息" />
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 12 }} type="primary">
              导出查询数据
            </Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

ReportForm.propTypes = {
  report: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object
};

const WrapperReportForm = Form.create()(ReportForm);

export default WrapperReportForm;
