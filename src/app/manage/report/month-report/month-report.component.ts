import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
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

  @ViewChild('tableBox')
  tableBox: ElementRef

  constructor(private marketService:MarketService,
              private reportService: ReportService) { }

  markets: Market[] = []
  marketId: number = null
  preDay: string
  nowDay: string = formatDate(new Date(), 'yyyy-MM-dd').slice(0, 7)
  nextDay: string
  report: MounthReport

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

  doPrint() {
    console.log(this.tableBox)
    var headhtml = "<html><head><title></title></head><h3>月度报表</h3>"
    var foothtml = "</body>"
    // 获取div中的html内容
    var newhtml = this.tableBox.nativeElement.innerHTML
    // 获取div中的html内容，jquery写法如下
    // var newhtml= $("#" + printpage).html()

    // 获取原来的窗口界面body的html内容，并保存起来
    var oldhtml = document.body.innerHTML

    // 给窗口界面重新赋值，赋自己拼接起来的html内容
    document.body.innerHTML = headhtml + newhtml + foothtml
    // 调用window.print方法打印新窗口
    window.print()

    // 将原来窗口body的html值回填展示
    document.body.innerHTML = oldhtml
    return false
  }
}
