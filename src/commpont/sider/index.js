import React from 'react';
import {
    Menu,
    Icon,
    Button
} from 'antd';
import {NavLink,withRouter } from 'react-router-dom'

const SubMenu = Menu.SubMenu;
class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        let sid = setTimeout(() => {//当stae数据改变后把改变的数据传入父级使侧边栏发生改变
            this.props.zom(this.state.collapsed)
            //定时器无用消毁
            clearTimeout(sid)
        }, 0);
    }

    render() {
        // 解决antd 侧边栏刷新时 选中状态会改变 在导出时包了一层 withrouter
        const path = this.props.location.pathname
        return <div className = 'slider'  >
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                {/* // 解决antd 侧边栏刷新时  defaultSelectedKeys 默认选中改为 路由路径，下方 key值也需要改*/}
                <Menu
                defaultSelectedKeys={[path]}
                mode="inline"
                theme="dark"
                style={{height:'100%',backgroundColor:'rgb(32, 32, 32)'}}
                >
                {/* ant-menu-item-selected */}
                    <Menu.Item key="/home">
                        <NavLink to='/home'>
                                <Icon type="pie-chart" />
                                <span>首页</span>
                        </NavLink>
                    </Menu.Item>

                    <Menu.Item key="/list">
                        <NavLink to='/list'>
                            <Icon type="desktop" />
                            <span>列表管理</span>
                        </NavLink>
                    </Menu.Item>
                    
                    <Menu.Item key="/knowledge">
                        <NavLink to='/knowledge'>
                            <Icon type="inbox" />
                            <span>react知识点</span>
                        </NavLink>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>组件</span></span>}>
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>react动画</span></span>}>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>react动画</span></span>}>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="appstore" /><span>react动画</span></span>}>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>;
    }
}
export default withRouter(Slider)