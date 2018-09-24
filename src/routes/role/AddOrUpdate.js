import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, Select } from "antd";
import { connect } from "dva";

import MenuSelect from "./components/MenuSelect";

import styles from "./style.less";

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 12
  }
};

const AddOrUpdate = ({ addOrUpdateRole, dispatch, form }) => {
  const handleSubmit = e => {
    e.preventDefault();

    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      if (addOrUpdateRole.type === "add") {
        dispatch({
          type: "addOrUpdateRole/addRole",
          payload: {
            ...fieldsValue,
            menuIds: fieldsValue.menuIds.join(",")
          }
        });
      } else {
        const payload = {
          id: addOrUpdateRole.id,
          ...fieldsValue,
          menuIds: fieldsValue.menuIds.join(",")
        };
        dispatch({ type: "addOrUpdateRole/editRoleById", payload: payload });
      }
    });
  };

  const { getFieldDecorator } = form;

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <FormItem {...formItemLayout} label="父角色">
          {getFieldDecorator("parentId", {
            rules: [{ required: true, message: "请选择父角色" }]
          })(
            <Select placeholder="请选择父角色">
              <Option key={0} value={0}>
                根节点
              </Option>
              {addOrUpdateRole.RoleListForDropdown &&
                addOrUpdateRole.RoleListForDropdown.map(role => (
                  <Option key={role.value} value={role.value}>
                    {role.name}
                  </Option>
                ))}
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="角色名称">
          {getFieldDecorator("roleName", {
            rules: [{ required: true, message: "请输入角色名称" }]
          })(<Input placeholder="请输入角色名称" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="角色描述">
          {getFieldDecorator("roleDesc", {
            rules: [{ required: true, message: "请输入角色描述" }]
          })(<Input placeholder="请输入角色描述" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="角色权限">
          {getFieldDecorator("menuIds", {
            rules: [{ required: true, message: "请输入角色描述" }]
          })(<MenuSelect dataSource={addOrUpdateRole.allMenus} />)}
        </FormItem>

        <FormItem
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 }
          }}
        >
          <Button type="primary" htmlType="submit">
            {addOrUpdateRole.type == "add" ? "新增" : "更新"}
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

AddOrUpdate.propTypes = {
  addOrUpdateRole: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object
};

const formOptions = {
  onFieldsChange(props, changedFields) {
    props.dispatch({
      type: "addOrUpdateRole/updateFormParams",
      payload: { ...changedFields }
    });
  },
  mapPropsToFields(props) {
    const { formParams } = props.addOrUpdateRole;

    return {
      parentId: Form.createFormField({
        ...formParams.parentId,
        value: formParams.parentId.value
      }),
      roleName: Form.createFormField({
        ...formParams.roleName,
        value: formParams.roleName.value
      }),
      roleDesc: Form.createFormField({
        ...formParams.roleDesc,
        value: formParams.roleDesc.value
      }),
      menuIds: Form.createFormField({
        ...formParams.menuIds,
        value: formParams.menuIds.value
      })
    };
  }
};

const WrapperAddOrUpdate = Form.create(formOptions)(AddOrUpdate);

export default connect(({ addOrUpdateRole }) => ({ addOrUpdateRole }))(
  WrapperAddOrUpdate
);
