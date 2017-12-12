import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {OrderFormComponent} from "../order-form/order-form.component";
import {OrderService} from "../shared/order.service";
import {Order} from "../shared/order.model";
import {Page} from "../../../thurder-ng/models/page.model";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: [
    "./order-list.component.scss",
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})

export class OrderListComponent implements OnInit {

  editing = {}
  page: Page<any> = new Page()
  qry_name: string = ""

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.query()
  }

  query() {
    this.orderService.query(this.qry_name, this.page.pageNo).subscribe(
      (page) => {
        this.page = page
      }
    )
  }

  reset() {
    this.qry_name="";
    this.query()
  }

  add() {
    this.modalService.open<Order>({
      component: OrderFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
      }
    }).subscribe(order => {
      console.log('Rebirth Modal -> Get ok with result:', order)
    }, error => {

    })
  }

  edit(id: number) {
    this.modalService.open<Order>({
      component: OrderFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(order => {
      console.log('Rebirth Modal -> Get ok with result:', order)
    }, error => {

    })
  }

}
