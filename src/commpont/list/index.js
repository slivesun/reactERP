import React from 'react';
import {
    Table,
    Button,
    Input,
    message,
    Modal
} from 'antd';
import ListModle from './listmodle';
import '../../less/list.less';
import {Getlist} from '../../http/http';

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
            visible:false,//删除提示框开关
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
    componentDidMount() {//初始化数据 请求数据
        this.setState({
            data: JSON.parse(localStorage.getItem('listdata')||[]),
            saji: false,
            columns: JSON.parse(localStorage.getItem('listcolumns')||[])

        })        
        Getlist()//请求数据
    }
    Operationaldata =(mode)=>{//操作数据
        let {tempdata} = this.state
        switch (mode.control.code) {
            case 0://点击新增走这里
                this.setState({
                    modleshow:mode.state,
                    control:{
                        title:mode.control.title,
                        code:mode.control.code
                    }
                })  
                break;
            case 9://新增确认走这里
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
                break;
            case 1://点击编辑按钮时走这里
                if(this.state.data<1){ 
                    message.info(`暂无数据！`) 
                    return
                }
                if (tempdata.length > 1 || tempdata.length < 1) {//编辑信息只能选中一条
                    message.info(`请选中其中一条! 您已选中${tempdata.length}条！`) 
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
                break;
            case 8://编辑确认按钮走这里code为8时为
                let tempary = this.state.data.map((item)=>{
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
                    }
                })
                break;
            case 7://code 为7时为取消按钮走这里  
                this.setState({
                    modleshow:mode.state,
                    control:{
                        code:mode.control.code
                    }
                })
                break;
            case 'del'://删除走这里code 为 'del'
                if(tempdata.length>=1){
                    this.setState({
                        visible:true
                    })
                    return
                }
                message.info(`您当前选中 ${tempdata.length} 条数据，操作无效!`);
                break;
            default:
                break
        }
    } 
    handleOk = () => {//删除确认走这里
        let {data,tempdata} = this.state;
        let ary = tempdata.map((t)=>t.key);
        // 过滤掉所有选中的数据
        data = data.filter((item)=>{
            return !ary.includes(item.key)
        })        
        this.setState({
            data:data,
            tempdata:[],
            visible:false
        })
        localStorage.setItem('listdata',JSON.stringify(data));
        message.success('删除成功！');
    }
    handleCancel = () => {//删除取消走这里
        this.setState({
        visible: false,
        });
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
                {/* 操作弹框 */}
                <ListModle  
                    modleshow={modleshow}
                    Operationaldata = {(mode)=>{this.Operationaldata(mode)}}
                    control={control}
                ></ListModle>
                {/* 删除确认提示框 */}
                <Modal
                    title="是否确认删除?"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    >
                        <p>您将删除选中的所有信息！</p>
                </Modal>
                <div className='list_operation'>
                    {/* 新增 */}
                    <Button type="primary" 
                        onClick={()=>{this.Operationaldata({state:true,control:{title:operation[0],code:0}})}}>{operation[0]}</Button>
                    {/* 编辑 */}
                    <Button type="dashed"  
                        onClick={()=>{this.Operationaldata({state:true,control:{title:operation[1],code:1}})}}>{operation[1]}</Button>
                    {/* 删除 */}
                    <Button type="danger" 
                        onClick={()=>{this.Operationaldata({control:{title:operation[2],code:'del'}})}}>{operation[2]}</Button>
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