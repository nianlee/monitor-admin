import React from 'react'
import PropTypes from 'prop-types'
import { Row, Form, Button, DatePicker, Col } from 'antd'
import { connect }from 'dva'

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker

const TimeReport = ({ report, dispatch, form }) => {
  const { getFieldDecorator } = form
  

  return (
    <div style={{ width: '100%' }}>
      <Row style={{ width: '100%' }}>
        <Col style={{ width: 500, margin: '0 auto' }}>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('userName', {
              })(
                <RangePicker />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
              >
                查询
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
      <Row>
        
      </Row>
    </div>
  )
}

TimeReport.propTypes = {
  report: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object,
}

const WrapperTimeReport = Form.create()(TimeReport)

export default connect(({ report }) => ({ report }))(WrapperTimeReport)
