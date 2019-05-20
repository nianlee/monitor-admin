import React, { Component } from "react";
import PropTypes from "prop-types";
import Loader from "components/loader/Loader";
import { connect } from "dva";

class LoginNoCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: true
    }
    console.log(this.props.dispatch)
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'login/loginLoad',
      payload: {
        userName: 'superadmin',
        userPw: '111111',
        remember: '1',
        very_code: '',
        very_code_flag: false
      }
    })
  }

  render() {
    return <Loader fullscreen spinning={this.state.spinning} />
  }
}

LoginNoCode.propTypes = {
  dispatch: PropTypes.func,
}

export default connect()(LoginNoCode);

