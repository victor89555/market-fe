import {Component, OnInit, ComponentFactoryResolver} from '@angular/core';
import {Page} from "../../../thurder-ng/models/page.model";
import {DetectionService} from "../shared/detection.service"
import {MarketService} from "../../market/shared/market.service";
import {Market} from "../../market/shared/market.model";
import {ModalService} from "rebirth-ng";
import {Detection} from "../shared/detection.model";
import { DetectionFormComponent} from "../detection-form/detection-form.component"

@Component({
  selector: 'app-detection-list',
  templateUrl: './detection-list.component.html',
  styleUrls: ['./detection-list.component.scss']
})
export class DetectionListComponent implements OnInit {
  page: Page<any> = new Page()
  queryDete = {marketId: null, stallName: "", sampleName: ""}
  markets: Market[]

  constructor(private detectionService: DetectionService,
              private marketService: MarketService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.query()
    this.getAllMarkets()
  }

  query() {
    this.detectionService.query(this.queryDete.marketId, this.queryDete.stallName,
      this.queryDete.sampleName, this.page.pageNo, 10).subscribe(
      (page) => {
        console.log(page)
        this.page = page
      }
    )
  }

  getAllMarkets() {
    this.marketService.getAll().subscribe(
      (markets) => {
        this.markets = markets;
      }
    )
  }

  setPage(pageInfo) {
    this.page.pageNo = pageInfo.offset + 1
    this.query()
  }

  check(id: number) {
    this.modalService.open<Detection>({
      component: DetectionFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(contract => {
      
    }, error => {

    })
  }

  reset() {
    for (let dete in this.queryDete) {
      this.queryDete[dete] = null
    }
    this.query()
  }

  goBack() {
    window.history.back()
  }
}
