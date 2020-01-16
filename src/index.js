import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';

// 将 axios 挂载 到 React 上的步骤
import axios from 'axios'

// 挂载 Axios 之前，全局配置一下 transformRequest 参数即可
// transformRequest 作用，就是在发起 Post 请求之前，对要发送给服务器的数据，做一层包装转换
// post请求：如果没有指定content-type 则默认为text/plain chart-set=utf-8;而服务端一般认为application/x-www-form-urlencode
axios.defaults.transformRequest = [function (data, headers) { 
  // function 中的 data 就是要发送给服务器的数据
  // 在这里，我们要想办法，把 data 从 对象  { name: zs, age: 22 } ，转成 查询字符串   name=zs&age=22

  const arr = []
  for (let key in data) {
    arr.push(key + '=' + data[key])
  }

  // console.log(arr.join('&'))

  return arr.join('&')
}]

// 设置 全局的 baseURL
axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/242437'

// 将 axios 挂载 到 父类的 原型上；
React.Component.prototype.axios = axios

ReactDOM.render( <BrowserRouter>
    <App />
</BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
