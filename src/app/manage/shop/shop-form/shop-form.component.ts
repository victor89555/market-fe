import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from "rebirth-ng";
import {Shop} from "../shared/shop.model";
import {ShopService} from "../shared/shop.service";
import {Market} from "../../market/shared/market.model";
import {Stall} from "../../stall/shared/stall.model";
import {Operator} from "../../operator/shared/operator.model";
import {StallService} from "../../stall/shared/stall.service";
import {MarketService} from "../../market/shared/market.service";
import {OperatorService} from "../../operator/shared/operator.service";
import {ElectronicScaleService} from "../../electronicScale/shared/electronicScale.service";
import {ElectronicScale} from "../../electronicScale/shared/electronicScale.model";
import {Contract} from "../../contract/shared/contract.model";
import {ContractService} from "../../contract/shared/contract.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-shop-form',
  templateUrl: "./shop-form.component.html",
  styleUrls: ['./shop-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopFormComponent implements Modal, OnInit {
  context: { id: number };
  dismiss: EventEmitter<Shop>;

  shop: any = {}
  markets: Market[]
  stalls: Stall[]
  operators: Operator[]
  electronicScales: ElectronicScale[]
  contracts: Contract[]
  electronicScale = []
  contract = []
  shop_con = []

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private shopService: ShopService,
              private stallService: StallService,
              private marketService: MarketService,
              private operatorService: OperatorService,
              private electronicScaleService: ElectronicScaleService,
              private contractService: ContractService,
              private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
    this.stallService.getAll().subscribe(
      (stalls) => {
        this.stalls = stalls
      }
    )
    this.marketService.getAll().subscribe(
      (markets) => {
        this.markets = markets
      }
    )
    this.operatorService.getAll().subscribe(
      (operators) => {
        this.operators = operators
      }
    )
    this.electronicScaleService.getAll().subscribe(
      (electronicScales) => {
        this.electronicScales = electronicScales
        this.getDetail()
      }
    )
    this.contractService.getAll().subscribe(
      (contracts) => {
        this.contracts = contracts
      }
    )
    this.shopService.get(this.context.id).subscribe(
      (shop) => {
        this.shop = shop
        this.changeDetectorRef.markForCheck()
      }
    )

  }

  save() {
    this.shopService.save(this.shop).subscribe(
      (shop) => {
        this.dismiss.emit(shop);
      }
    )
  }

  getDetail() {
    for (var i = 0; i < this.electronicScales.length; i++) {
      this.electronicScale.push(this.electronicScales[i].id)
    }
  }

  allotment(val) {
    for (var i = 0; i < this.electronicScales.length; i++) {
      if (val == this.electronicScales[i].id) {
        this.shop_con.push({
          "sequenceNo": this.electronicScales[i].sequenceNo,
          "softVersion": this.electronicScales[i].softVersion
        })
      }
    }
  }

  cancel() {
    this.dismiss.error(this.shop);
  }
}

