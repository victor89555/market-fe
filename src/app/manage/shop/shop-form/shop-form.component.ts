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
import {ElectronicScale} from "../../electronicScale/shared/electronicScale.model";

@Component({
  selector: 'app-shop-form',
  templateUrl: "./shop-form.component.html",
  styleUrls: ['./shop-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopFormComponent implements OnInit {

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

  dismiss: EventEmitter<Shop>;

  shopId: number //商户ID
  // 页面组件
  pageComponent = {
    tabs: false
  }
  shop: Shop = new Shop() //商户信息
  operatorName : string = "请选择经营者"
  operators: Operator[] //操作者列表
  markets: Market[] //市场列表
  market: Market //市场
  stalls: Stall[] //摊位列表
  stallName: string = "请选择摊位"
  contracts: Contract[] //合同列表
  allotableElectronicScales: any[] //可分配的电子秤列表
  allotedElectronicScales = [] //已分配的电子秤列表
  selectedScale: ElectronicScale

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
    // 获取商户Id
    this.route.params.forEach((params: Params) => {
      this.shopId = params['id'];
    });
    // 判断是添加商户还是修改商户
    if (this.shopId > 0) {
      this.initEditShop();
    }else{
      this.initAddShop();
    }
  }

  // 初始化添加商户
  initAddShop() {
    console.log('初始化添加商户界面...');
    this.pageComponent.tabs = false;
  }

  // 初始化修改商户
  initEditShop() {
    console.log('初始化修改商户界面...');
    this.pageComponent.tabs = true;
    this.loadShop().subscribe(() => {
      this.loadOperator();
      this.loadMarket();
    });
  }

  loadShop() { // 商户
    let shopOb = this.shopService.get(this.shopId);
    shopOb.subscribe(
      (shop) => {
        console.log(shop)
        this.shop = shop
        this.changeDetectorRef.markForCheck()
      }
    )
    return shopOb
  }

  loadOperator() { // 加载经营者
    this.operatorService.getAll().subscribe(
      (operators) => {
        console.log(operators)
        this.operators = operators
      }
    )
  }

  loadOperators() { // 经营者
    this.operatorService.getAll().subscribe(
      (operators) => {
        console.log(operators)
        this.operators = operators
      }
    )
  }

  addOperator() { //添加经营者
    console.log("打开添加页面")
    this.operatorService;
  }

  stallNameFormatter = (stall: Stall) => { // 摊位输入显示数据
    return stall.name
  }

  scaleNameFormatter = (scale: any) => { // 摊位输入显示数据
    return scale.sequence_no
  }

  onStallNameChange(stall: Stall) { // 摊位内容改变时调用
    console.log(stall)
    this.shop.stallId = stall.id
    this.shop.funcType = stall.funcType
  }

  onScaleSelected(scale:any) {
    this.selectedScale = new ElectronicScale()
    this.selectedScale.shopId = scale.shop_id
    this.selectedScale.lastUpdateUser = scale.last_update_user
    this.selectedScale.sequenceNo = scale.sequence_no
    this.selectedScale.softVersion = scale.soft_version
    this.selectedScale.marketId = scale.market_id
    this.selectedScale.shopId = scale.shop_id
    this.selectedScale.status = scale.status
  }

  operatorNameFormatter = (operator: Operator) => { // 经营者输入显示数据
    return operator.name + " " + operator.tel
  }
  onOperatorNameChange = (operator: Operator) => { // 经营者内容改变时调用
    console.log(operator)

  }

  loadStall() {  //摊位
    console.log(this.shop.marketId,this.shop.id)
    this.stallService.getStalls(
      this.shop.marketId,
      this.shop.id
      // this.shop.funcType,
      // this.selectedScale.status
    ).subscribe(
      (stalls) => {
        console.log(stalls)
        this.stalls = stalls  //摊位对象
      }
    )
  }

  loadMarket() { //市场
    let marketOb = this.marketService.getAll();
    marketOb.subscribe(
      (markets) => {
        // console.log(markets)
        this.markets = markets
      }
    )
    return marketOb
  }

  changeMarket(marketId) {
    // console.log(marketId, this.shop.marketId);
    // this.sele.marketId = marketId;
    this.loadStall();
  }
  loadElectronicScale() { // 电子秤
    this.electronicScaleService.getAllotableElectronic(this.shop.marketId).subscribe(
      (electronicScales) => {
        // console.log(electronicScales)
        this.allotableElectronicScales = electronicScales
      }
    )
    this.electronicScaleService.getAllotedElectronic(this.shop.marketId, this.shopId).subscribe(
      (electronicScales) => {
        // console.log(electronicScales)
        this.allotedElectronicScales = electronicScales
      }
    )
  }


  loadContractor() { // 获取合同
    this.contractService.query(this.shopId, 1, 100).subscribe(
      (page) => {
        // console.log(page)
        this.contracts = page.items
      }
    )
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

  allot() {   //添加电子秤
    this.electronicScaleService.update(this.selectedScale.id, this.selectedScale)
  }

  save() {
    this.shopService.save(this.shop).subscribe(
      (shop) => {
        this.router.navigate(['/manage/shops']);
      }
    )
  }

  cancel() {
    this.router.navigate(['/manage/shops']);
  }

  delElectronicScale(sequenceNo) { //删除电子秤
    console.log('删除' + sequenceNo)
    // this.electronicScaleService.unbind()
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

    })
  }
}

