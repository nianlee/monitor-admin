import React ,{ Component }from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'
import styles from './style.less'

class ShowUserModal extends Component  {
  constructor(props) {
    super(props)

    this.state = {
      modalVisible:false,
    }
  }

  modalInit() {
    this.setState({modalVisiable:true});

  }

  modalOk() {
    this.setState({modalVisiable:false});
  }

  render() {
    return <div>
      <a href="javascript:;" onClick={this.modalInit.bind(this)}>查看</a>
      <Modal
        width={800}
        height={500}
        visible={this.state.modalVisiable}
        title="用户信息详情"
        okText="确认"
        cancelText="取消"
        onOk={this.modalOk.bind(this)}
        onCancel={this.modalOk.bind(this)}
      >
        <p className={styles.itemWrapper}>{this.props.selectUser.userName}</p>
        <p className={styles.itemWrapper}>{this.props.selectUser.realName}</p>
        <p className={styles.itemWrapper}>{this.props.selectUser.areaName}</p>
        <p className={styles.itemWrapper}>{this.props.selectUser.email}</p>
        <p className={styles.itemWrapper}>{this.props.selectUser.roleName}</p>
        <p className={styles.itemWrapper}>{this.props.selectUser.phone}</p>
        <p className={styles.itemWrapper}>{this.props.selectUser.jobNum}</p>
      </Modal>
    </div>
  }
}

ShowUserModal.propTypes = {
  selectUser:PropTypes.Object,
}

export default ShowUserModal


