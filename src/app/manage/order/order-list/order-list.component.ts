import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from '@angular/core'
import {ModalService} from 'rebirth-ng'
import {OrderFormComponent} from '../order-form/order-form.component'
import {OrderService} from "../shared/order.service"
import {Order} from "../shared/order.model"

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: [
    "./order-list.component.scss",
    // '../themes/material.scss',
    // './themes/dark.scss',
    // './themes/bootstrap.scss',
    // './themes/app.css'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})

export class OrderListComponent implements OnInit {

  editing = {}
  orders = []
  qry_name: string = ""

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.query().subscribe(
      (orders) => {
        this.orders = orders
      }
    )
  }

  query() {
    this.orderService.query(this.qry_name).subscribe(
      (orders) => {
        this.orders = orders
      }
    )
  }

  reset() {
    this.orderService.query().subscribe(
      (orders) => {
        this.orders = orders
      }
    )
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
      console.error('Rebirth Modal -> Get cancel with result:', error)
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
      console.error('Rebirth Modal -> Get cancel with result:', error)
    })
  }

  updateValue(event, cell, rowIndex) {
    console.log('order editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false
    this.orders[rowIndex][cell] = event.target.value
    this.orders = [...this.orders]
    console.log('UPDATED!', this.orders[rowIndex][cell])
  }
}
