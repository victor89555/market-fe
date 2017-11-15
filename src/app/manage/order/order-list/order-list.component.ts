import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalService} from 'rebirth-ng'
import {OrderFormComponent} from '../order-form/order-form.component'
import {OrderService} from "../shared/order.service"

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

  editing = {};
  rows = [];

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.queryOrders(1, 10).subscribe(
      (orders) => {
        this.rows = orders
      }
    )
  }

  openModal() {
    this.modalService.open<string>({
      component: OrderFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        text: 'I am from resolve data!'
      }
    }).subscribe(data => {
      console.log('Rebirth Modal -> Get ok with result:', data);
    }, error => {
      console.error('Rebirth Modal -> Get cancel with result:', error);
    });
  }

  fetch(cb) {
    cb([
      {
        "name": "Ethel Price",
        "gender": "female",
        "company": "Johnson, Johnson and Partners, LLC CMP DDC",
        "age": 22
      },
      {
        "name": "Claudine Neal",
        "gender": "female",
        "company": "Sealoud",
        "age": 55
      },
      {
        "name": "Beryl Rice",
        "gender": "female",
        "company": "Velity",
        "age": 67
      },
      {
        "name": "Wilder Gonzales",
        "gender": "male",
        "company": "Geekko"
      },
      {
        "name": "Georgina Schultz",
        "gender": "female",
        "company": "Suretech"
      },
      {
        "name": "Carroll Buchanan",
        "gender": "male",
        "company": "Ecosys"
      }])
  }

  updateValue(event, cell, rowIndex) {
    console.log('order editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }
}
