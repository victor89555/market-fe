import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-market-statistics',
  templateUrl: './market-statistics.component.html',
  styleUrls: ['./market-statistics.component.scss']
})
/*export class MarketStatisticsComponent implements OnInit {

  constructor() { }
  dynamicData:any
  option:any
  private now: Date = new Date();
  count = 11
  updateOptions:any
  ngOnInit() {
    this.getDynamicData()
  }

  //获取动态数据

  getDynamicData(){
    this.dynamicData = {
      title: {
        text: '动态数据',
        subtext: '纯属虚构'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data:['最新成交价', '预购队列']
      },
      toolbox: {
        show: true,
        feature: {
          dataView: {readOnly: false},
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: (function (){
             // this.now = new Date();
            let res = [];
            let len = 10;
            while (len--) {
              res.unshift(this.now.toLocaleTimeString().replace(/^\D*!/,''));
             let now = new Date(this.now - 2000);
            }
            return res;
          })()
        },
        {
          type: 'category',
          boundaryGap: true,
          data: (function (){
            var res = [];
            var len = 10;
            while (len--) {
              res.push(len + 1);
            }
            return res;
          })()
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '价格',
          max: 20,
          min: 0,
          boundaryGap: [0.2, 0.2]
        },
        {
          type: 'value',
          scale: true,
          name: '预购量',
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2]
        }
      ],
      series: [
        {
          name:'预购队列',
          type:'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data:(function (){
            var res = [];
            var len = 10;
            while (len--) {
              res.push(Math.round(Math.random() * 1000));
            }
            return res;
          })()
        },
        {
          name:'最新成交价',
          type:'line',
          data:(function (){
            var res = [];
            var len = 0;
            while (len < 10) {
              res.push(Math.random()*10 + 5).toFixed(1);
              len++;
            }
            return res;
          })()
        }
      ]
    };

    setInterval(function (){
      this.axisData = (new Date()).toLocaleTimeString().replace(/^\D*!/,'');

      var data0 = this.dynamicData.series[0].data;
      var data1 = this.dynamicData.series[1].data;
      data0.shift();
      data0.push(Math.round(Math.random() * 1000));
      data1.shift();
      data1.push(Math.random() * 10 + 5).toFixed(1);

      this.dynamicData.xAxis[0].data.shift();
      this.dynamicData.xAxis[0].data.push(this.axisData);
      this.dynamicData.xAxis[1].data.shift();
      this.dynamicData.xAxis[1].data.push(this.count++);

      this.updateOptions= this.dynamicData
    }, 2100);
  }
}*/
/*export class MarketStatisticsComponent implements OnInit {

  ngOnInit() {
    this.getDynamicData()
  }
  options:any
  updateOptions:any
  getDynamicData(){
    function randomData() {
      now = new Date(+now + 1000);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          now,
          Math.round(value)
        ]
      }
    }var data = [];var now = new Date();var value = Math.random() * 1000;

    this.options = {
      title: {
        text: '动态数据 + 时间坐标轴'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          params = params[0];
          var date = new Date(params.name);
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [{
        name: '模拟数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data
      }]
    };
    setInterval(function () {
      //data.shift();
      data.push(randomData());
      this.updateOptions = {
        series: [{
          data:data
        }]
      };
    }, 1000);
  }
}*/
export class MarketStatisticsComponent implements OnInit, OnDestroy {
  options: any;
  updateOptions: any;
  private oneDay = 24 * 3600 * 1000;
  private now: Date;
  private value: number ;
  private data: any[];
  private timer: any;

  constructor() { }

  ngOnInit() {
    // generate some random testing data:
    this.data = [];
    this.now = new Date(1997, 9, 3);
    this.value = Math.random() * 1000;

    for (let i = 0; i < 1000; i++) {
      this.data.push(this.randomData());
    }

    // initialize chart options:
    this.options = {
      title: {
        text: 'Dynamic Data + Time Axis'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          params = params[0];
          let date = new Date(params.name);
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [{
        name: 'Mocking Data',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: this.data
      }]
    };

    // Mock dynamic data:
    this.timer = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        this.data.shift();
        this.data.push(this.randomData());
      }

      // update series data:
      this.updateOptions = {
        series: [{
          data: this.data
        }]
      };
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  randomData() {
    this.now = new Date(this.now.getTime() + this.oneDay);
    this.value = this.value + Math.random() * 21 - 10;
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
        Math.round(this.value)
      ]
    };
  }
}

