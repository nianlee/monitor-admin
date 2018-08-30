import React from "react";
import PropTypes from "prop-types";
import { Form, Button, DatePicker, Row, Col } from "antd";
import { api } from "utils";

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const ReportForm = ({ form, queryAlarmHis, report, updateState }) => {
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  const handleSubmit = event => {
    event.preventDefault();
    form.validateFieldsAndScroll((errs, values) => {
      if (!errs) {
        const params = { ...values };
        if (values.date) {
          params.alarmStartTime = values.date[0].format("YYYY-MM-DD hh:mm:ss");
          params.alarmEndTime = values.date[1].format("YYYY-MM-DD hh:mm:ss");
        }

        updateState(params);

        delete params.date;
        queryAlarmHis(params);
      }
    });
  };

  const exportDatas = () => {
    window.location.href =
      api.exportData +
      `?alarmStartTime=${report.alarmStartTime}&alarmEndTime=${
        report.alarmEndTime
      }`;
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
          <FormItem>
            <Button id="btn1" type="primary" htmlType="submit">
              查询
            </Button>
            <Button id="btn2" style={{ marginLeft: 12 }} onClick={exportDatas}>
              导出查询数据
            </Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

ReportForm.propTypes = {
  form: PropTypes.object,
  queryAlarmHis: PropTypes.func,
  report: PropTypes.object,
  updateState: PropTypes.func
};

const WrapperReportForm = Form.create()(ReportForm);

export default WrapperReportForm;
