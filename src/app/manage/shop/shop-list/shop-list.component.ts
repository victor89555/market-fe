import {ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {ShopService} from "../shared/shop.service";
import {Page} from "../../../thurder-ng/models/page.model";
import {Market} from "../../market/shared/market.model";
import {MarketService} from "../../market/shared/market.service";
import {Stall} from "../../stall/shared/stall.model";
import {Shop} from "../shared/shop.model";

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
  qry = {market: null, shop: '', stall: '', status: ''}
  shop_state: boolean
  markets: Market[]
  stalls: Stall[] //摊位列表
  shops: Shop[]

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private shopService: ShopService,
              private marketService: MarketService) {
  }

  ngOnInit(): void {
    this.query();
    this.getAllMarkets()
    this.queryShops()
  }

  query() { //条件搜索商户
    // console.log(this.qry)
    this.shopService.query(this.qry.market, this.qry.shop, this.qry.stall, this.qry.status, this.page.pageNo).subscribe(
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
        console.log(shops);
        this.shops = shops
      }
    )
  }

  reset() {
    this.qry.market = ''
    this.qry.shop = ''
    this.qry.stall = ''
    this.qry.status = ''
    this.query()
  }

  setPage(pageInfo) {
    this.page.pageNo = pageInfo.offset + 1
    this.query()
  }

}
