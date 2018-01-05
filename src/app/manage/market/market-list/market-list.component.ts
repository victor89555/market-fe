import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService, DialogService} from "rebirth-ng";
import {MarketFormComponent} from "../market-form/market-form.component";
import {MarketService} from "../shared/market.service";
import {Market} from "../shared/market.model";
import {Page} from "../../../thurder-ng/models/page.model";
import {Area} from "../../../thurder-ng/components/area/area.mode"

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
  queryArea: Area = new Area()
  queryMarket = {name: null, address: null, status: null, provinceCode: null, cityCode: null, addr: null};

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private marketService: MarketService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.query()
  }

  query() {
    this.marketService.simpleQuery(this.queryMarket, this.page.pageNo, 10).subscribe(
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
    this.queryMarket.status = null
    this.queryMarket.provinceCode = null
    this.queryMarket.cityCode = null
    this.queryArea.cityCode = null
    this.queryArea.provinceCode = null
    this.query()
  }

  delete(id: number,name:string) {
    this.dialogService.confirm({
      title: '提示',
      content:`确定要删除市场：${name}？`,
      html: false,

      yes:'确定',
      no:'取消'
    })
      .subscribe(
        data => {
          this.marketService.delete(id).subscribe(() => {
            this.query()
          })
        },
        error => {
        }
      );
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

  onProvinceChange(province) {
    this.queryMarket.provinceCode = province
  }

  onCityChange(city) {
    this.queryMarket.cityCode = city
  }
}
