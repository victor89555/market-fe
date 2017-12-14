import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {ContractFormComponent} from "../contract-form/contract-form.component";
import {ContractService} from "../shared/contract.service";
import {Contract} from "../shared/contract.model";
import {Page} from "../../../thurder-ng/models/page.model";
import {Shop} from "../../shop/shared/shop.model";
import {ShopService} from "../../shop/shared/shop.service";

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
  qry_name: number = null
  shops:Shop[]
  shopId:number
  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private contractService: ContractService,
              private shopService:ShopService) {
  }

  ngOnInit(): void {
    this.query()
    this.queryShops()
  }
  queryShops() {
    this.shopService.getAll(null).subscribe(
      (shops) => {
        this.shops = shops
        console.log(shops);
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
    this.contractService.query(this.qry_name, 1,10).subscribe(
      (page) => {
        this.page = page
      }
    )
  }

  reset() {
    this.qry_name = null
    this.query()
  }

  add() {
    this.modalService.open<Contract>({
      component: ContractFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
      }
    }).subscribe(contract => {
      console.log('Rebirth Modal -> Get ok with result:', contract)
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
    }, error => {

    })
  }

}
