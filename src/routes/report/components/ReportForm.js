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
          <FormItem label="异常选择" {...formItemLayout} >
            {getFieldDecorator('unusual', {
            })(
              <Select placeholder="请选择">
                <Select.Option key={1} value="1">异常1</Select.Option>
                <Select.Option key={2} value="2">异常2</Select.Option>
                <Select.Option key={3} value="3">异常3</Select.Option>
                <Select.Option key={4} value="4">异常4</Select.Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem label="位置选择" {...formItemLayout} >
            {getFieldDecorator('address', {
            })(
              <Select placeholder="请选择">
                <Select.Option key={1} value="1">位置1</Select.Option>
                <Select.Option key={2} value="2">位置2</Select.Option>
                <Select.Option key={3} value="3">位置3</Select.Option>
                <Select.Option key={4} value="4">位置4</Select.Option>
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
