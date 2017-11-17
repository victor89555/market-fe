import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {MarketFormComponent} from "../market-form/market-form.component";
import {MarketService} from "../shared/market.service";
import {Market} from "../shared/market.model";

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
  markets = []
  qry_name: string = ""

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private marketService: MarketService) {
  }

  ngOnInit(): void {
    this.marketService.query().subscribe(
      (markets) => {
        this.markets = markets
      }
    )
  }

  query() {
    this.marketService.query(this.qry_name).subscribe(
      (markets) => {
        this.markets = markets
      }
    )
  }

  reset() {
    this.marketService.query().subscribe(
      (markets) => {
        this.markets = markets
      }
    )
  }

  add() {
    this.modalService.open<Market>({
      component: MarketFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
      }
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

  updateValue(event, cell, rowIndex) {
    console.log('order editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false
    this.markets[rowIndex][cell] = event.target.value
    this.markets = [...this.markets]
    console.log('UPDATED!', this.markets[rowIndex][cell])
  }
}
