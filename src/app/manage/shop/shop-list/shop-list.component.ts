import {ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {ShopService} from "../shared/shop.service";
import {Page} from "../../../thurder-ng/models/page.model";
import {Market} from "../../market/shared/market.model";
import {MarketService} from "../../market/shared/market.service";
import {Stall} from "../../stall/shared/stall.model";
import {Shop} from "../shared/shop.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: [
    "./shop-list.component.scss",
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})

export class ShopListComponent implements OnInit {

  page: Page<any> = new Page()
  qry = {marketId: null, shopName: '', stallName: '', status: ''}
  shop_state: boolean
  markets: Market[]
  stalls: Stall[] //摊位列表
  shops: Shop[]

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private shopService: ShopService,
              private marketService: MarketService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.query();
    this.getAllMarkets()
    this.queryShops()
  }

  query() { //条件搜索商户
    // console.log(this.qry)
    this.shopService.query(this.qry.marketId, this.qry.shopName, this.qry.stallName, this.qry.status, this.page.pageNo).subscribe(
      (page) => {
        this.page = page
        // console.log(page);
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

  queryShops() {
    this.shopService.getAll(null).subscribe(
      (shops) => {
        this.shops = shops
      }
    )
  }

  onShopNameChange = (shop: Shop) => { // 选中商户改变时调用
    // console.log("onShopNameChange")
    // this.qry.shop = shop.name
  }
  shopNameFormatter = (shop: Shop) => { // 商户名称输入显示数据
    // console.log("shopNameFormatter")
    return shop.name || ""
  }

  reset() {
    this.qry.marketId = null
    this.qry.shopName = ''
    this.qry.stallName = ''
    this.qry.status = ''
    this.query()
  }

  setPage(pageInfo) {
    this.page.pageNo = pageInfo.offset + 1
    this.query()
  }

  goWaterOrder(value) {
    this.router.navigate(['manage/order'],{ queryParams: { shopId: value } });
  }
}
