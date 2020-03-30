import React from 'react';
import {
    Icon
} from 'antd';
class HomeTop extends React.Component {
    // constructor() {
    //     super();
        
    // }
    render() {
        return <div className="homeTop">
                    <div className="top Ico1">
                        <Icon type="android" style={{color: 'rgb(7, 164, 44)' }}/>
                        <div className="topText">
                            <span>安卓</span>
                            <div>1256</div>
                        </div>
                    </div>
                    <div className="top Ico2">
                        <Icon type="apple" style={{color: '#000' }}/>
                        <div className="topText">
                            <span>苹果</span>
                            <div>658</div>
                        </div>
                    </div>
                    <div className="top Ico3">
                        <Icon type="windows"  style={{color: 'rgba(104, 104, 110, 0.68)' }}/>
                        <div className="topText">
                            <span>微软</span>
                            <div>455</div>
                        </div>
                    </div>
                    <div className="top Ico4">
                        <Icon type="dingding-o" style={{color: 'rgba(47, 199, 250, 0.965)' }}/>
                        <div className="topText">
                            <span>钉钉</span>
                            <div>362</div>
                        </div>
                    </div>
                </div>
    }
}
export default HomeTop