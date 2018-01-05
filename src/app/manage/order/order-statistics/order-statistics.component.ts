import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Market} from "../../market/shared/market.model";
import { MarketService } from "../../market/shared/market.service";

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
  isLoading:boolean = false
  updateOptions:any
  markets: Market[]
  queryMarket={'marketId':null,'beginTime':"", 'endTime': ""}
  dateFormat: any = {"beginDate": "", "endDate": ""}
  constructor(private marketService:MarketService) {
  }

  ngOnInit() {
    this.getBusinessStatistics()
    this.getGreensSellStatistic()
    this.getShopSellStatistic()
    this.getAllMarkets()
  }

// 获取营业额统计
  getBusinessStatistics(){
    this.businessOption = {
      title: {
        left: 'center',
        top:'5%',
        text: '市场营业额'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top:'13%',
        data:['营业总额','肉类营业额','蔬菜营业额','干货营业额']
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
          data:[22, 18, 19, 23, 29, 33, 31]
        },
        {
          name:'蔬菜营业额',
          type:'line',
          showSymbol: false,
          data:[15, 23, 20, 15, 19, 33, 41]
        },
        {
          name:'肉类营业额',
          type:'line',
          showSymbol: false,
          data:[32, 33, 30, 33, 39, 33, 32]
        },
        {
          name:'营业总额',
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
          showSymbol: false,
          data:[69, 74, 69, 71, 87, 99, 104]
        }
      ]
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
        { name:'销售数量',
          type:'pie',
          radius : [40, 210],
          center : ['25%', '50%'],
          roseType : 'area',
          data:[
            {value:40, name:'蔬菜'},
            {value:30, name:'主食'},
            {value:15, name:'奶制品'},
            {value:25, name:'肉类'},
            {value:20, name:'冷冻类'},
            {value:15, name:'火锅食品'},
            {value:5, name:'干货'},
            {value:25, name:'水果'}
          ]
        },
        { name:'销售金额',
          type:'pie',
          radius : [40, 210],
          center : ['75%', '50%'],
          roseType : 'area',
          data:[
            {value:800, name:'蔬菜'},
            {value:500, name:'主食'},
            {value:150, name:'奶制品'},
            {value:400, name:'肉类'},
            {value:300, name:'冷冻类'},
            {value:150, name:'火锅食品'},
            {value:200, name:'干货'},
            {value:250, name:'水果'}
          ]
        }
      ]
    };
  }
//获取商户销量排名
  getShopSellStatistic(){

    // app.title = '堆叠柱状图';
    this.shopOption = {
      color: ['#21dbd8'],
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
          data : ['金商户','李商户','王商户','陈商户','黄商户','蓝陈商户','赵成商户','徐商户','许商户','钟商户']
        }
      ],
      yAxis : [
        {
          type : 'value',
          name : '(万元/年)'
        }
      ],
      series : [
        {
          name:'销售金额',
          type:'bar',
          barWidth: '50%',
          data:[320, 310, 295, 267, 234, 221, 220, 215,198,193]
        }
      ]
    };
  }

// 异步获取数据
   getAsyncData(){
       //异步获取的数据
      let aquaticProduct = {
          name:'水产类',
          type:'line',
          showSymbol: false,
          data:[45, 34, 43, 23, 29, 53, 56]
        }
      this.businessOption.series.push(aquaticProduct)
       this.updateOptions = {
         series:this.businessOption.series
       }
   }

// 获取所有市场
  getAllMarkets(){
    this.marketService.getAll().subscribe(
      (markets)=>{
        this.markets = markets;
      }
    )
  }

  query(second: boolean) {
    if (second) {
      this.dateFormat.beginDate = this.formatDateTime(this.queryMarket.beginTime)
      this.dateFormat.endDate = this.formatDateTime(this.queryMarket.endTime)
      if (this.dateFormat.beginDate == "1970-01-01") {
        this.dateFormat.beginDate = null
        this.dateFormat.endDate = null
      }
    }
    // console.log(this.queryMarket.marketId  + this.dateFormat.beginDate + this.dateFormat.endDate)
  }


  formatDateTime(timeStamp) { // 时间格式化
    let date = new Date();
    date.setTime(timeStamp);
    let y = date.getFullYear();
    let m: number | string = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d: number | string = date.getDate();
    d = d < 10 ? ('0' + d) : d
    return y + '-' + m + '-' + d
  };

  reset() {
    this.queryMarket.marketId=null
    this.queryMarket.endTime = null
    this.queryMarket.beginTime = null
    this.dateFormat.beginDate = null
    this.dateFormat.endDate = null
    this.query(false)
  }
}
