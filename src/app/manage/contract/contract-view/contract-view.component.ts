import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ContractService } from "../shared/contract.service";
import { Contract } from "../shared/contract.model";
import {MarketService} from "../../market/shared/market.service";
import {ShopService} from "../../shop/shared/shop.service";
import {Market} from "../../market/shared/market.model";
import {Shop} from "../../shop/shared/shop.model";
import {dicts} from "../../../thurder-ng/models/dictionary";

@Component({
  selector: 'app-contract-view',
  templateUrl: './contract-view.component.html',
  styleUrls: ['./contract-view.component.scss']
})
export class ContractViewComponent implements OnInit {

  context: {id: number}
  contract: Contract = new Contract()
  attachments: any[] = []
  market: Market = new Market()
  shop: Shop = new Shop()
  shopStatus = dicts["SHOP_STATUS"]
  hireEquipments = [1,3,6,8,10]
  equipmentName = dicts["EQUIPMENT_NAME"]
  constructor(private contractService: ContractService,
              private changeDetectorRef: ChangeDetectorRef,
              private marketService: MarketService,
              private shopService: ShopService) { }

  ngOnInit() {
    this.loadContractInfo()
  }

  loadContractInfo() {
    this.contractService.get(this.context.id).subscribe(
      (info) => {
        console.log(info)
        Object.assign(this.contract, info)
        this.getMarket(info.marketId)
        this.getShop(info.shopId)
      }
    )

    this.contractService.getAttachments(this.context.id).subscribe(
      (attachments) => {
        // console.log(attachments)
        this.attachments = attachments
      }
    )
  }

  // 获取市场信息
  getMarket(marketId: number) {
    this.marketService.get(marketId).subscribe(
      (market) => {
        this.market = market
      }
    )
  }

  // 获取商户信息
  getShop(shopId: number) {
    this.shopService.get(shopId).subscribe(
      (shop) => {
        this.shop = shop
      }
    )
  }

}
