import {ChangeDetectorRef, Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from "rebirth-ng";
import {Order} from "../shared/order.model";
import {OrderService} from "../shared/order.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-order-form',
  templateUrl: "./order-form.component.html",
  styleUrls:['./order-form.component.scss']
})
export class OrderFormComponent implements Modal, OnInit {
  context: { id: number };
  dismiss: EventEmitter<Order>;
  order_id: number
  orderLines: any = []
  order: any = {}
  constructor(private changeDetectorRef: ChangeDetectorRef,
              private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.order_id = id;
    });
    this.loadOrder();
    this.loadOrderLine();
  }

  loadOrder() {
    this.orderService.get(this.order_id).subscribe(
      (order) => {
        this.order = order
        this.changeDetectorRef.markForCheck()
      }
    )
  }

  loadOrderLine() {
    this.orderService.getLine(this.order_id).subscribe(
      (orderLines) => {
        this.orderLines = orderLines
        this.changeDetectorRef.markForCheck()
      }
    )
  }
}
