import {Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from "rebirth-ng";
import {ElectronicScale} from "../shared/electronicScale.model";
import {ElectronicScaleService} from "../shared/electronicScale.service";
import {Market} from "../../market/shared/market.model";
import {Shop} from "../../shop/shared/shop.model";
import {MarketService} from "../../market/shared/market.service";
import {ShopService} from "../../shop/shared/shop.service";

@Component({
  selector: 'app-electronicScale-form',
  templateUrl: "./electronicScale-form.component.html"
})
export class ElectronicScaleFormComponent implements Modal, OnInit {
  context: { id: number };
  dismiss: EventEmitter<ElectronicScale>;

  electronicScale: any = {}
  markets: Market[]
  shops: Shop[]
  constructor(private electronicScaleService: ElectronicScaleService,
              private marketService: MarketService,
              private shopService: ShopService) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
    this.marketService.getAll().subscribe(
      (markets) => {
        this.markets = markets
      }
    )
    this.shopService.getAll().subscribe(
      (shops) => {
        this.shops = shops
      }
    )
    this.electronicScaleService.get(this.context.id).subscribe(
      (electronicScale) => {
        this.electronicScale = electronicScale
      }
    )
  }

  save() {
    this.electronicScale.save(this.electronicScale).subscribe(
      (electronicScale) => {
        this.dismiss.emit(electronicScale);
      }
    )
  }

  cancel() {
    this.dismiss.error(this.electronicScale);
  }
}

