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
  queryMarket = {'name': '', 'address': '', 'state': '','province':'','city':''};

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private marketService: MarketService) {
  }

  ngOnInit(): void {
    this.query()
  }

  query() {
    this.marketService.query(this.queryMarket.name, this.queryMarket.address, this.queryMarket.state,
      this.page.pageNo, 10,this.queryMarket.province, this.queryMarket.city).subscribe(
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
    this.queryMarket.name = ""
    this.queryMarket.address = ""
    this.queryMarket.state = ""
    this.query()
  }

  delete(id: number) {
    this.marketService.delete(id).subscribe(() => {
      debugger
      this.query()
    })
  }
  delete1(name) {
    console.log(name);
  }
  add() {
    this.modalService.open<Market>({
      component: MarketFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        "add": true
      }
    }).subscribe(market => {
      console.log('Rebirth Modal -> Get ok with result:', market)
      // 重新获取一次数据
      this.query()
    }, error => {

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
      // 重新获取一次数据
      this.query()
    }, error => {

    })
  }
  onProvinceChange(province){
    this.queryMarket.province = province
  }
  onCityChange(city){
    this.queryMarket.city = city
  }
}
