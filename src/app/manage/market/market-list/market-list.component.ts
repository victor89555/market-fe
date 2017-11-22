import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {MarketFormComponent} from "../market-form/market-form.component";
import {MarketService} from "../shared/market.service";
import {Market} from "../shared/market.model";
import {Page} from "../../../thurder-ng/models/page.model";

@Component({
  selector: 'app-market-list',
  templateUrl: './market-list.component.html',
  styleUrls: [
    "./market-list.component.scss",
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})

export class MarketListComponent implements OnInit {

  editing = {}
  page: Page<any> = new Page()
  qry_name: string = ""

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private marketService: MarketService) {
  }

  ngOnInit(): void {
    this.query()
  }

  query() {
    this.marketService.query(this.qry_name, this.page.pageNo).subscribe(
      (page) => {
        this.page = page
      }
    )
  }

  setPage(pageInfo) {
    this.page.pageNo = pageInfo.offset + 1
    this.query()
  }

  reset() {
    this.qry_name = ""
    this.query()
  }

  add() {
    this.modalService.open<Market>({
      component: MarketFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {}
    }).subscribe(market => {
      console.log('Rebirth Modal -> Get ok with result:', market)
    }, error => {
      console.error('Rebirth Modal -> Get cancel with result:', error)
    })
  }

  edit(id: number) {
    this.modalService.open<Market>({
      component: MarketFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(market => {
      console.log('Rebirth Modal -> Get ok with result:', market)
    }, error => {
      console.error('Rebirth Modal -> Get cancel with result:', error)
    })
  }

}
