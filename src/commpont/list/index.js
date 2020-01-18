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
                    // localStorage.setItem('tempdata',JSON.stringify(selectedRows))
                    this.setState({
                        tempdata:[...selectedRows],
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
            let {tempdata} = this.state
            if (tempdata.length > 1 || tempdata.length < 1) {//编辑信息只能选中一条
                message.info(`编辑信息只能选中1条信息!您已选中${tempdata.length}条！`) 
                return
            }else{
                this.setState({//编辑信息渲染
                    modleshow:mode.state,
                    // data: JSON.parse(localStorage.getItem('listdata')),
                    control:{
                        title:mode.control.title,
                        code:mode.control.code,
                        modifydata:tempdata
                    }
                })
            }
            return
        }
        if(mode.control.code === 8){//编辑确认按钮走这里code为8时为
            // console.log(mode.changedata)
            // console.log(this.state.data)
            let tempary = this.state.data.map((item)=>{
                // console.log(item)
                return item.key === mode.changedata.key ? mode.changedata:item
            })
            localStorage.setItem('listdata',JSON.stringify(tempary))
            this.setState({
                data: JSON.parse(localStorage.getItem('listdata')),
                saji: false,
                modleshow:mode.state,
                tempdata:[mode.changedata],
                control:{
                    code:mode.control.code,
                    // modifydata:mode.changedata
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
        if(mode.control.code === 9){//新增确认走这里
            let copdata = JSON.parse(localStorage.getItem('listdata'))
            copdata.unshift(mode.changedata)//拼接子组件弹框传来的数据
            localStorage.setItem('listdata',JSON.stringify(copdata))//重新设置到数据中心
            this.setState({
                modleshow:mode.state,
                data: copdata,
                control:{
                    title:mode.control.title,
                }
            })
            return
        }
        
        if(mode.control.code === 7){//code 为7时为取消按钮走这里    
            this.setState({
                modleshow:mode.state,
                control:{
                    code:mode.control.code
                }
            })
            return
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
                rowSelection = {rowSelection}
                columns={columns} 
                dataSource={data}
                pagination={pagination}
                scroll={{ y: 360 }}
                ></Table>
            </div>;
    }
}
export default List