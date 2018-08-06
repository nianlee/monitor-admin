import React from "react";
import PropTypes from "prop-types";
import { Row } from "antd";
import { connect } from "dva";

import ReportTable from "./components/ReportTable";
import ReportForm from "./components/ReportForm";

import styles from "./style.less";

const Loginlog = ({ loginlog, dispatch }) => {
  return (
    <div style={{ width: "100%" }}>
      <Row className={styles.searchWrapper}>
        <ReportForm dispatch={dispatch} loginlog={loginlog} />
      </Row>
      <Row className={styles.tableWrapper}>
        <ReportTable dispatch={dispatch} loginlog={loginlog} />
      </Row>
    </div>
  );
};

Loginlog.propTypes = {
  loginlog: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ loginlog }) => ({ loginlog }))(Loginlog);
