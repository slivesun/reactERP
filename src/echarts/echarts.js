import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts';
// import  'echarts/lib/chart/bar';
// import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

function HomeEcharts (el,obj){
     // 基于准备好的dom，初始化echarts实例
     var myChart = echarts.init(el);
     // 绘制图表
     myChart.setOption(obj);
}

export default {HomeEcharts}