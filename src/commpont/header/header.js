import React from 'react';
// import ReactDOM from 'react-dom';
import {Popover, Button,Avatar,Badge} from 'antd';

import '../../less/header.less';



let out=()=>{
  console.log('退出登录')
}
const content2 = (
    <div>
      <p>感谢您使用本系统！</p>
      <Button style={{marginLeft:40}} onClick={()=>{out()}}>退出</Button>
    </div>
  );
class Header extends React.Component {
    // constructor() {
    //     super();
        
        
    // }
    
     
    render() {
        return <div className='header_box'>
                <Popover content={content2} title="管理员" placement="topLeft">
                    <Badge count={0}><Avatar type="primary" style={{backgroundColor: '#87d068',}} size='large' >admin</Avatar></Badge>
                </Popover>
                
        </div>;
    }
}
export default Header