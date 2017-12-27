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
    this.marketService.save(this.market).subscribe(
      (market) => {
        this.dismiss.emit(market);
      }
    )
  }

  update() {
    this.market.id = this.context.id;
    console.log(this.market);
    this.marketService.update(this.context.id, this.market).subscribe(
      (market) => {
        this.dismiss.emit(market);
      }
    )
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

}

