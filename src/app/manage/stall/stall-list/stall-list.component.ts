import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {StallFormComponent} from "../stall-form/stall-form.component";
import {StallService} from "../shared/stall.service";
import {Stall} from "../shared/stall.model";
import {MarketService} from "../../market/shared/market.service";
import {Page} from "../../../thurder-ng/models/page.model";
import {Operator} from "../../operator/shared/operator.model";
import {Market} from "../../market/shared/market.model";

@Component({
  selector: 'app-stall-list',
  templateUrl: './stall-list.component.html',
  styleUrls: [
    "./stall-list.component.scss",
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})

export class StallListComponent implements OnInit {

  editing = {}
  page: Page<any> = new Page()
  queryStall = {"market":null, "shop":"", "func":"", "status":"", "name":""}
  markets:Market[] = []
  marketName = ""
  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private stallService: StallService,
              private marketService: MarketService) {
  }

  ngOnInit(): void {
    this.query()
    this.getAllMarkets()

  }
  query() {
    this.stallService.query(this.queryStall.market, this.queryStall.shop,
      this.queryStall.func,this.queryStall.status,this.queryStall.name,this.page.pageNo).subscribe(
      (page) => {
        this.page = page
      }
    )
  }
  getAllMarkets(){
    this.marketService.getAll().subscribe(
      (markets)=>{
        this.markets = markets;
      }
    )
  }
  onMarketNameChange =(market: Market) =>{ // 选中市场改变时调用
    this.queryStall.market = market.id
  }
  marketNameFormatter = (market: Market) => { // 市场名称输入显示数据
    return market.name
  }

  reset() {
    this.queryStall.status = ""
    this.queryStall.market = null
    this.marketName = ""
    this.queryStall.shop = ""
    this.queryStall.func = ""
    this.queryStall.name = ""
    this.query()
  }

  add() {
    this.modalService.open<Stall>({
      component: StallFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        "add": true
      }
    }).subscribe(stall => {
      console.log('Rebirth Modal -> Get ok with result:', stall)
      this.query()
    }, error => {

    })
  }

  edit(id: number) {
    this.modalService.open<Stall>({
      component: StallFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(stall => {
      console.log('Rebirth Modal -> Get ok with result:', stall)
      this.query()
    }, error => {

    })
  }
  delete(id:number){
    this.stallService.delete(id).subscribe(() => {
      debugger
      this.query()
    })
  }
}
