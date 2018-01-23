import {Component, OnInit} from '@angular/core';
import {DetectionService} from  "../shared/detection.service"
import {Detection} from "../shared/detection.model";
import {ShopService} from "../../shop/shared/shop.service";
import {MarketService} from "../../market/shared/market.service";
import {Shop} from "../../shop/shared/shop.model";
import {Market} from "../../market/shared/market.model";

@Component({
  selector: 'app-detection-form',
  templateUrl: './detection-form.component.html',
  styleUrls: ['./detection-form.component.scss']
})
export class DetectionFormComponent implements OnInit {

  detection: Detection
  shop:Shop
  market:Market
  context: { id: number }

  constructor(private detectionService: DetectionService,
              private shopService: ShopService,
              private marketService: MarketService) {
  }

  ngOnInit() {
    this.get(this.context.id)
  }

  get(id: number) {
    this.detectionService.get(id).subscribe((detection) => {
      this.detection = detection
      if(detection.shopId!=null){
        this.getShop(detection.shopId)
      }
      if(detection.marketId!=null){
        this.getMarket(detection.marketId)
      }
    })
  }

  getShop(shopId:number){
    this.shopService.get(shopId).subscribe((shop)=>{
       this.shop = shop
    })
  }

  getMarket(marketId){
    this.marketService.get(marketId).subscribe((market)=>{
      this.market = market
    })
  }
}
