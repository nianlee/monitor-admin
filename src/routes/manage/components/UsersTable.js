import React from 'react'
import PropTypes from 'prop-types'
import { connect} from 'dva'
import { Table,Input,Popconfirm } from 'antd'

const EditableCell = ({editable,value,onchange}) => (
  <div>
    {editable
      ? <Input style={{margin:'-5px 0'}} value={value} onChange={e =>onchange(e.target.value)}/>
        :value
    }
  </div>
);


const UsersTable = ({ manage,dispatch }) => {
  const data = [];
  for (let i = 0;i<100;i++) {
    data.push({
      序号:i.toString(),
      用户名:'wdy ${i}',
      部门:'运维 ${i}部',
      权限:'权限 ${i}'});
  }

  const columns = [
    {
      title:'序号',
      dataIndex:'序号',
      width:'25%',
      render:(text,record)=> renderColumns(text,record,'序号'),
    },
    {
      title:'用户名',
      dataIndex:'用户名',
      width:'15%',
      render:(text,record) => renderColumns(text,record,'用户名'),
    },
    {
      title:'部门',
      dataIndex:'部门',
      width:'15%',
      render:(text,record) => renderColumns(text,record,'部门'),
    },
    {
      title:'权限',
      dataIndex:'权限',
      width:'15%',
      render:(text,record) => renderColumns(text,record,'权限'),
    },
    {
      title:'管理',
      dataIndex:'管理',
      render: (text,record) => renderOperation(text,record),
      },
    ];

  // operation
  function renderOperation(text,record) {
    const { editable } = record;
    <div className="editable-row-operations">
      {
        editable ?
          <span>
            <a onClick={()=>save(record.key)}>保存</a>
            <Popconfirm title="确定取消?" onConfirm={()=>cancel(record.key)}>
              <a>取消</a>
            </Popconfirm>
          </span>
          : <a onClick={()=>edit(record.key)}>Edit</a>
      }
      <a>操作</a>
    </div>
  }


  function renderColumns(text,record,column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value=>handleChange(value,record.key,column)}
      />
    );
  }

    function handleChange(value,key,column) {
      const newData = [ ...data];
      const target = newData.filter(item=>key === item.key)[0];
      if(target) {
        target[column] = value;
        this.setState({data:newData});
      }
    }


    function edit(key) {
      const newData = [ ...data];
      const target = newData.filter(item=>key === item.key)[0];
      if(target) {
        target.editable = true;
        this.setState({data:newData});
      }
    }

    function save(key) {
      const newData = [ ...data];
      const target = newData.filter(item => key === item.key)[0];
      if(target) {
        delete  target.editable;
        this.setState({data:newData});
        this.cacheData = newData.map(item => ({ ...item }));
      }
    }

    function cancel(key) {
      const newData = [ ...data];
      const target = newData.filter(item=>key === item.key)[0];
      if(target) {
        Object.assign(target,this.cacheData.filter(item => key === item.key))[0];
        delete  target.editable;
        this.setState({data:newData});
      }
    }

  return(
    <Table bordered dataSource={data} columns={columns}/>
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

