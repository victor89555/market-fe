import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {ContractFormComponent} from "../contract-form/contract-form.component";
import {ContractViewComponent} from "../contract-view/contract-view.component";
import {ContractService} from "../shared/contract.service";
import {Contract} from "../shared/contract.model";
import {Page} from "../../../thurder-ng/models/page.model";
import {Shop} from "../../shop/shared/shop.model";
import {ShopService} from "../../shop/shared/shop.service";
import {Market} from "../../market/shared/market.model";
import {MarketService} from "../../market/shared/market.service";

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: [
    "./contract-list.component.scss",
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})

export class ContractListComponent implements OnInit {

  editing = {}
  page: Page<any> = new Page()
  shops: Shop[]
  shopId: number = null
  marketId: number = null
  shopName: string = ""
  markets: Market[] = []

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private contractService: ContractService,
              private shopService: ShopService,
              private marketService: MarketService) {
  }

  ngOnInit(): void {
    this.query()
    this.queryShops()
    this.getMarkets()
  }

  queryShops() {
    this.shopService.getAll(null).subscribe(
      (shops) => {
        this.shops = shops
        // console.log(shops);
      }
    )
  }

  onShopNameChange = (shop: Shop) => { // 选中商户改变时调用
    this.shopId = shop.id
  }
  shopNameFormatter = (shop: Shop) => { // 商户名称输入显示数据
    return shop.name || ""
  }

  query() {
    this.contractService.query(1, 10, this.shopId, this.shopName, this.marketId).subscribe(
      (page) => {
        this.page = page
      }
    )
  }

  setPage(pageInfo) {
    this.page.pageNo = pageInfo.offset + 1
    this.query()
  }

  reset() {
    this.shopId = null
    this.shopName = ""
    this.query()
  }

  getMarkets() {
    this.marketService.getAll().subscribe(
      (markets)=>{
        console.log(markets)
        this.markets = markets;
      }
    )
  }

  add() {
    this.modalService.open<Contract>({
      component: ContractFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        add: true,
        isShopForm: false
      }
    }).subscribe(contract => {
      console.log('Rebirth Modal -> Get ok with result:', contract)
      this.query()
    }, error => {

    })
  }

  edit(id: number) {
    this.modalService.open<Contract>({
      component: ContractFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(contract => {
      console.log('Rebirth Modal -> Get ok with result:', contract)
      this.query()
    }, error => {

    })
  }

  check(id: number) {
    console.log("查看" + id)
    this.modalService.open<Contract>({
      component: ContractViewComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(contract => {
      console.log('Rebirth Modal -> Get ok with result:', contract)
      this.query()
    }, error => {

    })
  }

}
