import {Component, OnInit} from '@angular/core';
import {MounthReport} from "../shared/report.model";
import {Market} from "../../market/shared/market.model";
import {MarketService} from "../../market/shared/market.service";
import {ReportService} from "../shared/report.service"

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
  now: number
  pre: number
  next: number
  preDay: string
  nowDay: string
  nextDay: string
  report: MounthReport = {
    days: ['01/01','01/02','01/03','01/04','01/05','01/06','01/07','01/08','01/09','01/10','01/11','01/12','01/13'],
    shops: [
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

  formatDateTOString() {
    this.preDay = this.getYear(this.pre) + "-" + this.getMounth(this.pre)
    this.nowDay = this.getYear(this.now) + "-" + this.getMounth(this.now)
    this.nextDay = this.getYear(this.next) + "-" + this.getMounth(this.next)
  }

  getMounth(ts) {
    let m = (new Date(ts).getMonth() + 1).toString()
    m = m.length == 1 ? "0" + m : m
    return m
  }
  getYear(ts) {
    let y = new Date(ts).getFullYear().toString()
    return y
  }
  setDay(ts) {
    this.pre = ts - 2592000000
    this.now = ts
    this.next = ts + 2592000000
    this.formatDateTOString()
    this.queryReport()
  }

  ngOnInit() {
    this.setDay(new Date().getTime())
    this.getAllMarkets()
  }

  queryReport() {
    this.reportService.query(this.marketId, this.nowDay).subscribe(
      (report) => {
       this.report = report
      }
    )
  }

  getAllMarkets() {
    this.marketService.getAll().subscribe(
      (markets) => {
        this.markets = markets;
      }
    )
  }

}
