import {Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from "rebirth-ng";
import {Stall} from "../shared/stall.model";
import {StallService} from "../shared/stall.service";
import {Market} from "../../market/shared/market.model"
import {MarketService} from "../../market/shared/market.service"
import {Validator} from "../../../shared/validator";

@Component({
  selector: 'app-stall-form',
  templateUrl: "./stall-form.component.html"
})
export class StallFormComponent implements Modal, OnInit {
  context: { id: number, add: boolean, marketId: number };
  dismiss: EventEmitter<Stall>;

  stall: Stall = new Stall()
  markets: Market[]
  test: any
  marketId: number = null
  marketName: string = ""
  closed = true
  disable: boolean = false// 用于判断市场下拉框是否可用
  close() {
    this.closed = true;
  }

  constructor(private stallService: StallService, private marketService: MarketService,
              private validator: Validator) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
    if (!this.context.add) {
      this.getStall()
    } else {
      this.marketId = this.context.marketId;
      this.getMarket(this.marketId)
      this.disable = true
    }
    this.getAllMarkets()
  }

  getAllMarkets() {
    this.marketService.getAll().subscribe(
      (markets) => {
        this.markets = markets;
      }
    )
  }

  // 第一次打开页面时显示的市场名称
  getMarket(marketId) {
    this.marketService.get(marketId).subscribe(
      (market) => {
        this.marketName = market.name;
      }
    )
  }

  getStall() {  // 修改时执行
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
    if (this.validateStall()) {
      this.stallService.save(this.stall).subscribe(
        (stall) => {
          this.dismiss.emit(stall);
        }
      )
    }
  }

  update() {
    this.stall.id = this.context.id;
    this.stall.marketId = this.marketId
    if (this.validateStall()) {
      console.log(this.stall);
      this.stallService.update(this.context.id, this.stall).subscribe(
        (stall) => {
          this.dismiss.emit(this.stall);
        }
      )
    }
  }

  cancel() {
    this.dismiss.error(this.stall);
  }

  //摊位验证
  stallForm = {
    marketId: true,
    name: true,
    funcType: true,
    area: true,
    areaFormat: true,
    status: true
  }

  validateMarketId() {
    this.stallForm.marketId = this.stall.marketId ? true : false
  }

  validateName() {
    this.stallForm.name = this.stall.name ? true : false
  }

  validateFuncType() {
    this.stallForm.funcType = this.stall.funcType !=null
  }

  validateArea() {
    this.stallForm.area = this.stall.area ? true : false
    this.stallForm.areaFormat = this.validator.isNum(this.stall.area)
  }

  validateStatus() {
    this.stallForm.status = this.stall.status !=null
  }

  validateStall() {
    this.validateName()
    this.validateStatus()
    this.validateMarketId()
    this.validateArea()
    this.validateFuncType()
    return this.stallForm.status &&
      this.stallForm.area &&
      this.stallForm.funcType &&
      this.stallForm.name &&
      this.stallForm.marketId
  }
}

