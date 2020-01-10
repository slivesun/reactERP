import React from 'react';
// import ReactDOM from 'react-dom';
import {Switch,Route,Redirect} from 'react-router-dom';
import { Layout } from 'antd';
//引入组件
import SiderA from '../commpont/sider/index';
import Home from '../commpont/home/index';
import List from '../commpont/list/index';
import Knowledge from '../commpont/knowledge/index';

import Headerbox from './header/header.js';

const { Header, Footer, Sider, Content } = Layout;
class Index extends React.Component {
    constructor() {
        super();    
        this.state={
            collapsed:false
        }
    }
    coll=(col)=>{//接收子级输入的数据改变collapsed状态  true/false
        this.setState({
            collapsed:col
        })
    }

    render() {
        return <div className='index_box'>
                    <Layout>
                        {/* 为了让侧边栏超出显示滚动条 添加了一个overflow：auto  以及一个类名  test-5，样式在 app.less中 */}
                        <Sider collapsed={this.state.collapsed} style={{overflow:'auto'}} className='test-5'>
                            <SiderA zom={col=>this.coll(col)}></SiderA>{/* zoom将函数传入子级获取collapsed状态使侧栏可以收缩 */}
                        </Sider>
                        <Layout>
                            <Header style={{color:'#ffffff',background:'rgb(51, 52, 52)'}}>
                                <Headerbox></Headerbox>
                            </Header>

                            <Content style={{background:'rgb(119, 135, 135)'}}>
                                <Switch>
                                    
                                    <Route path='/home' component={Home}></Route>
                                    <Route path='/list' component={List}></Route>
                                    <Route path='/knowledge' component={Knowledge}></Route>
                                    <Route path='/*' exact render={()=>{
                                    // 重定向
                                    return <Redirect to='/home'></Redirect>
                                    }}></Route>
                                </Switch>
                            </Content>
                            <Footer >Footer</Footer>
                        </Layout>
                    </Layout>
                </div>;
    }
}
export default Index