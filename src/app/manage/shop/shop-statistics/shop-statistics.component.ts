import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-statistics',
  templateUrl: './shop-statistics.component.html',
  styleUrls: ['./shop-statistics.component.scss']
})
export class ShopStatisticsComponent implements OnInit {

  constructor() { }
  kindsOption:any
  categoryOption:any
  ngOnInit() {
    this.getKindsStatistics()
    this.getCategoryStatixtics()
  }
  // 商户种类统计
  getKindsStatistics(){
    this.kindsOption = {
      title: {
        left: 'center',
        top:'5%',
        text: '交易趋势图'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top:'13%',
        data:['海鲜','肉类营业额','蔬菜营业额','干货营业额']
      },
      toolbox: {
        show: true,
        top:'17%',
        right:'6%',
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: {readOnly: false},
          magicType: {type: ['line', 'bar']},
          restore: {},
          saveAsImage: {}
        }
      },
      grid: {
        top:'25%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      yAxis: {
        type: 'value',
        splitLine: {show: false},
        name:'(万元/日)'
      },
      series: [
        {
          name:'干货营业额',
          type:'line',
          showSymbol: false,
          stack: '总量',
          areaStyle: {normal: {}},
          data:[22, 18, 19, 23, 29, 33, 31]
        },
        {
          name:'蔬菜营业额',
          type:'line',
          showSymbol: false,
          stack: '总量',
          areaStyle: {normal: {}},
          data:[15, 23, 20, 15, 19, 33, 41]
        },
        {
          name:'肉类营业额',
          type:'line',
          showSymbol: false,
          stack: '总量',
          areaStyle: {normal: {}},
          data:[32, 33, 30, 33, 39, 33, 32]
        },
        {
          name:'海鲜',
          type:'line',
          markPoint: {
            data: [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          },
          markLine: {
            data: [
              {type: 'average', name: '平均值'}
            ]
          },
          stack: '总量',
          areaStyle: {normal: {}},
          showSymbol: false,
          data:[69, 74, 69, 71, 87, 99, 104]
        }
      ]
    };
  }

  //商户品类统计
  getCategoryStatixtics(){
    this.categoryOption = {
      title: {
        left: 'center',
        top:'5%',
        text: '交易柱状图'
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        top:'50px',
        data:['猪肉','鸭肉','鱼','虾','蔬菜','青菜','生菜','花菜','其他']
      },
      toolbox: {
        show: true,
        top:'17%',
        right:'6%',
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: {readOnly: false},
          restore: {},
          saveAsImage: {}
        }
      },
      grid: {
        top:'25%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : ['周一','周二','周三','周四','周五','周六','周日']
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'猪肉',
          type:'bar',
          data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
          name:'鸭肉',
          type:'bar',
          stack: '广告',
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'鱼',
          type:'bar',
          stack: '广告',
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          name:'虾',
          type:'bar',
          stack: '广告',
          data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
          name:'蔬菜',
          type:'bar',
          data:[862, 1018, 964, 1026, 1679, 1600, 1570],
          markLine : {
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            },
            data : [
              [{type : 'min'}, {type : 'max'}]
            ]
          }
        },
        {
          name:'青菜',
          type:'bar',
          barWidth : 5,
          stack: '蔬菜',
          data:[620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
          name:'生菜',
          type:'bar',
          stack: '蔬菜',
          data:[120, 132, 101, 134, 290, 230, 220]
        },
        {
          name:'花菜',
          type:'bar',
          stack: '蔬菜',
          data:[60, 72, 71, 74, 190, 130, 110]
        },
        {
          name:'其他',
          type:'bar',
          stack: '蔬菜',
          data:[62, 82, 91, 84, 109, 110, 120]
        }
      ]
    };
  }
}
