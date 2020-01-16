import React from 'react';
import { Input,Button,message} from 'antd';
class listModle extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            //表单value
            name:'' ,
            age:'',
            address:'',
            number:'',
            key:null
        }        
    }
    componentWillReceiveProps (nextprops){//父组件数据变化时
        let {modifydata} = nextprops.control
        if(nextprops.control.code===1){//只有code为1操作为编辑时才会走这里并把父级传来的数据渲染
            this.setState({
                name:modifydata[0].name,
                age:modifydata[0].age,
                address:modifydata[0].address,
                number:modifydata[0].number,
                key:modifydata[0].key
            })
        }
        
    }
    componentDidUpdate(){
        document.addEventListener('keydown',this.onkeydown);//提交表单时按下绑定回车键事件
    }
    onkeydown = (e)=>{//回车键确认提交事件
        if (e.keyCode === 13 && this.props.modleshow) {
            this.rel()//新增弹框 隐藏时 不执行新增函数
		}
    }
    qule =(con)=>{//取消新增
        this.props.Operationaldata(con)
        console.log(this.props.modifydata)
    }
    rel= ()=>{//确认按钮
        if(this.props.control.code === 0){//新增数据走这里
            let listdata = JSON.parse(localStorage.getItem('listdata'));
            let datae = {
                name:this.state.name,
                age:this.state.age,
                address:this.state.address,
                number:this.state.number,
                key:Number(Number(listdata.length)+1),//key值是唯一的添加key在原来的数据基础上加1
            }
            if(this.state.name === '' || this.state.age ===''|| this.state.adress ===''|| this.state.number ===''){//表单信息任一一个未添加全局提醒
                    message.info('新增所有信息不能为空!');
            }else{
                    this.props.Operationaldata({state:false,datae,control:{code:9}})
                    this.setState({
                        name:'',
                        age:'',
                        address:'',
                        number:''
                    })
            }
            return
        }
       if(this.props.control.code === 1){//编辑数据从这里出发直接将编辑好的state发送到父级
           console.log(this.state)
           this.props.Operationaldata({state:false,datae:this.state,control:{code:8}})
           this.setState({
                name:'',
                age:'',
                address:'',
                number:''
            })         
       }
    }
    changeinput = (e)=>{//新增表单实现双向数据绑定
        switch (e.target.name) {//根据input中的name属性判断修改那一值实现双向数据绑定
            case 'name':
                this.setState({
                    name:e.target.value,
                })
                break;
            case 'age':
                this.setState({
                    age:e.target.value,
                })
                break;
            case 'address':
                this.setState({
                    address:e.target.value,
                })
                break;
            case 'number':
                this.setState({
                    number:e.target.value
                })
                break;
            default:
                break;
               
        }
        
    }
    render() {
        let {name,age,address,number} = this.state
        let {modleshow,control} = this.props;
        return <div className='list_modle' style={{display:modleshow?'flex':'none'}}>
            <div className='list_modle_k'>
                <div className="list_modle_k_title">{control.title}</div>  
                <div className='list_modle_k_content'>
                    <Input addonBefore='姓名:' 
                           placeholder="请输入姓名"
                           value={name} name='name' onChange={(e)=>{this.changeinput(e)}}/>
                    <Input addonBefore='住址:' 
                           placeholder="请输入住址"
                           value={address} name='address' onChange={(e)=>{this.changeinput(e)}}/>
                    <Input addonBefore='年龄:' type='number'
                           placeholder="请输入年龄"
                           value={age} name='age' onChange={(e)=>{this.changeinput(e)}}/>
                    <Input addonBefore='编号:' type='number'
                           placeholder="请输入编号"
                           value={number} name='number' onChange={(e)=>{this.changeinput(e)}}/>
                </div>
                <div className='list_modle_k_btn'>
                    <Button onClick = {()=>{this.rel()}} type="primary">确认</Button>
                    <Button onClick = {()=>{this.qule(false)}}>取消</Button>
                </div>
            </div>
        </div>;
    }
}
export default listModle