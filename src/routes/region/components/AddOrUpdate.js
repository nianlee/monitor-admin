import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Modal } from "antd";

import styles from "../style.less";

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 12
  }
};

const AddOrUpdate = ({ region, dispatch, form }) => {
  const handleSubmit = e => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      if (region.operateType === "add") {
        console.log("Received values of form: ", fieldsValue);
        dispatch({
          type: "region/addArea",
          payload: {
            parentCode: region.selectedData.code,
            ...fieldsValue
          }
        });
      } else {
        dispatch({
          type: "region/editAreaById",
          payload: {
            code: region.selectedData.code,
            ...fieldsValue
          }
        });
      }
    });
  };

  const handleCancel = () => {
    dispatch({ type: "region/updateState", payload: { modalVisible: false } });
  };

  const { getFieldDecorator } = form;

  return (
    <Modal
      title={region.operateType === "add" ? "新增" : "修改"}
      okText="确认"
      cancelText="取消"
      visible={region.modalVisible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form className={styles.form}>
        <FormItem {...formItemLayout} label="名称">
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "请输入名称" }]
          })(<Input placeholder="请输入名称" />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

AddOrUpdate.propTypes = {
  region: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object
};

const formOptions = {
  mapPropsToFields(props) {
    let name = "";
    if (props.region.operateType === "edit" && props.region.selectedData) {
      name = props.region.selectedData.name;
    }

    return {
      name: Form.createFormField({
        value: name
      })
    };
  }
};

const WrapperAddOrUpdate = Form.create(formOptions)(AddOrUpdate);

export default WrapperAddOrUpdate;
