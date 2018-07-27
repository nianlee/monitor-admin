import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, DatePicker, Select, Row, Col } from 'antd'
// import styles from './style.less'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker

const ReportForm = ({ report, dispatch, form }) => {

  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  return (
    <Form className="table-form" onSubmit={this.handleSubmit}>
      <Row gutter={16}>
        <Col span={6}>
          <FormItem label="时间选择" {...formItemLayout} >
            {getFieldDecorator('date', {
            })(
              <RangePicker />
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="用户选择" {...formItemLayout} >
            {getFieldDecorator('unusual', {
            })(
              <Select placeholder="请选择">
                <Select.Option key={1} value="1">用户1</Select.Option>
                <Select.Option key={2} value="2">用户2</Select.Option>
                <Select.Option key={3} value="3">用户3</Select.Option>
                <Select.Option key={4} value="4">用户4</Select.Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
            >
              查询
            </Button>
            <Button style={{ marginLeft: 12 }} type="primary">导出查询数据</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  )
}

ReportForm.propTypes = {
  report: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
}

const WrapperReportForm = Form.create()(ReportForm)

export default WrapperReportForm
