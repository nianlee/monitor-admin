import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Row, Col, Select, Avatar, Card } from "antd";
import MonitorBlock from "./components/MonitorBlock";
import Block from "../../components/Block";

const Option = Select.Option;

const Monitor = ({ app }) => {
  return (
    <div>
      <Row>
        <Col span="16" style={{ height: "100%", background: "gray" }}>
          <Col span="8">
            <MonitorBlock />
          </Col>
          <Col span="8">
            <MonitorBlock />
          </Col>
          <Col span="8">
            <MonitorBlock />
          </Col>
          <Col span="8">
            <MonitorBlock />
          </Col>
          <Col span="8">
            <MonitorBlock />
          </Col>
          <Col span="8">
            <MonitorBlock />
          </Col>
        </Col>

        <Col span="8">
          <div>
            <Select defaultValue="设置1" style={{ width: "100%" }}>
              <Option value="设置1">设置1</Option>
              <Option value="设置2">设置2</Option>
              <Option value="设置3">设置3</Option>
              <Option value="设置3">设置4</Option>
            </Select>
            <Block style={{ margin: "5px auto", textAlign: "center" }}>
              <Avatar src={require("./img/cam.png")} alt="" />
              <Card
                title="设备详情"
                bordered={false}
                style={{ width: "100%", background: "light-blue" }}
              >
                <p>温度：1℃</p>
                <p>湿度：10</p>
                <p>3路交流电流：3i</p>
                <p>1路交流电压：3v</p>
                <p>6路交流电流：6i</p>
                <p>6路交流电压：6v</p>
                <p>2路DI：开</p>
                <p>倾斜状态：否</p>
                <p>水浸状态：否</p>
                <p>2路风扇状态：开</p>
                <p>3路交流控制状态：开</p>
                <p>8路直流控制状态：开</p>
              </Card>
            </Block>
          </div>
        </Col>
      </Row>
    </div>
  );
};

Monitor.propTypes = {
  app: PropTypes.object
};

export default connect(({ app }) => ({ app }))(Monitor);
