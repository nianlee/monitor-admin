import React from 'react'
import PropTypes from 'prop-types'
import { connect} from 'dva'
import { Avatar,Row,Col,Radio,Progress } from 'antd'




const MonitorBlock = ({ monitor,dispatch }) => {
  return(
    <div style={{height: '250px', width: '250px',background:'white',margin:'5px'}}>

      <Avatar src={require("../img/cam.png")} alt="" style={{margin:'5px'}}></Avatar>

      <Row>
        <Col span={12} style={{background:'#2ee00',marginLeft:'5px'}}>状态:<br/><Radio checked={true}/></Col>
        <Col span={12} style={{background:'#2ee00',marginLeft:'5px'}}>湿度:<Progress percent={20} /></Col>
      </Row>

      <Row>
        <Col span={12} style={{background:'#2ee00',marginLeft:'5px'}}>电流:<Progress percent={30}/></Col>
        <Col span={12} style={{background:'#2ee00',marginLeft:'5px'}}>电压:<Progress percent={35} /></Col>
      </Row>

    </div>
  );
}

MonitorBlock.propTypes = {
  monitor:PropTypes.object,
  dispatch:PropTypes.func,
}

export default connect(({ monitor }) => ({ monitor }))(MonitorBlock)

