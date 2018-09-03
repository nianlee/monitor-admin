import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Row, Col, Input, Checkbox, Cascader } from "antd";
import EquipmentMap from "./components/EquipmentMap";
import Detail from "./components/Detail";
import styles from "./style.less";

const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;

const Gis = ({ gis, dispatch }) => {
  const handleSearch = value => {
    let queryKey = value || "";
    dispatch({
      type: "gis/queryDevices",
      payload: { queryKey, sourceType: "fuzzyQuery" }
    });
  };

  const checkBoxOptions = [
    { label: "正常设备", value: "1" },
    { label: "故障设备", value: "-1" }
  ];

  const checkBoxChange = checkedValues => {
    const dataList = checkedValues.reduce((acc, cur) => {
      return acc.concat(gis.allDataList.filter(item => item.state == cur));
    }, []);

    dispatch({ type: "gis/updateState", payload: { dataList } });
  };

  const areaLoadData = selectedOptions => {
    dispatch({
      type: "gis/queryAreaByParentCode",
      payload: selectedOptions
    });
  };

  const areaChange = (value, selectedOptions) => {
    if (!value) return;

    dispatch({
      type: "gis/queryDevices",
      payload: {
        areaLevel: value.length,
        areaCode: value[value.length - 1],
        sourceType: "areaChange"
      }
    });
  };

  return (
    <div>
      <Row gutter={24} style={{ backgroundColor: "#3b3b45" }}>
        <Col span="8" style={{ textAlign: "center", lineHeight: "80px" }}>
          <CheckboxGroup
            className="gis-checkbox"
            options={checkBoxOptions}
            onChange={checkBoxChange}
          />
        </Col>
        <Col span="8" style={{ lineHeight: "80px" }}>
          <Cascader
            changeOnSelect
            style={{ width: "100%" }}
            placeholder="请选择区域"
            options={gis.regionList}
            loadData={areaLoadData}
            onChange={areaChange}
          />
        </Col>
        <Col span="8">
          <Search
            defaultValue={gis.sn}
            className={styles.search}
            placeholder="请输入设备编号"
            enterButton="搜索"
            onSearch={handleSearch}
          />
        </Col>
      </Row>
      <Row gutter={24} className={styles.main}>
        <Col span={18} className={styles.map}>
          <EquipmentMap gis={gis} dispatch={dispatch} />
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
