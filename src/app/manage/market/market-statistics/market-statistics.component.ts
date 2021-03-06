import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from '@angular/core';
import {Market} from "../../market/shared/market.model";
import {MarketService} from "../../market/shared/market.service";
import {ModalService} from "rebirth-ng";
import { RepairReportsComponent } from "../repair-reports/repair-reports.component"


@Component({
  selector: 'app-market-statistics',
  templateUrl: './market-statistics.component.html',
  styleUrls: ['./market-statistics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MarketStatisticsComponent implements OnInit {

  businessOption: any
  businessOptionMerge: any
  greensOption: any
  greensOptionMerge: any
  shopOption: any
  shopOptionMerge: any
  isLoading: boolean = false
  markets: Market[]
  queryMarket = {'marketId': null, 'beginTime': "", 'endTime': ""}
  sale: any  // 市场营业额
  constructor(private marketService: MarketService,
              private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    /*this.getBusinessStatistics()
     this.getGreensSellStatistic()
     this.getShopSellStatistic()*/
    this.getAllMarkets()
  }

// 获取所有市场
  getAllMarkets() {
    this.marketService.getAll().subscribe(
      (markets) => {
        this.markets = markets;
        this.queryMarket.marketId = markets[0].id
        this.query(false)
      }
    )
  }

  // 判断是否字符串
  isString(str) {
    return (typeof str == 'string') && str.constructor == String;
  }
  //修复报表原始数据
  repair() {
    this.modalService.open<any>({
      component: RepairReportsComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
      }
    }).subscribe(market => {
      console.log('Rebirth Modal -> Get ok with result:', market)
    }, error => {

    })
  }

  query(second: boolean) {
    if (!this.isString(this.queryMarket.beginTime)) {
      this.queryMarket.beginTime = this.formatDateTime(this.queryMarket.beginTime)
    }
    if (!this.isString(this.queryMarket.endTime)) {
      this.queryMarket.endTime = this.formatDateTime(this.queryMarket.endTime)
    }
    if (this.queryMarket.beginTime == "") { //没有选择日期时，默认当前月
      let date = new Date()
      let year = date.getFullYear()
      let month: number | string = date.getMonth() + 1
      month = month < 10 ? `0${month}` : month
      let today: number | string = date.getDate()
      today = today < 10 ? `0${today}` : today
      // this.queryMarket.beginTime="2017-12-01" //测试数据，实际用当前月1号
      this.queryMarket.beginTime = `${year}-${month}-01`
      this.queryMarket.endTime = `${year}-${month}-${today}`
    }
    this.getBusinessStatistics()
    this.getGreensSellStatistic()
    this.getShopSellStatistic()
  }

// 获取营业额统计
  getBusinessStatistics() {
    this.marketService.getMarketStatistics(this.queryMarket.marketId, this.queryMarket.beginTime, this.queryMarket.endTime, 2)
      .subscribe((sale) => {
          this.sale = sale
          for (let i = 0; i < this.sale.length; i++) {
            this.businessOption.xAxis.data.push(this.sale[i].reportDate)
            this.businessOption.series[0].data.push(this.sale[i].totalOrigMoneyAmount)
            this.businessOption.series[1].data.push(this.sale[i].totalMoneyAmount)
          }
          this.businessOptionMerge = {
            series: this.businessOption.series,
            xAxis: this.businessOption.xAxis
          }
        }
      )
    this.businessOption = {
      title: {
        left: 'center',
        top: '5%',
        text: '市场营业额'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top: '13%',
        data: ['总原始金额', '总实际收入']
      },
      toolbox: {
        show: true,
        top: '17%',
        right: '6%',
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
        top: '25%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
      },
      yAxis: {
        type: 'value',
        splitLine: {show: false},
        name: ''
      },
      series: [
        {
          name: '总原始金额',
          type: 'line',
          showSymbol: false,
          data: []
        },
        {
          name: '总实际收入',
          type: 'line',
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
          data: []
        }
      ]
    };
  }

//获取菜品销量统计
  getGreensSellStatistic() {
    this.marketService.getMarketStatistics(this.queryMarket.marketId, this.queryMarket.beginTime, this.queryMarket.endTime, 1)
      .subscribe((greens) => {
        for (let i = 0; i < greens.length; i++) {
          this.greensOption.legend.data.push(greens[i].productName)
          this.greensOption.series[0].data.push({value: greens[i].totalQty, name: greens[i].productName})
          this.greensOption.series[1].data.push({value: greens[i].totalMoneyAmount, name: greens[i].productName})
        }
        this.greensOptionMerge = {
          legend: this.greensOption.legend,
          series: this.greensOption.series
        }
      })
    this.greensOption = {
      title: {
        text: '菜品销量分布图',
        subtext: '',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: []
      },
      toolbox: {
        show: true,
        top: '2%',
        right: '6%',
        feature: {
          mark: {show: true},
          dataView: {show: true, readOnly: false},
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
          radius: ['10%', '50%'],
          center: ['25%', '50%'],
          roseType: 'area',
          data: []
        },
        {
          name: '销售金额',
          type: 'pie',
          radius: ['10%', '50%'],
          center: ['75%', '50%'],
          roseType: 'area',
          data: []
        }
      ]
    };
  }

//获取商户销量排名
  getShopSellStatistic() {
    this.marketService.getMarketStatistics(this.queryMarket.marketId, this.queryMarket.beginTime, this.queryMarket.endTime, 0)
      .subscribe((shops) => {
        for (let i = 0; i < shops.length; i++) {
          this.shopOption.xAxis.data.push(shops[i].shopName)
          this.shopOption.series[0].data.push(shops[i].totalMoneyAmount)
        }
        this.shopOptionMerge = {
          xAxis: this.shopOption.xAxis,
          series: this.shopOption.series
        }
      })

    this.shopOption = {
      color: ['#21dbd8'],
      title: {
        text: '商户销量排名',
        subtext: '',
        x: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        top: '2%',
        right: '6%',
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
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: [
        {
          type: 'value',
          name: ''
        }
      ],
      series: [
        {
          name: '销售金额',
          type: 'bar',
          barWidth: 30,
          data: []
        }
      ]
    };
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
    this.queryMarket.endTime = ""
    this.queryMarket.beginTime = ""
    this.query(false)
  }
}
