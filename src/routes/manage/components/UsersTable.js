import React from 'react'
import PropTypes from 'prop-types'
import { connect} from 'dva'
import { Table,Input,Popconfirm } from 'antd'

const data = [];
for (let i = 0;i<100;i++) {
  data.push({
    序号:i.toString(),
    用户名:'wdy ${i}',
    部门:'运维 ${i}部',
    权限:'权限 ${i}'});
}

const EditableCell = ({editable,value,onchange}) => (
  <div>
    {editable
      ? <Input style={{margin:'-5px 0'}} value={value} onChange={e =>onchange(e.target.value)}/>
        :value
    }
  </div>
);

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title:'序号',
        dataIndex:'序号',
        width:'25%',
        render:(text,record)=>this.renderColumns(text,record,'序号'),
      },
      {
        title:'用户名',
        dataIndex:'用户名',
        width:'15%',
        render:(text,record) => this.renderColumns(text,record,'用户名'),
      },
      {
        title:'部门',
        dataIndex:'部门',
        width:'15%',
        render:(text,record) => this.renderColumns(text,record,'部门'),
      },
      {
        title:'权限',
        dataIndex:'权限',
        width:'15%',
        render:(text,record) => this.renderColumns(text,record,'权限'),
      },
      {
        title:'管理',
        dataIndex:'管理',
        render:(text,record) =>{
          const { editable } = record;
          return (
            <div className="editable-row-operations">
              {
                editable ?
                  <span>
                    <a onClick={()=>this.save(record.key)}>保存</a>
                    <Popconfirm title="确定取消?" onConfirm={()=>this.cancel(record.key)}>
                      <a>取消</a>
                    </Popconfirm>
                  </span>
                  : <a onClick={()=>this.edit(record.key)}>Edit</a>
              }
            </div>
          );
        },
      }];
    this.state = { data };
    this.cacheData = data.map(item=>({ ...item }));
  }

  renderColumns(text,record,column) {
    return (
      <EditableCell
      editable={record.editable}
      value={text}
      onChange={value=>this.handleChange(value,record.key,column)}
      />
    );
  }

  handleChange(value,key,column) {
    const newData = [ ...this.state.data];
    const target = newData.filter(item=>key === item.key)[0];
    if(target) {
      target[column] = value;
      this.setState({data:newData});
    }
  }

  edit(key) {
    const newData = [ ...this.state.data];
    const target = newData.filter(item=>key === item.key)[0];
    if(target) {
      target.editable = true;
      this.setState({data:newData});
    }
  }

  save(key) {
    const newData = [ ...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if(target) {
      delete  target.editable;
      this.setState({data:newData});
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }

  cancel(key) {
    const newData = [ ...this.state.data];
    const target = newData.filter(item=>key === item.key)[0];
    if(target) {
      Object.assign(target,this.cacheData.filter(item => key === item.key))[0];
      delete  target.editable;
      this.setState({data:newData});
    }
  }

  render() {
    return <Table bordered dataSource={this.manage.state.data} columns={this.columns}/>
  }
}

const UsersTable = ({ manage,dispatch }) => {

  return(
    <EditableTable/>
  );
}

EditableCell.propTypes = {
  editable:PropTypes.object,
  value:PropTypes.object,
  onchange:PropTypes.func,
}


UsersTable.propTypes = {
  manage:PropTypes.object,
  dispatch:PropTypes.func,
}

export default connect(({ manage }) => ({ manage }))(UsersTable)

