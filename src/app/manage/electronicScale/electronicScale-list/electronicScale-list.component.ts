import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {DialogService, ModalService} from "rebirth-ng";
import {ElectronicScaleService} from "../shared/electronicScale.service";
import {ElectronicScale} from "../shared/electronicScale.model";
import {Page} from "../../../thurder-ng/models/page.model";
import {ElectronicScaleFormComponent} from "../electronicScale-form/electronicScale-form.component";
import {Market} from "../../market/shared/market.model";
import {Shop} from "../../shop/shared/shop.model";
import {MarketService} from "../../market/shared/market.service";
import {ShopService} from "../../shop/shared/shop.service";
import {RouterModule} from "@angular/router";

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
  queryElecScale = {"marketId": null, "shopId": null, "no": "", "status": "", "user": null}
  markets: Market[] = []
  marketName = ""
  shops: Shop[]

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private electronicScaleService: ElectronicScaleService,
              private marketService: MarketService,
              private shopService: ShopService,
              private router: RouterModule,
              private dialogService: DialogService) {
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
        // 添加一个空的选项
        let emptyShop = new Shop()
        emptyShop.name = '-请选择商户-'
        this.shops.unshift(emptyShop)
      }
    )
  }

  onShopNameChange = (shop: Shop) => { // 选中商户改变时调用
    this.queryElecScale.shopId = shop.id
  }
  shopNameFormatter = (shop: Shop) => { // 商户名称输入显示数据
    return shop.name || ""
  }

  getAllMarkets() {
    this.marketService.getAll().subscribe(
      (markets) => {
        this.markets = markets;
      }
    )
  }

  query() {
    this.electronicScaleService.query(this.page.pageNo, null, this.queryElecScale.no, this.queryElecScale.marketId,
      this.queryElecScale.status, this.queryElecScale.user, this.queryElecScale.shopId).subscribe(
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
    this.queryElecScale.marketId = null
    this.queryElecScale.status = ""
    this.queryElecScale.shopId = null
    this.queryElecScale.user = null
    this.query()
  }

  add() {
    this.modalService.open<ElectronicScale>({
      component: ElectronicScaleFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        "add": true
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

  delete(id: number) {
    this.electronicScaleService.delete(id).subscribe(() => {
      this.query()
    })
  }

  //修改维修状态
  doRepair(scale) {
    let status = scale.status == 0 ? 1 : 0
    this.electronicScaleService.setStatus(scale.id, status).subscribe(
      (res) => {
        console.log(res)
        this.query()
      }
    )
  }

  //标记报废状态
  doScrap(scale) {
    this.dialogService.confirm({
      title: '提示',
      content: '是否报废该电子秤',
      html: false,
      yes: '确定',
      no: '取消'
    })
      .subscribe(
        data => {
          this.electronicScaleService.setStatus(scale.id, 2).subscribe(
            (res) => {
              console.log(res)
              this.query()
            }
          )
        },
        error => {}
      );
  }
}
