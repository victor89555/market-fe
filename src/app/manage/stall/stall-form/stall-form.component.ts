import {Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from "rebirth-ng";
import {Stall} from "../shared/stall.model";
import {StallService} from "../shared/stall.service";
import {Market} from "../../market/shared/market.model"
import {MarketService} from "../../market/shared/market.service"

@Component({
  selector: 'app-stall-form',
  templateUrl: "./stall-form.component.html"
})
export class StallFormComponent implements Modal, OnInit {
  context: { id: number, add: boolean };
  dismiss: EventEmitter<Stall>;

  stall: any = {}
  markets: Market[]
  test: any
  marketId:number=null
  marketName:string =""
  closed = true
  close() {
    console.log('close');
    this.closed = true;
  }

  constructor(private stallService: StallService, private marketService: MarketService) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
   if(!this.context.add){
     this.getStall()
   }
   this.getAllMarkets()
  }
  getAllMarkets(){
    this.marketService.getAll().subscribe(
      (markets)=>{
        this.markets = markets;
      }
    )
  }
  // 第一次打开页面时显示的市场名称
  getMarket(marketId){
    this.marketService.get(marketId).subscribe(
      (market)=>{
        this.marketName = market.name;
      }
    )
  }
  onMarketNameChange =(market: Market) =>{ // 选中市场改变时调用
    console.log(market);
    this.marketId = market.id
    console.log(this.marketId)
  }
  marketNameFormatter = (market: Market) => { // 市场名称输入显示数据
    return market.name
  }

  getStall(){
    this.stallService.get(this.context.id).subscribe(
      (stall) => {
        this.stall = stall
        this.marketId = stall.marketId;
        this.getMarket(this.marketId)
      }
    )
  }
  save() {
    this.stall.marketId = this.marketId
    this.stallService.save(this.stall).subscribe(
      (stall) => {
        this.dismiss.emit(stall);
      }
    )
  }
  update() {
    this.stall.id = this.context.id;
    this.stall.marketId = this.marketId
    console.log(this.stall);
    this.stallService.update(this.context.id,this.stall).subscribe(
      (stall) => {
        this.dismiss.emit(this.stall);
      }
    )
  }
  cancel() {
    this.dismiss.error(this.stall);
  }
}

