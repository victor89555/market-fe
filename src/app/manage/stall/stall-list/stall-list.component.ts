import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {StallFormComponent} from "../stall-form/stall-form.component";
import {StallService} from "../shared/stall.service";
import {Stall} from "../shared/stall.model";
import {MarketService} from "../../market/shared/market.service";
import {Page} from "../../../thurder-ng/models/page.model";
import {Market} from "../../market/shared/market.model";
import {Shop} from "../../shop/shared/shop.model";
import {ShopService} from "../../shop/shared/shop.service";

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
  queryStall = {"marketId": null, "shopId": null, "func": "", "status": "", "name": ""}
  markets: Market[] = []
  marketName = ""
  shops: Shop[]

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private stallService: StallService,
              private marketService: MarketService,
              private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.query()
    this.getAllMarkets()
    this.queryShops()
  }

  queryShops() {
    this.shopService.getAll(null).subscribe(
      (shops) => {
        this.shops = shops
      }
    )
  }

  setPage(pageInfo) {
    this.page.pageNo = pageInfo.offset + 1
    this.query()
  }

  onShopNameChange = (shop: Shop) => { // 选中商户改变时调用
    // console.log("onShopNameChange")
    this.queryStall.shopId = shop.id
  }
  shopNameFormatter = (shop: Shop) => { // 商户名称输入显示数据
    // console.log("shopNameFormatter")
    return shop.name || ""
  }

  query() {
    this.stallService.query(this.queryStall.marketId, this.queryStall.shopId,
      this.queryStall.func, this.queryStall.status, this.queryStall.name, this.page.pageNo).subscribe(
      (page) => {
        this.page = page
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

  reset() {
    this.queryStall.status = ""
    this.queryStall.marketId = null
    this.marketName = ""
    this.queryStall.shopId = null
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

  delete(id: number) {
    this.stallService.delete(id).subscribe(() => {
      debugger
      this.query()
    })
  }
}
