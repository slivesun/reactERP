import React from 'react';
import echartses from '../../echarts/echarts';
import echarts from 'echarts/lib/echarts';//为了散点图引进的
// import  'echarts';

import {GetXinGuanData} from '../../http/http.js';


class HomeBottom extends React.Component {

    componentDidMount(){
        GetXinGuanData()
        //饼状图
        let data = genData(10);
        let obj = {
            title: {
                text: '同名数量统计',
                subtext: '纯属虚构',
                textStyle:{
                    // lineHeight: ,
                },
                left: 'center',
                subtextStyle:{
                    lineHeight:60,
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                type: 'scroll',//图里类型 scroll/plain
                // orient: 'vertical',
                right: 0.1,
                top: 30,
                bottom: 20,
                data: data.legendData,
                selected: data.selected
            },
            series: [
                {
                    name: '姓名',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: data.seriesData,
                    legendHoverLink:true,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        function genData(count) {
            var nameList = [
                '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
            ];
            var legendData = [];
            var seriesData = [];
            var selected = {};
            for (var i = 0; i < count; i++) {
                name = Math.random() > 0.65
                    ? makeWord(4, 1) + '·' + makeWord(3, 0)
                    : makeWord(2, 1);
                legendData.push(name);
                seriesData.push({
                    name: name,
                    value: Math.round(Math.random() * 100000)
                });
                selected[name] = i < 6;
            }

            return {
                legendData: legendData,
                seriesData: seriesData,
                selected: selected
            };

            function makeWord(max, min) {
                var nameLen = Math.ceil(Math.random() * max + min);
                var name = [];
                for (var i = 0; i < nameLen; i++) {
                    name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
                }
                return name.join('');
            }
        }
        //柱状图
        let obj1 ={
            title: {
                show: true,
                text:'{a|各终端数量柱状图}',
                textStyle:{
                    with:'100%',
                    rich: {
                        a: {                            
                            fontSize:20,
                            lineHeight:25,
                            width:270,
                            color: '#eee',
                            backgroundColor:'#449911',
                            borderRadius: 8,
                            align:'center',
                            padding:5,
                            textShadowBlur: 5,
                            textShadowColor: '#000',
                            textShadowOffsetX: 3,
                            textShadowOffsetY: 3,
                        }
                    },
                },
                subtext:'{b|全平台数量可视图}',
                subtextStyle:{
                    rich: {
                        b: {
                            width: 270,
                            color: '#000',
                            borderRadius: 8,
                            align: 'center',
                        }

                    }
                }
            },
            legend:{
                show:true
            },
            color: ['#3398DB'],
            tooltip: {//指到柱状图后的提示框
                show:true,
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                show:true,
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['安卓', '苹果', '微软', '钉钉'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [{
                name: '直接访问',
                type: 'bar',
                barWidth: '80%',
                data: [1256, 658, 455, 362],
                itemStyle: {
                    normal: {
                        //这里是重点
                        color: function (params) {
                            //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                            var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265','#ca8622'];
                            return colorList[params.dataIndex]
                        }
                    }
                }
            }]
        }
        // 环状图
        let obj2 = {
            title:{
                text:'环状分布图',
                textStyle:{
                    // lineHeight: ,
                },
                left: 'center',
                subtextStyle:{
                    lineHeight:60,
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 0,
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    center:['62%','50%'],
                    radius: ['40%', '60%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {value: 335, name: '直接访问'},
                        {value: 310, name: '邮件营销'},
                        {value: 234, name: '联盟广告'},
                        {value: 135, name: '视频广告'},
                        {value: 1548, name: '搜索引擎'}
                    ]
                }
            ]
        };
        //折线图
        let obj3 = {
            title:{
                text:'折线增长图',
                textStyle:{
                    // lineHeight: ,
                },
                left: 'center',
                subtextStyle:{
                    lineHeight:60,
                }
            },
            tooltip: {
                trigger: 'item',
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]
        };

        //散点图
        let data2 = [
            [[29550,79.1,122249285,'Japan',1990],[2076,67.9,20194354,'North Korea',1990],[12087,72,42972254,'South Korea',1990],[24021,75.4,3397534,'New Zealand',1990],[43296,76.8,4240375,'Norway',1990],[10088,70.8,38195258,'Poland',1990],[19349,69.6,147568552,'Russia',1990],[10670,67.3,53994605,'Turkey',1990],[26424,75.7,57110117,'United Kingdom',1990],[37062,75.4,252847810,'United States',1990]],
            [[44053,81.1,80688545,'Germany',2015],[42182,82.8,329425,'Iceland',2015],[5903,66.8,13110,'India',2015],[36162,83.5,126573481,'Japan',2015],[1390,71.4,25155317,'North Korea',2015],[34644,80.7,50293439,'South Korea',2015],[34186,80.6,4528526,'New Zealand',2015],[64304,81.6,5210967,'Norway',2015],[24787,77.3,38611794,'Poland',2015],[23038,73.13,143456918,'Russia',2015],[19360,76.5,78665830,'Turkey',2015],[38225,81.4,64715810,'United Kingdom',2015],[53354,79.1,321773631,'United States',2015]]
        ];
        
        let obj4 = {
            backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
                offset: 0,
                color: '#f7f8fa'
            },
             {
                offset: 1,
                color: '#cdd0d5'
            }]),
            title: {
                text: '寿命与GDP',
                sutext:'1990-2015'
            },
            legend: {
                right: 10,
                data: ['1990', '2015']
            },
            xAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            yAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                scale: true
            },
            series: [{
                name: '1990',
                data: data2[0],
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[2]) / 5e2;
                },
                emphasis: {
                    label: {
                        show: true,
                        formatter: function (param) {
                            return param.data[3];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(251, 118, 123)'
                    }, {
                        offset: 1,
                        color: 'rgb(204, 46, 72)'
                    }])
                }
            }, {
                name: '2015',
                data: data2[1],
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[2]) / 5e2;
                },
                emphasis: {
                    label: {
                        show: true,
                        formatter: function (param) {
                            return param.data[3];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(129, 227, 238)'
                    }, {
                        offset: 1,
                        color: 'rgb(25, 183, 207)'
                    }])
                }
            }]
        };

        echartses.HomeEcharts(this.refs.MyEchartsA,obj)//饼状图
        echartses.HomeEcharts(this.refs.MyEchartsB,obj1)//柱状图
        echartses.HomeEcharts(this.refs.MyEchartsC,obj2)// 环状图
        echartses.HomeEcharts(this.refs.MyEchartsD,obj3)//折线图
        echartses.HomeEcharts(this.refs.MyEchartsE,obj4)//散点图
    }
    

    render() {
        return <div className="homeBottom">
                    <div className="homebottomtitle">
                        Echarts 平台数据表
                    </div>
                    <div className="echarts test-6">
                        <div className='MyEcharts' ref='MyEchartsA'>
                        </div>
                        <div className='MyEcharts' ref='MyEchartsB'>
                        </div>
                        <div className='MyEcharts' ref='MyEchartsC'>
                        </div>
                        <div className='MyEcharts' ref='MyEchartsD'>
                        </div>
                        <div className='MyEcharts' ref='MyEchartsE'>
                        </div>
                    </div>
                </div>
    }
}
export default HomeBottom