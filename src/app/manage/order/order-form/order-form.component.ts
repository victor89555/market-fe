import {Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from 'rebirth-ng'
import {Order} from "../shared/order.model"
import {OrderService} from "../shared/order.service"

@Component({
  selector: 'app-order-form',
  templateUrl: "./order-form.component.html"
})
export class OrderFormComponent implements Modal, OnInit {
  context: { id: number };
  dismiss: EventEmitter<Order>;

  order: any = {}

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
    this.orderService.get(this.context.id).subscribe(
      (order) => {
        this.order = order
      }
    )
  }

  save() {
    this.orderService.save(this.order).subscribe(
      (order) => {
        this.dismiss.emit(order);
      }
    )
  }

  cancel() {
    this.dismiss.error(this.order);
  }
}

