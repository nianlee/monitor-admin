
import React from 'react'
import PropTypes from 'prop-types'
import { connect} from 'dva'
import { Table,Button,Input,Icon,Popconfirm } from 'antd'


EditableCell.propTypes = {
  editable:PropTypes.object,
  value:PropTypes.object,
  onchange:PropTypes.func,
}

class EditableCell extends React.Component {

  // 属性
  state = {
    value:this.props.value,
    editable:false,
  }

  //function
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({value});
  }

  //检查状态
  check = () => {
    this.setState({ editable:false }); // 设置状态值
    if(this.props.onchange) {
      this.props.onchange(this.state.value);
    }
  }

  //编辑,直接设置新的属性
  edit = ()=> {
    this.setState({editable:true});
  }

  render() {
    const { value,editable } = this.state;
    return (
      <div className="">
        {
          editable ?
            <div>
              <Input
                value={value}
                onChange = {this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className=""
                onClick={this.check}
              />
            </div>
            :
            <div>
              {value || ''}
              <Icon
                type="edit"
                className=""
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

//定义表格
class  EditableTable extends React.Component {
  //构造函数
  constructor(props) {
    super(props);
    //定义列
    this.columns =[
      {
        title:'设备名称',
        dataIndex:'设备名称',
        width:'10%',
        render:(text,record) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(record.key,name)}
          />
        ),
      },
      {
        title:'sn',
        dataIndex:'sn',
        width:'10%',
        render:(text,record) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(record.key,name)}
          />
        ),
      },
      {
        title:'地址',
        dataIndex:'地址',
        width:'10%',
        render:(text,record) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(record.key,name)}
          />
        ),
      },
      {
        title:'设备厂商',
        dataIndex:'设备厂商',
        width:'10%',
        render:(text,record) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(record.key,name)}
          />
        ),
      },
      {
        title:'设备类型',
        dataIndex:'设备类型',
        width:'10%',
        render:(text,record) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(record.key,name)}
          />
        ),
      },
      {
        title:'设备状态',
        dataIndex:'设备状态',
        width:'10%',
        render:(text,record) => (
          <EditableCell
            value={text}
            onChange={this.onCellChange(record.key,name)}
          />
        ),
      },
      {
        title:'删除',
        dataIndex:'删除',
        width:'10%',
        render:(text,record) => {
          return (
            // 如果数据源超过一个就可以伤处。
            this.state.dataSource.length > 1 ?
              (
                <Popconfirm title="确定删除？" onConfirm={()=>this.onDelete(record.key)}>
                  <a href="javascript:;">删除</a>
                </Popconfirm>
              ):null
          );
        },
      },
      ];

    // 初始化数据
    this.state = {
      dataSource:[
        {
        key:'1',
        设备名称:'设备1',
        sn:'11-22-33-44',
        地址:'关电园',
        设备厂商:'XXX公司',
        设备类型:'挂机设备',
        设备状态:'正常'
        },
        {
          key:'2',
          设备名称:'设备2',
          sn:'11-22-33-44',
          地址:'关电园',
          设备厂商:'XXX公司',
          设备类型:'挂机设备',
          设备状态:'宕机'
        },
      ]
    };
  }

  //一行数据变化函数
  onCellChange = (key,dataIndex) => {
    return (value)=>{
      const dataSource = [...this.state.dataSource]; //赋值数据
      const target = dataSource.find(item => item.key === key); // 根据index找到改变的item
      if(target) { //如果找到了
        target[dataIndex] = value;
        this.setState({ dataSource }); // 更新数据源
      }
    }
  };

  //删除设备函数
  onDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({dataSource:dataSource.filter(item => item.key != key)}); //筛选出不是这个元素的其他所有元素
  };


  //添加设备函数
  handleAdd = () => {
    // 定义数据来源
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      设备名称:'add_name',
      sn:'55-66-77',
      地址:'关电园',
      设备厂商:'XXX公司',
      设备类型:'挂机设备',
      设备状态:'宕机'
    };

    this.setState({
      dataSource:[...dataSource,newData],
      count:count+1,
    });
  }

  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
        <Button className="" onClick={this.handleAdd}>添加</Button>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    )
  }
}

const DevicesTables = (manage,dispatch) =>{
  return (
    <EditableTable/>
  );
}

DevicesTables.propTypes = {
  manage:PropTypes.object,
  dispatch:PropTypes.object,
}

export default connect(({ manage }) => ({ manage }))(DevicesTables)






