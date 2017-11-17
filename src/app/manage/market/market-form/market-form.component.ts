import {Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from "rebirth-ng";
import {Market} from "../shared/market.model";
import {MarketService} from "../shared/market.service";

@Component({
  selector: 'app-market-form',
  templateUrl: "./market-form.component.html"
})
export class MarketFormComponent implements Modal, OnInit {
  context: { id: number };
  dismiss: EventEmitter<Market>;

  market: any = {}

  constructor(private marketService: MarketService) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
    this.marketService.get(this.context.id).subscribe(
      (market) => {
        this.market = market
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

  cancel() {
    this.dismiss.error(this.market);
  }
}

