import axios from 'axios'
async function GetXinGuanData (){//获取新冠病毒数据
    await axios.get('/fy/get/').then((res)=>{
        if(res.status === 200){
            console.log(JSON.parse(res.data))
        }
    }).catch((error)=>{
        console.log(error)
    })
}
async function Getlist() {//获取列表名单
    await axios.get('/list').then((res) => {
        console.log(res)
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
export {Getlist,GetXinGuanData}