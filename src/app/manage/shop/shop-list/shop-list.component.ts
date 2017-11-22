import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {ShopFormComponent} from "../shop-form/shop-form.component";
import {ShopService} from "../shared/shop.service";
import {Shop} from "../shared/shop.model";

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: [
    "./shop-list.component.scss",
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})

export class ShopListComponent implements OnInit {

  editing = {}
  shops = []
  qry_name: string = ""

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.shopService.query().subscribe(
      (shops) => {
        this.shops = shops
      }
    )
  }

  query() {
    this.shopService.query(this.qry_name).subscribe(
      (shops) => {
        this.shops = shops
      }
    )
  }

  reset() {
    this.shopService.query().subscribe(
      (shops) => {
        this.shops = shops
      }
    )
  }

  add() {
    this.modalService.open<Shop>({
      component: ShopFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
      }
    }).subscribe(shop => {
      console.log('Rebirth Modal -> Get ok with result:', shop)
    }, error => {
      console.error('Rebirth Modal -> Get cancel with result:', error)
    })
  }

  edit(id: number) {
    this.modalService.open<Shop>({
      component: ShopFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(shop => {
      console.log('Rebirth Modal -> Get ok with result:', shop)
    }, error => {
      console.error('Rebirth Modal -> Get cancel with result:', error)
    })
  }

  updateValue(event, cell, rowIndex) {
    console.log('order editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false
    this.shops[rowIndex][cell] = event.target.value
    this.shops = [...this.shops]
    console.log('UPDATED!', this.shops[rowIndex][cell])
  }
}
