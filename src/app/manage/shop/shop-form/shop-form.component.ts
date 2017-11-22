import {Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from "rebirth-ng";
import {Shop} from "../shared/shop.model";
import {ShopService} from "../shared/shop.service";

@Component({
  selector: 'app-shop-form',
  templateUrl: "./shop-form.component.html"
})
export class ShopFormComponent implements Modal, OnInit {
  context: { id: number };
  dismiss: EventEmitter<Shop>;

  shop: any = {}

  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
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

