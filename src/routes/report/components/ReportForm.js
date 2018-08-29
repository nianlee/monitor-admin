import React from "react";
import PropTypes from "prop-types";
import { Form, Button, DatePicker, Row, Col } from "antd";
//import { exportData } from "services/dashboard";
// import exportDate from './style.less'

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const ReportForm = ({ form,queryAlarmHis }) => {
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  //var startTime = '';
  //var endTime = '';

  const handleSubmit = event => {
    event.preventDefault();
    console.log('event',event);
    form.validateFieldsAndScroll((errs, values) => {
      if (!errs) {
        const params = { ...values };
        if (values.date) {
          params.alarmStartTime = values.date[0].format("YYYY-MM-DD hh:mm:ss");
          params.alarmEndTime = values.date[1].format("YYYY-MM-DD hh:mm:ss");
          //startTime = values.date[0].format("YYYY-MM-DD hh:mm:ss");
          //endTime = values.date[1].format("YYYY-MM-DD hh:mm:ss");

        }

        delete params.date;
        queryAlarmHis(params);
      }
    });
  };

  /*
  function exportDatas() {

    const data = {alarmStartTime:startTime,alarmEndTime:endTime};
    console.log('startTime2',data);
    if(startTime.length >0 && endTime.length > 0) {
      exportData(data).then(res => {
        console.log('res',res)
      });
    }
  }*/

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
            <Button id="btn2" style={{ marginLeft: 12 }} htmlType="submit" type="primary">
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
  queryAlarmHis: PropTypes.func
};

const WrapperReportForm = Form.create()(ReportForm);

export default WrapperReportForm;

/*
        <Col span={6}>
          <FormItem label="设备sn" {...formItemLayout}>
            {getFieldDecorator("sn", {})(<Input placeholder="请输入设备sn" />)}
          </FormItem>
        </Col>*/
