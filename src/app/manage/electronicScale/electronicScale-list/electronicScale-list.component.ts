import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {ElectronicScaleService} from "../shared/electronicScale.service";
import {ElectronicScale} from "../shared/electronicScale.model";
import {Page} from "../../../thurder-ng/models/page.model";
import {ElectronicScaleFormComponent} from "../electronicScale-form/electronicScale-form.component";
import {Market} from "../../market/shared/market.model";
import {Shop} from "../../shop/shared/shop.model";
import {MarketService} from "../../market/shared/market.service";


@Component({
  selector: 'app-electronicScale-list',
  templateUrl: './electronicScale-list.component.html',
  styleUrls: [
    "./electronicScale-list.component.scss",
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})

export class ElectronicScaleListComponent implements OnInit {

  editing = {}
  page: Page<any> = new Page()
  queryElecScale = {"market":null, "no":"","status":""}
  markets:Market[] = []
  marketName = ""

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private electronicScaleService: ElectronicScaleService,
              private marketService: MarketService) {
  }

  ngOnInit(): void {
    this.query()
    this.getAllMarkets()
  }

  getAllMarkets(){
    this.marketService.getAll().subscribe(
      (markets)=>{
        this.markets = markets;
      }
    )
  }
  onMarketNameChange =(market: Market) =>{ // 选中市场改变时调用
    this.queryElecScale.market = market.id
  }
  marketNameFormatter = (market: Market) => { // 市场名称输入显示数据
    return market.name
  }
  query() {
    this.electronicScaleService.query(this.page.pageNo, null, this.queryElecScale.no, this.queryElecScale.market,
      this.queryElecScale.status).subscribe(
      (page) => {
        this.page = page
        console.log(this.page);
      }
    )
  }

  setPage(pageInfo) {
    this.page.pageNo = pageInfo.offset + 1
    this.query()
  }

  reset() {
    this.queryElecScale.no = ""
    this.marketName = ""
    this.queryElecScale.market = null
    this.queryElecScale.status = ""
    this.query()
  }

  add() {
    this.modalService.open<ElectronicScale>({
      component: ElectronicScaleFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        "add":true
      }
    }).subscribe(electronicScale => {
      console.log('Rebirth Modal -> Get ok with result:', electronicScale)
      this.query()
    }, error => {

    })
  }

  edit(id: number) {
    this.modalService.open<ElectronicScale>({
      component: ElectronicScaleFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(electronicScale => {
      console.log('Rebirth Modal -> Get ok with result:', electronicScale)
      this.query()
    }, error => {

    })
  }

  delete(id:number){
    this.electronicScaleService.delete(id).subscribe(() => {

    })
    this.query()
  }
}
