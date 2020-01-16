import React from 'react';
import {
    Table,
    Button,
    Input,
    message 
} from 'antd';
import ListModle from './listmodle';
import '../../less/list.less';
import Getlist from '../../http/list';

// import ReactDOM from 'react-dom';
const Search = Input.Search;
class List extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [], //列表数据
            saji: true, //控制页面是否加载页
            columns: [], //表格头部
            modleshow:false,//编辑框开关
            operation:['新增','编辑','删除'],//操作按钮
            control:{//弹框标题及操作按钮识别及内容
                title:'',//操作名称
                code:null,//操作识别码
                modifydata:[{}]//编辑修改数据
            },
            tempdata:[],//选中数据编辑暂存
            pagination:{
                pageSize:10,//每页列表显示条数
            },
            rowSelection:{//选中回调
                onChange: (selectedRowKeys, selectedRows) => {//选中的每条数据key，及数据
                    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    this.setState({
                        tempdata:[...selectedRows]
                    })
                },
                getCheckboxProps: record => ({
                    disabled: record.name === 'Disabled User', // Column configuration not to be checked
                }),
            }
        }
    }

    componentDidMount() {
        this.setState({
            data: JSON.parse(localStorage.getItem('listdata')||[]),
            saji: false,
            columns: JSON.parse(localStorage.getItem('listcolumns')||[])

        })        
        Getlist()//请求数据
    }
    Operationaldata =(mode)=>{//操作数据
        if (mode.control.code === 1){//点击编辑按钮时走这里
            if (this.state.tempdata.length >1 ||this.state.tempdata.length<1) {//编辑信息只能选中一条
                message.info('编辑信息>有且只能选中一条信息!') 
                return
            };
            this.setState({//编辑信息渲染
                modleshow:mode.state,
                // data: JSON.parse(localStorage.getItem('listdata')),
                control:{
                    title:mode.control.title,
                    code:mode.control.code,
                    modifydata:this.state.tempdata
                }
            })
            return
        }
        if(mode.control.code === 0){//点击新增走这里
            this.setState({
                modleshow:mode.state,
                // data: JSON.parse(localStorage.getItem('listdata')),
                control:{
                    title:mode.control.title,
                    code:mode.control.code
                }

            })  
            return
        }
        if(mode.control.code === 9){
            let copdata = JSON.parse(localStorage.getItem('listdata'))
            copdata.unshift(mode.datae)//拼接子组件弹框传来的数据
            localStorage.setItem('listdata',JSON.stringify(copdata))//重新设置到数据中心
            this.setState({
                modleshow:mode.state,
                data: copdata,
                control:{
                    title:mode.control.title,
                    code:mode.control.code
                }
            })
        }
        if(mode.control.code === 8){//code为8时为编辑确认按钮走这里
            this.setState({
                modleshow:mode.state,
                control:{
                    code:mode.control.code
                }
            })
        }        
    }  
    render() {
        let {
            saji,
            data,
            columns,
            rowSelection,
            pagination,
            modleshow,
            operation,
            control
        } = this.state
        return<div className='list'>
                <ListModle  
                    modleshow={modleshow}
                    Operationaldata = {(mode)=>{this.Operationaldata(mode)}}
                    control={control}
                ></ListModle>
                <div className='list_operation'>
                    {/* 新增 */}
                    <Button type="primary" 
                        onClick={()=>{this.Operationaldata({state:true,control:{title:operation[0],code:0}})}}>{operation[0]}</Button>
                    {/* 编辑 */}
                    <Button type="dashed"  
                        onClick={()=>{this.Operationaldata({state:true,control:{title:operation[1],code:1}})}}>{operation[1]}</Button>
                    <Button type="danger" >{operation[2]}</Button>
                    <Search
                        placeholder="输入姓名或编号搜索"
                        style={{ width: 200 }}
                        onSearch={value => console.log(value)}
                    />
                </div>
                <Table 
                bordered={true} 
                loading={saji} 
                rowSelection={rowSelection} 
                columns={columns} 
                dataSource={data}
                pagination={pagination}
                scroll={{ y: 360 }}
                ></Table>
            </div>;
    }
}
export default List