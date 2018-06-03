import React, { Component } from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'
import MapAddress from 'components/MapAddress'

class AddressControl extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mapVisible: false,
      value: null,
    }
  }

  handleMap() {
    this.setState({ mapVisible: true })
  }

  modalOk() {
    console.log('ok')
    this.setState({ mapVisible: false })
  }

  modalCancel() {
    this.setState({ mapVisible: false })
  }

  onTrigger(value) {
    console.log(value)
    this.setState({ value: value })
    this.props.onChange(value)
  }

  render() {
    return <div >
      <span>{this.state.value && this.state.value.address}</span> 
      {this.state.value && this.state.value.address ? <br /> : ''}
      <a href="javascript:;" style={{marginLeft:'5px'}} onClick={this.handleMap.bind(this)}>地图上选择详细地址</a>
      <Modal
        width={800}
        height={500}
        visible={this.state.mapVisible}
        title="地址选择"
        okText="确认"
        cancelText="取消"
        onOk={this.modalOk.bind(this)}
        onCancel={this.modalCancel.bind(this)}
      >
        <MapAddress 
          style={{ height: 500 }}
          defaultCenter="渝北区"
          onChange={this.onTrigger.bind(this)}
        />
      </Modal>
    </div>
  }
}

AddressControl.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
}

export default AddressControl
