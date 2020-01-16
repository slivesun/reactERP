import axios from 'axios'

export default async function Getlist() {
    await axios.get('http://rap2api.taobao.org/app/mock/242437/list').then((res) => {
        if (res.data.meta.status === 200) {//数据请求成功后设置到localstorage中方便list页面使用
            let a = JSON.stringify(res.data.data)
            let b = JSON.stringify(res.data.columns)
            localStorage.setItem('listdata',a)
            localStorage.setItem('listcolumns',b)
        }
    }).catch((err) => {
        console.log(err)
    })
  } 