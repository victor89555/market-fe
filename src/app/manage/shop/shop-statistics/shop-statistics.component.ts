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
  distributionOption:any
  ngOnInit() {
    this.getKindsStatistics()
    this.getCategoryStatixtics()
    this.getDistributionStatistics()
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
        data:['干货营业额','蔬菜营业额','肉类营业额','海鲜']
      },
      toolbox: {
        show: true,
        top:'17%',
        right:'6%',
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: {
            readOnly: false,
            buttonColor:'#a4d2ae',
            optionToContent: function(opt) {
              let axisData = opt.xAxis[0].data;
              let series = opt.series;
              let table = '<table style="width:70%;text-align:center;"><tbody><tr>'
                + '<td>时间</td>';
                for(let i=0;i<series.length;i++){
                  table +='<td>' + series[i].name + '</td>'
                }
              table += '</tr>';
              for (let i = 0, l = axisData.length; i < l; i++) {
                table += '<tr>'
                  + '<td>' + axisData[i] + '</td>';
                  for(let j=0;j<series.length;j++){
                    table += '<td>' + series[j].data[i] + '</td>'
                  }
                table += '</tr>';
              }
              table += '</tbody></table>';
              return table;
            }
          },
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
        name:'(元/日)'
      },
      series: [
        {
          name:'干货营业额',
          type:'line',
          showSymbol: false,
          stack: '总量',
          areaStyle: {normal: {}},
          data:[220, 180, 190, 230, 290, 330, 310]
        },
        {
          name:'蔬菜营业额',
          type:'line',
          showSymbol: false,
          stack: '总量',
          areaStyle: {normal: {}},
          data:[150, 230, 200, 150, 190, 330, 410]
        },
        {
          name:'肉类营业额',
          type:'line',
          showSymbol: false,
          stack: '总量',
          areaStyle: {normal: {}},
          data:[320, 330, 300, 330, 390, 330, 320]
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
          data:[690, 740, 690, 710, 870, 990, 1040]
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
        top:'13%',
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
          dataView: {
            readOnly: false,
            buttonColor:'#a4d2ae'
          },
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

  // 交易菜品分布图
  getDistributionStatistics() {
    this.distributionOption = {
      title: {
        text: '菜品销量分布图',
        top:'5%',
        subtext: '',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        left: 'center',
        top:'13%',
        data: ['蔬菜', '主食', '奶制品', '肉类', '冷冻类', '火锅食品', '干货', '水果']
      },
      toolbox: {
        show: true,
        top:'17%',
        right:'6%',
        feature: {
          mark: {show: true},
          dataView: {
            show: true,
            readOnly: false,
            buttonColor:'#a4d2ae'
          },
          magicType: {
            show: true,
            type: ['pie', 'funnel']
          },
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      calculable: true,
      series: [
        {
          name: '销售数量',
          type: 'pie',
          radius: [35, 200],
          center: ['25%', '65%'],
          roseType: 'area',
          data: [
            {value: 40, name: '蔬菜'},
            {value: 30, name: '主食'},
            {value: 15, name: '奶制品'},
            {value: 25, name: '肉类'},
            {value: 20, name: '冷冻类'},
            {value: 15, name: '火锅食品'},
            {value: 5, name: '干货'},
            {value: 25, name: '水果'}
          ]
        },
        {
          name: '销售金额',
          type: 'pie',
          radius: [35, 200],
          center: ['75%', '65%'],
          roseType: 'area',
          data: [
            {value: 500, name: '蔬菜'},
            {value: 300, name: '主食'},
            {value: 150, name: '奶制品'},
            {value: 800, name: '肉类'},
            {value: 400, name: '冷冻类'},
            {value: 150, name: '火锅食品'},
            {value: 200, name: '干货'},
            {value: 350, name: '水果'}
          ]
        }
      ]
    }
  }
}
