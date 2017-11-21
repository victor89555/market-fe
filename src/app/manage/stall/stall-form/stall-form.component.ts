import {Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from "rebirth-ng";
import {Stall} from "../shared/stall.model";
import {StallService} from "../shared/stall.service";
import {Market} from "../../market/shared/market.model"
import {MarketService} from "../../market/shared/market.service"

@Component({
  selector: 'app-stall-form',
  templateUrl: "./stall-form.component.html"
})
export class StallFormComponent implements Modal, OnInit {
  context: { id: number };
  dismiss: EventEmitter<Stall>;

  stall: any = {}
  markets: Market[]
  test: any

  constructor(private stallService: StallService, private marketService: MarketService) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
    this.marketService.getAll().subscribe(
      (markets) => {
        this.markets = markets
      }
    )
    this.stallService.get(this.context.id).subscribe(
      (stall) => {
        this.stall = stall
      }
    )
  }

  save() {
    debugger
    this.stallService.save(this.stall).subscribe(
      (stall) => {
        this.dismiss.emit(stall);
      }
    )
  }

  cancel() {
    this.dismiss.error(this.stall);
  }
}

