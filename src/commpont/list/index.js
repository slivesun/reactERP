import React from 'react';
import axios from 'axios';

// import ReactDOM from 'react-dom';
class List extends React.Component {
    constructor() {
        super();
        
    }
    componentWillMount(){
        axios.get('http://yapi.demo.qunar.com/mock/66563/react/list&id=1').then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() {
        return <div className='list'>
                list列表页管理
        </div>;
    }
}
export default List