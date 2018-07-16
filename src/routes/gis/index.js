import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Row, Col, Input, Checkbox } from "antd";
import EquipmentMap from "./components/EquipmentMap";
import Detail from "./components/Detail";
import styles from "./style.less";

const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;

const Gis = ({ gis, dispatch }) => {
  const handleSearch = value => {
    if (value.length > 0) {
      dispatch({
        type: "gis/queryDeviceSelective",
        payload: {
          deviceSn: value
        }
      });
    }
  };

  const checkBoxOptions = [
    { label: "正常设备", value: "1" },
    { label: "异常设备", value: "3" },
    { label: "离线设备", value: "2" }
  ];

  const checkBoxChange = checkedValues => {
    const dataList = checkedValues.reduce((acc, cur) => {
      return acc.concat(gis.allDataList.filter(item => item.type == cur));
    }, []);

    dispatch({ type: "gis/updateState", payload: { dataList } });
  };

  return (
    <div>
      <Row gutter={24} style={{ backgroundColor: "#3b3b45" }}>
        <Col span="12" style={{ textAlign: "center", lineHeight: "80px" }}>
          <CheckboxGroup
            className="gis-checkbox"
            options={checkBoxOptions}
            onChange={checkBoxChange}
          />
        </Col>
        <Col span="12">
          <Search
            className={styles.search}
            placeholder="请输入设备编号(11-22-33-44-55)"
            enterButton="搜索"
            size="large"
            onSearch={handleSearch}
          />
        </Col>
      </Row>
      <Row gutter={24} className={styles.main}>
        <Col span={18} className={styles.map}>
          <EquipmentMap gis={gis} />
        </Col>
        <Col span={6}>
          <Detail gis={gis} dispatch={dispatch} />
        </Col>
      </Row>
    </div>
  );
};

Gis.propTypes = {
  gis: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ gis }) => ({ gis }))(Gis);
