import {Component}from 'react'

class AddModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visiable:false
    }
  }

  showModalHandler = e => {
    if (e) {
      e.stopPropagation()
    }
    this.setState({
      visiable: true
    })
  }

    hideModalHander = e => {
      if(e) {e.stopPropagation()}
      this.setState({
        visiable:false
      })
  }


}
/*const AddModal = ({ device, dispatch }) => {
  let vi = true;

  return(
    <Modal
           title="设备添加"
           visible={vi}
           footer={
             [
               <Button key="back" onClick={this.cancel}>取消</Button>,
               <Button key="submit" type="primary" onClick={this.ok}>
                 提交
               </Button>,
             ]
           }
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}


AddModal.propTypes = {
  device: PropTypes.object,
  dispatch: PropTypes.func,
}*/


export default AddModal
