import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, ComponentFactoryResolver} from "@angular/core";
import {Modal,DialogService,ModalService} from "rebirth-ng";
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
import {ContractFormComponent} from "../../contract/contract-form/contract-form.component";

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
  electronicScales: any[]
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
              private httpClient: HttpClient,
              private modalService: ModalService,
              private dialogService: DialogService,
              private componentFactoryResolver: ComponentFactoryResolver) {
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
    this.electronicScaleService.getAll("", true).subscribe(
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
  alert(title,content) {  //弹框提示
    this.dialogService.alert({
      title: title,
      content: content,
      yes: '确定',
      icon: 'icon-success',
      html: true,
    })
      .subscribe(
        data => console.log('Rebirth alert get yes result:', data),
        error => console.error('Rebirth alert get no result:', error)
      );
  }
  isEletronicExist(id){   //判断电子称是否存在
       for(let i = 0; i<this.shop_con.length;i++){
          if(id==this.shop_con[i].id){
            this.alert('提示框','该电子秤已选择。');
            return true;
          }
       }
       return false;
  }
  allotment(val) {   //添加电子秤
    for (var i = 0; i < this.electronicScales.length; i++) {
      if (val == this.electronicScales[i].id && !this.isEletronicExist(val)) {
        this.shop_con.push({
          "sequenceNo": this.electronicScales[i].sequence_no,
          "softVersion": this.electronicScales[i].soft_version,
          "id":this.electronicScales[i].id
        })
      }
    }
  }

  cancel() {
    this.dismiss.error(this.shop);
  }

  delElectronicScale(sequenceNo) { //删除电子秤
     console.log('删除'+ sequenceNo)
     this.shop_con = this.shop_con.filter((sc)=>sc.sequenceNo!=sequenceNo);
  }

  addContract(id:number){
    this.modalService.open<Contract>({
      component: ContractFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(contract => {
      console.log('Rebirth Modal -> Get ok with result:', contract)
    }, error => {
      console.error('Rebirth Modal -> Get cancel with result:', error)
    })
  }
}

