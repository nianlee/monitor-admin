import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Form } from "antd";

const Loginnocode = ({ loginnocode, dispatch, form }) => {


  return (
    <div>
      <p>
        loginnocode
      </p>
    </div>
  );
};

Loginnocode.propTypes = {
  loginnocode: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object
};

const WrappedLogin = Form.create()(Loginnocode);

export default connect(({ loginnocode }) => ({ loginnocode }))(WrappedLogin);
