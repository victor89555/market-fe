import {Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from "rebirth-ng";
import {Shop} from "../shared/shop.model";
import {ShopService} from "../shared/shop.service";
import {Market} from "../../market/shared/market.model";
import {Stall} from "../../stall/shared/stall.model";
import {Operator} from "../../operator/shared/operator.model";
import {StallService} from "../../stall/shared/stall.service";
import {MarketService} from "../../market/shared/market.service";
import {OperatorService} from "../../operator/shared/operator.service";

@Component({
  selector: 'app-shop-form',
  templateUrl: "./shop-form.component.html"
})
export class ShopFormComponent implements Modal, OnInit {
  context: { id: number };
  dismiss: EventEmitter<Shop>;

  shop: any = {}
  markets: Market[]
  stalls: Stall[]
  operators: Operator[]
  constructor(private shopService: ShopService,
              private stallService: StallService,
              private marketService: MarketService,
              private operatorService: OperatorService) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
    this.stallService.getAll().subscribe(
      (stalls) => {
        this.stalls = stalls
      }
    )
    this.marketService.getAll().subscribe(
      (markets) => {
        this.markets = markets
      }
    )
    this.operatorService.getAll().subscribe(
      (operators) => {
        this.operators = operators
      }
    )
    this.shopService.get(this.context.id).subscribe(
      (shop) => {
        this.shop = shop
      }
    )
  }

  save() {
    this.shopService.save(this.shop).subscribe(
      (shop) => {
        this.dismiss.emit(shop);
      }
    )
  }

  cancel() {
    this.dismiss.error(this.shop);
  }
}

