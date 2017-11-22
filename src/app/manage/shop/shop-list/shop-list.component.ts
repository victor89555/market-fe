import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {ShopFormComponent} from "../shop-form/shop-form.component";
import {ShopService} from "../shared/shop.service";
import {Shop} from "../shared/shop.model";
import {Page} from "../../../thurder-ng/models/page.model";

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
  page: Page<any> = new Page()
  qry_name: string = ""

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.query()
  }

  query() {
    this.shopService.query(this.qry_name, this.page.pageNo).subscribe(
      (page) => {
        this.page = page
      }
    )
  }

  reset() {
    this.qry_name = ""
    this.query()
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

}
