import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {OrderFormComponent} from "../order-form/order-form.component";
import {OrderService} from "../shared/order.service";
import {Order} from "../shared/order.model";
import {Page} from "../../../thurder-ng/models/page.model";
import { MarketService } from "../../market/shared/market.service";
import {Market} from "../../market/shared/market.model";
import {Shop} from "../../shop/shared/shop.model";
import { ShopService} from "../../shop/shared/shop.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: [
    "./order-list.component.scss",
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})

export class OrderListComponent implements OnInit {

  editing = {}
  page: Page<any> = new Page()
  queryOrder ={"shopId":null,"marketId":null,payWay:null,beginDate : "",endDate: ""}
  markets:Market[]
  shops:Shop[]
  shopName:string=""
  dateFormat: string
  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private orderService: OrderService,
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

  onShopNameChange = (shop: Shop) => { // 选中商户改变时调用
    this.queryOrder.shopId = shop.id
  }
  shopNameFormatter = (shop: Shop) => { // 商户名称输入显示数据
    return shop.name || ""
  }
  query() {
    this.orderService.query(this.queryOrder.marketId, this.queryOrder.shopId,
      this.queryOrder.payWay,this.queryOrder.beginDate,this.queryOrder.endDate,1,10).subscribe(
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
  reset() {
    this.queryOrder.marketId=null;
    this.queryOrder.shopId=null;
    this.queryOrder.payWay="";
    this.queryOrder.beginDate=null
    this.queryOrder.endDate=null
    this.shopName=""
    this.query()
  }

  add() {
    this.modalService.open<Order>({
      component: OrderFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
      }
    }).subscribe(order => {
      console.log('Rebirth Modal -> Get ok with result:', order)
    }, error => {

    })
  }

  edit(id: number) {
    this.modalService.open<Order>({
      component: OrderFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(order => {
      console.log('Rebirth Modal -> Get ok with result:', order)
    }, error => {

    })
  }

}
