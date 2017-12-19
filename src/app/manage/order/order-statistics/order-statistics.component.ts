import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-order-statistics',
  templateUrl: './order-statistics.component.html',
  styleUrls: ['./order-statistics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderStatisticsComponent implements OnInit {

  businessOption: any
  greensOption:any
  shopOption:any
  constructor() {
  }

  ngOnInit() {
    this.getBusinessStatistics()
    this.getGreensSellStatistic()
    this.getShopSellStatistic()
  }

// 获取营业额统计
  getBusinessStatistics(){
    let data = [["2017-06-05",116],["2017-06-06",129],["2017-06-07",135],["2017-06-08",86],["2017-06-09",73],["2017-06-10",85],
      ["2017-06-11",73],["2017-06-12",68],["2017-06-13",92],["2017-06-14",130],["2017-06-15",245],["2017-06-16",139],
      ["2017-06-17",115],["2017-06-18",111],["2017-06-19",309],["2017-06-20",206],["2017-06-21",137],["2017-06-22",128],
      ["2017-06-23",85],["2017-06-24",94],["2017-06-25",71],["2017-06-26",106],["2017-06-27",84],["2017-06-28",93],["2017-06-29",85],
      ["2017-06-30",73],["2017-07-01",83],["2017-07-02",125],["2017-07-03",107],["2017-07-04",82],["2017-07-05",44],["2017-07-06",72],
      ["2017-07-07",106],["2017-07-08",107],["2017-07-09",66],["2017-07-10",91],["2017-07-11",92],["2017-07-12",113],["2017-07-13",107],
      ["2017-07-14",131],["2017-07-15",111],["2017-07-16",64],["2017-07-17",69],["2017-07-18",88],["2017-07-19",77],["2017-07-20",83],
      ["2017-07-21",111],["2017-07-22",57],["2017-07-23",55],["2017-07-24",60]];

    let dateList = data.map(function (item) {
      return item[0];
    });
    let valueList = data.map(function (item) {
      return item[1];
    });

    this.businessOption = {

      // Make gradient line here
      visualMap: [{
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
      }],


      title: [{
        left: 'center',
        text: '营业额走势图'
      }],
      tooltip: {
        trigger: 'axis',
        // formatter:'{Array | json}'
      },
      toolbox: {
        show: true,
        top:'2%',
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
      xAxis: [{
        data: dateList,
        name:'(时间)'
      }],
      yAxis: [{
        splitLine: {show: false},
        name:'(万元)'
      }],
      series: [{
        type: 'line',
        name:'营业额',
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
        showSymbol: false,
        data: valueList
      }]
    };
  }

//获取菜品销量统计
  getGreensSellStatistic(){
    this.greensOption = {
      title : {
        text: '菜品销量分布图',
        subtext: '',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        x : 'center',
        y : 'bottom',
        data:['蔬菜','主食','奶制品','肉类','冷冻类','火锅食品','干货','水果']
      },
      toolbox: {
        show : true,
        top:'2%',
        right:'6%',
        feature : {
          mark : {show: true},
          dataView : {show: true, readOnly: false},
          magicType : {
            show: true,
            type: ['pie', 'funnel']
          },
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      calculable : true,
      series : [
        {
          name:'半径模式',
          type:'pie',
          radius : [20, 110],
          center : ['25%', '50%'],
          roseType : 'radius',
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          lableLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          data:[
            {value:10, name:'蔬菜'},
            {value:5, name:'主食'},
            {value:15, name:'奶制品'},
            {value:25, name:'肉类'},
            {value:20, name:'冷冻类'},
            {value:35, name:'火锅食品'},
            {value:30, name:'干货'},
            {value:40, name:'水果'}
          ]
        },
        { name:'面积模式',
          type:'pie',
          radius : [30, 110],
          center : ['75%', '50%'],
          roseType : 'area',
          data:[
            {value:10, name:'蔬菜'},
            {value:5, name:'主食'},
            {value:15, name:'奶制品'},
            {value:25, name:'肉类'},
            {value:20, name:'冷冻类'},
            {value:35, name:'火锅食品'},
            {value:30, name:'干货'},
            {value:40, name:'水果'}
          ]
        }
      ]
    };
  }

//获取商户销量排名
  getShopSellStatistic(){

    // app.title = '堆叠柱状图';
    this.shopOption = {
      title : {
        text: '商户销量排名',
        subtext: '',
        x:'center'
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        x : 'center',
        y : 'bottom',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他']
      },
      toolbox: {
        show: true,
        top:'2%',
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
        top:'10%',
        left: '5%',
        right: '5%',
        bottom: '10%',
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
          name:'直接访问',
          type:'bar',
          data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
          name:'邮件营销',
          type:'bar',
          stack: '广告',
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'联盟广告',
          type:'bar',
          stack: '广告',
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          name:'视频广告',
          type:'bar',
          stack: '广告',
          data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
          name:'搜索引擎',
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
          name:'百度',
          type:'bar',
          barWidth : 5,
          stack: '搜索引擎',
          data:[620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
          name:'谷歌',
          type:'bar',
          stack: '搜索引擎',
          data:[120, 132, 101, 134, 290, 230, 220]
        },
        {
          name:'必应',
          type:'bar',
          stack: '搜索引擎',
          data:[60, 72, 71, 74, 190, 130, 110]
        },
        {
          name:'其他',
          type:'bar',
          stack: '搜索引擎',
          data:[62, 82, 91, 84, 109, 110, 120]
        }
      ]
    };

  }

}
