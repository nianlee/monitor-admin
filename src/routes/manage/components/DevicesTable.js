import React from 'react'
import PropTypes from 'prop-types'
import { Table,Button,Popconfirm} from 'antd'

/*
class EditableCell extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      value:this.props.value,
      editable:false,
    }

  }

  //function
  handleChange(e) {
    const value = e.target.value;
    this.setState({value});
  }

  //检查状态
  check() {
    this.setState({ editable:false }); // 设置状态值
    if(this.props.onchange) {
      this.props.onchange(this.state.value);
    }
  }

  //编辑,直接设置新的属性
  edit() {
    this.setState({editable:true});
  }

  render() {
    const { value,editable } = {this.props.value,this.props.editable};
    console.log('******')
    console.log(this.state)
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

EditableCell.propTypes = {
  editable:PropTypes.object,
  value:PropTypes.object,
  onchange:PropTypes.func,
}
*/

const DevicesTables = ({ manage, dispatch }) => {

  //定义列
  const columns =[
    {
      title:'设备名称',
      dataIndex:'name',
      key:'name',
      width:'10%',
    },
    {
      title:'设备sn编码',
      dataIndex:'sn',
      key:'sn',
      width:'10%',
    },
    {
      title:'地址',
      dataIndex:'detailAddr',
      key:'detailAddr',
      width:'10%',
    },
    {
      title:'设备厂商',
      dataIndex:'manufacturer',
      key:'manufacturer',
      width:'10%',
    },
    {
      title:'设备类型',
      dataIndex:'type',
      key:'type',
      width:'10%',
    },
    {
      title:'设备状态',
      dataIndex:'state',
      key:'state',
      width:'10%',
    },

    {
      title:'删除',
      dataIndex:'删除',
      width:'10%',
      render: (text,record) => {
        manage.devicesListInfo.length > 1 ?
          (
            <Popconfirm title="确定删除？" onConfirm={()=>onDelete(record.key)}>
              <a>删除</a>
            </Popconfirm>
          ):null
      }
    }
  ];

  /*
  //一行数据变化函数
  function onCellChange (key,dataIndex){
    return (value)=>{
      const dataSource = [...this.state.dataSource]; //赋值数据
      const target = dataSource.find(item => item.key === key); // 根据index找到改变的item
      if(target) { //如果找到了
        target[dataIndex] = value;
        this.setState({ dataSource }); // 更新数据源
      }
    }
  }
  */


  //删除设备函数
  function onDelete(key) {
    const dataSource = [...manage.devicesListInfo];
    this.setState({dataSource:dataSource.filter(item => item.key != key)}); //筛选出不是这个元素的其他所有元素
  }


  //添加设备函数
  function handleAdd(){
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

  return (
    <div>
      <Button className="" onClick={handleAdd}>添加</Button>
      <Table bordered dataSource={manage.devicesListInfo} columns={columns} />
    </div>
  );
}



/*
EditableTable.propTypes = {
  editable:PropTypes.object,
  value:PropTypes.object,
  onchange:PropTypes.func,
}*/

DevicesTables.propTypes = {
  manage:PropTypes.object,
  dispatch:PropTypes.func,
}


export default DevicesTables






