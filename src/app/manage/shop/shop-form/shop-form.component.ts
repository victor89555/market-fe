import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  OnInit
} from "@angular/core";
import {DialogService, Modal, ModalService} from "rebirth-ng";
import {Shop} from "../shared/shop.model";
import {ShopService} from "../shared/shop.service";
import {Market} from "../../market/shared/market.model";
import {Stall} from "../../stall/shared/stall.model";
import {Operator} from "../../operator/shared/operator.model";
import {StallService} from "../../stall/shared/stall.service";
import {MarketService} from "../../market/shared/market.service";
import {OperatorService} from "../../operator/shared/operator.service";
import {ElectronicScaleService} from "../../electronicScale/shared/electronicScale.service";
import {Contract} from "../../contract/shared/contract.model";
import {ContractService} from "../../contract/shared/contract.service";
import {HttpClient} from "@angular/common/http";
import {ContractFormComponent} from "../../contract/contract-form/contract-form.component";
import {ActivatedRoute, Params, Router} from '@angular/router';

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
  stallNames = [] //摊位名称
  // stallname:Observable = new Subject()
  stallName: string = ""
  operators: Operator[]
  electronicScales: any[]
  contracts: Contract[]
  allotElectronicScales = []
  contract = []
  shop_con = []
  shop_id: number //商户

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
              private componentFactoryResolver: ComponentFactoryResolver,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.shop_id = id;
    });
    this.loadStall();
    this.loadMarket();
    this.loadOperator();
    this.loadElectronicScale();
    this.loadContractor();
    this.loadShop();
    debugger
  }

  onStallNameChange(name) {
    console.log(name)
  }

  loadStall() {  //摊位
    this.stallService.getAll().subscribe(
      (stalls) => {
        this.stalls = stalls  //摊位对象
        for (let i = 0; i < stalls.length; i++) {
          this.stallNames.push(stalls[i].name);
        }
      }
    )
  }

  onSearch = (term) => {
    return this.stalls;
  }

  loadMarket() { //市场
    this.marketService.getAll().subscribe(
      (markets) => {
        this.markets = markets
      }
    )
  }

  loadOperator() { //操作者
    this.operatorService.getAll().subscribe(
      (operators) => {
        this.operators = operators
      }
    )
  }

  loadElectronicScale() { // 电子秤
    this.electronicScaleService.getAll("", true).subscribe(
      (electronicScales) => {
        this.electronicScales = electronicScales
        this.getDetail()
      }
    )
  }

  loadContractor() { // 获取合同
    this.contractService.getAll().subscribe(
      (contracts) => {
        this.contracts = contracts
      }
    )
  }

  loadShop() { // 商户
    this.shopService.get(this.shop_id).subscribe(
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
      this.allotElectronicScales.push(this.electronicScales[i].sequence_no)
    }
  }

  alert(title, content) {  // 弹框提示
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

  isEletronicExist(id) {   // 判断电子称是否存在
    for (let i = 0; i < this.shop_con.length; i++) {
      if (id == this.shop_con[i].id) {
        this.alert('提示框', '该电子秤已选择。');
        return true;
      }
    }
    return false;
  }

  allotment(val) {   //添加电子秤
    for (let i = 0; i < this.electronicScales.length; i++) {
      if (val == this.electronicScales[i].sequence_no && !this.isEletronicExist(this.electronicScales[i].id)) {
        this.shop_con.push({
          "sequenceNo": this.electronicScales[i].sequence_no,
          "softVersion": this.electronicScales[i].soft_version,
          "id": this.electronicScales[i].id
        })
      }
    }
  }

  cancel() {
    this.dismiss.error(this.shop);
  }

  delElectronicScale(sequenceNo) { //删除电子秤
    console.log('删除' + sequenceNo)
    this.shop_con = this.shop_con.filter((sc) => sc.sequenceNo != sequenceNo);
  }

  addContract(id: number) { //增加合同
    this.modalService.open<Contract>({
      component: ContractFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id,
        isShopForm: true, //判断是否从商户管理进入。
        marketId: ''

      }
    }).subscribe(contract => {
      this.loadContractor();
    }, error => {
      console.error('Rebirth Modal -> Get cancel with result:', error)
    })
  }
}

