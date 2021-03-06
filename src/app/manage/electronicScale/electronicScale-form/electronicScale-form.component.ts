import {Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from "rebirth-ng";
import {ElectronicScale} from "../shared/electronicScale.model";
import {ElectronicScaleService} from "../shared/electronicScale.service";
import {Market} from "../../market/shared/market.model";
import {Shop} from "../../shop/shared/shop.model";
import {MarketService} from "../../market/shared/market.service";
import {ShopService} from "../../shop/shared/shop.service";
import {Page} from "../../../thurder-ng/models/page.model";

@Component({
  selector: 'app-electronicScale-form',
  templateUrl: "./electronicScale-form.component.html"
})
export class ElectronicScaleFormComponent implements Modal, OnInit {
  context: { id: number, add: boolean };
  dismiss: EventEmitter<ElectronicScale>;

  electronicScale: ElectronicScale = new ElectronicScale()
  markets: Market[]
  marketId: number = null
  marketName: string
  shops: Shop[]
  shopName = ""
  shopId: number

  constructor(private electronicScaleService: ElectronicScaleService,
              private marketService: MarketService,
              private shopService: ShopService) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....')

    if (!this.context.add) {
      this.getElectronicScale()
    }
    this.getAllMarkets()
    this.queryShops(null)
  }

  queryShops(marketId) {
    this.shopService.getAll(marketId).subscribe(
      (shops) => {
        this.shops = shops
      }
    )
  }

  // 第一次打开页面时显示的商户名称
  getShop(shopId) {
    this.shopService.get(shopId).subscribe(
      (shop) => {
        this.shopName = shop.name;
      }
    )
  }

  onShopNameChange = (shop: Shop) => { // 选中商户改变时调用
    this.shopId = shop.id
  }
  shopNameFormatter = (shop: Shop) => { // 商户名称输入显示数据
    return shop.name || ""
  }

  getAllMarkets() {
    this.marketService.getAll().subscribe(
      (markets) => {
        this.markets = markets;
        console.log(markets)
      }
    )
  }

  // 第一次打开页面时显示的市场名称
  getMarket(marketId) {
    this.marketService.get(marketId).subscribe(
      (market) => {
        this.marketName = market.name;
      }
    )
  }

  getElectronicScale() {
    this.electronicScaleService.get(this.context.id).subscribe(
      (electronicScale) => {
        this.electronicScale = electronicScale
        this.marketId = electronicScale.marketId
        this.shopId = electronicScale.shopId
        this.getMarket(this.marketId)
        this.getShop(this.shopId)
      }
    )
  }

  save() {
    if (this.validateElectronic()) {
      this.electronicScale.shopId = this.shopId
      this.electronicScale.marketId = this.marketId
      this.electronicScaleService.save(this.electronicScale).subscribe(
        (electronicScale) => {
          this.dismiss.emit(electronicScale);
        }
      )
    }
  }

  update() {
    if (this.validateElectronic()) {
      this.electronicScale.shopId = this.shopId
      this.electronicScale.marketId = this.marketId
      this.electronicScale.id = this.context.id;
      console.log(this.electronicScale);
      this.electronicScaleService.update(this.context.id, this.electronicScale).subscribe(
        (electronicScale) => {
          this.dismiss.emit(electronicScale);
        }
      )
    }
  }

  cancel() {
    this.dismiss.error(this.electronicScale);
  }

  // 检验电子秤
  elecScaleForm = {
    sequenceNo: true,
    shopId: true,
    marketId: true,
    status: true
  }

  validateElectronic() {
    this.validateElecSequenceNo()
    this.validateMarketId()
    // this.validateShopId()
    this.validateStatus()
    return this.elecScaleForm.status &&
      this.elecScaleForm.marketId &&
      this.elecScaleForm.shopId &&
      this.elecScaleForm.sequenceNo
  }

  validateElecSequenceNo() {
    this.elecScaleForm.sequenceNo = this.electronicScale.sequenceNo ? true : false
  }

  validateShopId() {
    this.elecScaleForm.shopId = this.electronicScale.shopId ? true : false
  }

  validateMarketId() {
    this.elecScaleForm.marketId = this.electronicScale.marketId ? true : false
  }

  validateStatus() {
    this.elecScaleForm.status = this.electronicScale.status !=null
  }
}

