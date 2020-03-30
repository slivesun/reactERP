import React from 'react';
import HomeTop from './homeTop';
// import echarts from '../../echarts/echarts';//引入echarts文件创建图表
import HomeBottom from './homeBottom';

import '../../less/home.less';


class Home extends React.Component {

    componentDidMount(){
        
    }


    render() {
        return <div className='home'>
            <div className = 'homeWrap'>
                <HomeTop></HomeTop> 
                <HomeBottom></HomeBottom>
            </div>
        </div>;
    }
}
export default Home