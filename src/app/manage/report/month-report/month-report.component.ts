import {Component, OnInit} from '@angular/core';
import {MounthReport} from "../shared/report.model";
import {Market} from "../../market/shared/market.model";
import {MarketService} from "../../market/shared/market.service";
import {ReportService} from "../shared/report.service"
import {formatDate} from "../../../thurder-ng/utils/date-util";

@Component({
  selector: 'app-month-report',
  templateUrl: './month-report.component.html',
  styleUrls: ['./month-report.component.scss']
})
export class MonthReportComponent implements OnInit {


  constructor(private marketService:MarketService,
              private reportService: ReportService) { }

  markets: Market[] = []
  marketId: number = null
  preDay: string
  nowDay: string = formatDate(new Date(), 'yyyy-MM-dd').slice(0, 7)
  nextDay: string
  report: MounthReport = {
    days: ['01/01','01/02','01/03','01/04','01/05','01/06','01/07','01/08','01/09','01/10','01/11','01/12','01/13'],
    shopAmounts: [
      {
        shopId: 1,
        shopName: "王二牛肉店",
        amounts:[
          1000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000
        ]
      },
      {
        shopId: 2,
        shopName: "李四牛肉店",
        amounts:[
          1000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000
        ]
      }
      ,
      {
        shopId: 3,
        shopName: "李四牛肉店",
        amounts:[
          1000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000
        ]
      },
      {
        shopId: 2,
        shopName: "李四牛肉店",
        amounts:[
          1000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000
        ]
      }
      ,
      {
        shopId: 3,
        shopName: "李四牛肉店",
        amounts:[
          1000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000
        ]
      },
      {
        shopId: 2,
        shopName: "李四牛肉店",
        amounts:[
          1000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000
        ]
      }
      ,
      {
        shopId: 3,
        shopName: "李四牛肉店",
        amounts:[
          1000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000
        ]
      },
      {
        shopId: 2,
        shopName: "李四牛肉店",
        amounts:[
          1000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000
        ]
      }
      ,
      {
        shopId: 3,
        shopName: "李四牛肉店",
        amounts:[
          1000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000
        ]
      },
      {
        shopId: 2,
        shopName: "李四牛肉店",
        amounts:[
          1000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000
        ]
      }
      ,
      {
        shopId: 3,
        shopName: "李四牛肉店",
        amounts:[
          1000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000
        ]
      },
      {
        shopId: 2,
        shopName: "李四牛肉店",
        amounts:[
          1000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000
        ]
      }
      ,
      {
        shopId: 3,
        shopName: "李四牛肉店",
        amounts:[
          1000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000,
          2000,
          1000,
          2000,
          2000,
          1000
        ]
      }
    ]
  }

  setDay(str) {
    this.nowDay = str
    let now = new Date(str+'-01')
    let preY = now.getFullYear()
    let preM = now.getMonth()
    preM < 1 && (preY--) && (preM += 12)
    this.preDay = formatDate(new Date(preY.toString() + '-' + preM.toString() + '-01'),'yyyy-MM-dd').slice(0, 7)
    let nextY = now.getFullYear()
    let nextM = now.getMonth() + 2
    nextM > 12 && (nextY++) && (nextM = nextM - 12)
    this.nextDay = formatDate(new Date(nextY.toString() + '-' + nextM.toString() + '-01'),'yyyy-MM-dd').slice(0, 7)
    this.queryReport()
  }

  ngOnInit() {
    this.getAllMarkets().subscribe(
      (markets) => {
        this.marketId = markets[0].id
        this.setDay(this.nowDay)
      }
    )
  }

  queryReport() {
    this.reportService.query(this.marketId, this.nowDay).subscribe(
      (report) => {
       this.report = report
      }
    )
  }

  getAllMarkets() {
    let marketOb = this.marketService.getAll()
    marketOb.subscribe(
      (markets) => {
        this.markets = markets;
      }
    )
    return marketOb
  }

  changeMarket() {
    this.queryReport()
  }

}
