import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {StallFormComponent} from "../stall-form/stall-form.component";
import {StallService} from "../shared/stall.service";
import {Stall} from "../shared/stall.model";
import {MarketService} from "../../market/shared/market.service";
import {Page} from "../../../thurder-ng/models/page.model";

@Component({
  selector: 'app-stall-list',
  templateUrl: './stall-list.component.html',
  styleUrls: [
    "./stall-list.component.scss",
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})

export class StallListComponent implements OnInit {

  editing = {}
  page: Page<any> = new Page()
  queryStall = {"market":"", "shop":"", "func":"", "status":"", "name":""}

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private stallService: StallService,
              private marketService: MarketService) {
  }

  ngOnInit(): void {
    this.query()
  }
  query() {
    this.stallService.query(this.queryStall.market, this.queryStall.shop,
      this.queryStall.func,this.queryStall.status,this.queryStall.name,this.page.pageNo).subscribe(
      (page) => {
        this.page = page
      }
    )
  }

  reset() {
    this.queryStall.status = ""
    this.queryStall.market = ""
    this.queryStall.shop = ""
    this.queryStall.func = ""
    this.queryStall.name = ""
    this.query()
  }

  add() {
    this.modalService.open<Stall>({
      component: StallFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        "add": true
      }
    }).subscribe(stall => {
      console.log('Rebirth Modal -> Get ok with result:', stall)
    }, error => {
      console.error('Rebirth Modal -> Get cancel with result:', error)
    })
  }

  edit(id: number) {
    this.modalService.open<Stall>({
      component: StallFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(stall => {
      console.log('Rebirth Modal -> Get ok with result:', stall)
    }, error => {
      console.error('Rebirth Modal -> Get cancel with result:', error)
    })
  }
  delete(id:number){
    this.stallService.delete(id).subscribe(() => {
      debugger
      this.query()
    })
  }
}
