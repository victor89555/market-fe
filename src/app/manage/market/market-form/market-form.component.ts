import {Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from "rebirth-ng";
import {Market} from "../shared/market.model";
import {MarketService} from "../shared/market.service";
import {Area} from "../../../thurder-ng/components/area/area.mode"
import {Validator} from "../../../shared/validator"
@Component({
  selector: 'app-market-form',
  templateUrl: "./market-form.component.html"
})
export class MarketFormComponent implements Modal, OnInit {
  context: { id: number, add: boolean };
  dismiss: EventEmitter<Market>;

  marketArea: Area = new Area()
  market: Market = new Market()

  constructor(private marketService: MarketService,
              private validator: Validator) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
    if (!this.context.add) {
      this.getMarket();
    }
  }

  // 获取市场
  getMarket() {
    this.marketService.get(this.context.id).subscribe(
      (market) => {
        this.market = market
        this.marketArea = new Area(market.provinceCode, market.cityCode)
      }
    )
  }

  save() {
    if (this.validatemarket()) {
      this.marketService.save(this.market).subscribe(
        (market) => {
          this.dismiss.emit(market);
        }
      )
    }

  }

  update() {
    if (this.validatemarket()) {
      this.market.id = this.context.id;
      console.log(this.market);
      this.marketService.update(this.context.id, this.market).subscribe(
        (market) => {
          this.dismiss.emit(market);
        }
      )
    }
  }

  cancel() {
    this.dismiss.error(this.market);
  }

  onProvinceChange(province) {
    this.market.provinceCode = province
  }

  onCityChange(city) {
    this.market.cityCode = city
  }

  marketForm = {
    marketName: true,
    marketCode: true,
    stallLimit: true,
    stallLimitFormat: true,
    storeNum: true,
    storeNumFormat: true,
    enterStoreNum: true,
    enterStoreNumFormat: true,
    provinceCode: true,
    cityCode: true,
    addr: true
  }

  //验证市场表单
  validatemarket() {
    console.log(this.market)
    this.validateMarketName()
    this.validateMarketCode()
    this.validateCityCode()
    this.validateProvinceCode()
    this.validateStallLimit()
    this.validateStoreNum()
    this.validateEnterStoreNum()
    this.validateAddr()
    return this.marketForm.marketName &&
      this.marketForm.stallLimit &&
      this.marketForm.storeNum &&
      this.marketForm.provinceCode &&
      this.marketForm.cityCode &&
      this.marketForm.enterStoreNum &&
      this.marketForm.marketCode &&
      this.marketForm.addr &&
      this.marketForm.stallLimitFormat &&
      this.marketForm.storeNumFormat &&
      this.marketForm.enterStoreNumFormat

  }

  validateMarketName() {
    this.marketForm.marketName = this.market.name ? true : false
  }

  validateMarketCode() {
    this.marketForm.marketCode = this.market.code ? true : false
  }

  validateStallLimit() {
    this.marketForm.stallLimit = this.market.stallLimit ? true : false
    this.marketForm.stallLimitFormat = this.validator.isNum(this.market.stallLimit)
  }

  validateStoreNum() {
    this.marketForm.storeNum = this.market.storeNum !=null
    this.marketForm.storeNumFormat = this.validator.isNum(this.market.storeNum)
  }

  validateEnterStoreNum() {
    this.marketForm.enterStoreNum = this.market.enterStoreNum !=null
    this.marketForm.enterStoreNumFormat = this.validator.isNum(this.market.enterStoreNum)
  }

  validateProvinceCode() {
    this.marketForm.provinceCode = this.market.provinceCode ? true : false
  }

  validateCityCode() {
    this.marketForm.cityCode = this.market.cityCode ? true : false
  }

  validateAddr() {
    this.marketForm.addr = this.market.addr ? true : false
  }

}

