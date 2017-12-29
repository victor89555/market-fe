import {Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from "rebirth-ng";
import {Market} from "../shared/market.model";
import {MarketService} from "../shared/market.service";
import {Area} from "../../../thurder-ng/components/area/area.mode"

@Component({
  selector: 'app-market-form',
  templateUrl: "./market-form.component.html"
})
export class MarketFormComponent implements Modal, OnInit {
  context: { id: number, add: boolean };
  dismiss: EventEmitter<Market>;

  marketArea: Area = new Area()
  market: Market = new Market()

  constructor(private marketService: MarketService) {
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
    if( this.validatemarket()){
      this.marketService.save(this.market).subscribe(
        (market) => {
          this.dismiss.emit(market);
        }
      )
    }

  }

  update() {
    if( this.validatemarket()) {
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
    stallNum: true,
    storeNum: true,
    enterStoreNum:true,
    provinceCode: true,
    cityCode: true,
    addr:true
  }

  //验证市场表单
  validatemarket() {
    console.log(this.market)
    this.validateMarketName()
    this.validateMarketCode()
    this.validateCityCode()
    this.validateProvinceCode()
    this.validateStallLimit()
    this.validateStallNum()
    this.validateStoreNum()
    this.validateEnterStoreNum()
    this.validateAddr()
    return this.marketForm.marketName &&
      this.marketForm.stallLimit &&
      this.marketForm.stallNum &&
      this.marketForm.storeNum &&
      this.marketForm.provinceCode &&
      this.marketForm.cityCode &&
      this.marketForm.enterStoreNum &&
      this.marketForm.marketCode&&
      this.marketForm.addr

  }
  validateMarketName(){
    this.marketForm.marketName = this.market.name ? true : false
  }
  validateMarketCode(){
    this.marketForm.marketCode = this.market.code ? true : false
  }
  validateStallLimit(){
    this.marketForm.stallLimit = this.market.stallLimit ? true : false
  }
  validateStallNum(){
    this.marketForm.stallNum = this.market.stallNum ? true : false
  }
  validateStoreNum(){
    this.marketForm.storeNum = this.market.storeNum ? true : false
  }
  validateEnterStoreNum(){
    this.marketForm.enterStoreNum = this.market.enterStoreNum ? true : false
  }
  validateProvinceCode(){
    this.marketForm.provinceCode = this.market.provinceCode ? true : false
  }
  validateCityCode(){
    this.marketForm.cityCode = this.market.cityCode ? true : false
  }
  validateAddr(){
    this.marketForm.addr = this.market.addr ? true : false
  }

}

