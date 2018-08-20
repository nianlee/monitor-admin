import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import _ from "lodash";

import styles from "../style.less";

const findChildIds = (datas, id) => {
  const level1Item = datas.find(item => item.id === id);
  if (level1Item && level1Item.childrenList) {
    return level1Item.childrenList.map(item => item.id);
  } else {
    return [];
  }
};

const findParentId = (datas, id) => {
  for (let data of datas) {
    if (
      data.childrenList &&
      data.childrenList.findIndex(item => item.id === id) > -1
    ) {
      return data.id;
    }
  }
  return null;
};

class MenuSelect extends Component {
  constructor(props) {
    super(props);
    const value = props.value;
    this.state = {
      selected: value || []
    };
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ("value" in nextProps) {
      const value = nextProps.value;

      if (value) {
        this.setState({ selected: value });
      }
    }
  }

  triggerChange(values) {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(values.slice());
    }
  }

  level1Change(e) {
    const ids = findChildIds(this.props.dataSource, e.target.value).concat(
      e.target.value
    );
    if (e.target.checked) {
      const addIds = this.state.selected.concat(ids);
      const uniqIds = _.uniq(addIds);
      this.setState({ selected: uniqIds });

      this.triggerChange(uniqIds);
    } else {
      const removeIds = _.without(this.state.selected, ...ids);
      this.setState({ selected: removeIds });
      this.triggerChange(removeIds);
    }
  }

  level2Change(e) {
    const value = e.target.value;
    const parentId = findParentId(this.props.dataSource, value);
    if (e.target.checked) {
      const ids = this.state.selected.concat(parentId, value);
      const uniqIds = _.uniq(ids);
      this.setState({ selected: uniqIds });
      this.triggerChange(uniqIds);
    } else {
      // 判断二级菜单是否有元素被选中，如果没有，那么父级元素也取消选中
      let ids = _.without(this.state.selected, value);
      const siblings = findChildIds(this.props.dataSource, parentId);
      const hasChildIn =
        ids.findIndex(item => siblings.indexOf(item) > -1) > -1;

      if (!hasChildIn) {
        ids = _.without(ids, parentId); // 移除父级元素
      }
      this.triggerChange(ids);
      this.setState({ selected: ids });
    }
  }

  renderCheckBox() {
    const { dataSource } = this.props;
    if (!dataSource) return "";

    const isChecked = item => {
      return this.state.selected.indexOf(item.id) > -1;
    };

    const renderChild = data => {
      return data.map(item => {
        return (
          <Checkbox
            value={item.id}
            key={item.id}
            checked={isChecked(item)}
            onChange={this.level2Change.bind(this)}
          >
            {item.menuName}
          </Checkbox>
        );
      });
    };

    return dataSource.map(item => {
      if (item.childrenList) {
        return (
          <div key={item.id}>
            <Checkbox
              value={item.id}
              onChange={this.level1Change.bind(this)}
              checked={isChecked(item)}
            >
              {item.menuName}
            </Checkbox>
            <div className={styles.level2}>
              {renderChild(item.childrenList)}
            </div>
          </div>
        );
      }

      return (
        <div key={item.id}>
          <Checkbox
            key={item.id}
            value={item.id}
            onChange={this.level1Change.bind(this)}
            checked={isChecked(item)}
          >
            {item.menuName}
          </Checkbox>
        </div>
      );
    });
  }

  render() {
    return <div className={styles.checkboxWapper}>{this.renderCheckBox()}</div>;
  }
}

MenuSelect.propTypes = {
  dataSource: PropTypes.array,
  value: PropTypes.array,
  onChange: PropTypes.func
};

export default MenuSelect;
