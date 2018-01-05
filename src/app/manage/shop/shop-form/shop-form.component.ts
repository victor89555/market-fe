import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  OnInit
} from "@angular/core";

import {DialogService, ModalService} from "rebirth-ng";
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
import {ContractFormComponent} from "../../contract/contract-form/contract-form.component";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ElectronicScale} from "../../electronicScale/shared/electronicScale.model";
import {OperatorFormComponent} from "../../operator/operator-form/operator-form.component";
import {dicts} from "../../../thurder-ng/models/dictionary";

@Component({
  selector: 'app-shop-form',
  templateUrl: "./shop-form.component.html",
  styleUrls: ['./shop-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopFormComponent implements OnInit {

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private shopService: ShopService,
              private stallService: StallService,
              private marketService: MarketService,
              private operatorService: OperatorService,
              private electronicScaleService: ElectronicScaleService,
              private contractService: ContractService,
              private modalService: ModalService,
              private dialogService: DialogService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private route: ActivatedRoute,
              private router: Router
  ) {}

  dismiss: EventEmitter<Shop>

  shopId: number//商户ID
  // 页面组件
  pageComponent = {
    newShop: true
  }
  shop: Shop = new Shop() //商户信息
  operatorName : string = "请选择经营者"
  operators: Operator[] //操作者列表
  markets: Market[] //市场列表
  market: Market //市场
  stalls: Stall[] //摊位列表
  stallName: string = "请选择摊位"
  stallChange:boolean
  contracts: Contract[] //合同列表
  allotableElectronicScales = [] //可分配的电子秤列表
  allotedElectronicScales = [] //已分配的电子秤列表
  selectedScale: ElectronicScale
  shopStatus = dicts["SHOP_STATUS"]

  operatorRequired:boolean = false

  shopForm = {
    shopName: true,
    marketId: true,
    operatorId: true,
    stallId: true,
    funcType: true,
    status: true
  }

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
    // 用于判断保存与修改摊位的展示
    this.stallChange = this.shopId == 0
  }

  // 初始化添加商户
  initAddShop() {
    console.log('初始化添加商户界面...');
    this.pageComponent.newShop = true;
    this.loadOperators();
    this.loadMarket();
  }

  // 初始化修改商户
  initEditShop() {
    console.log('初始化修改商户界面...');
    this.pageComponent.newShop = false;
    this.loadShop().subscribe(() => {
      this.loadOperators();
      this.loadMarket();
      this.loadContractor();
    });
  }

  loadShop() { // 商户
    let shopOb = this.shopService.get(this.shopId);
    shopOb.subscribe(
      (shop) => {
        console.log(shop)
        this.shop = shop
        this.shop.operatorId && this.loadOperator(this.shop.operatorId)
        this.stallName = this.shop.stallName
        // this.shop.stallId && this.loadStall(this.shop.stallId);
        this.changeDetectorRef.markForCheck()
      }
    )
    return shopOb
  }

  loadOperator(operatorId) { // 加载经营者
    // console.log(this.shop.operatorId)
    this.operatorService.get(operatorId).subscribe(
      (operator) => {
        // console.log(operator)
        this.operatorName = operator.name + "（" + operator.mobile + "）"
        this.changeDetectorRef.markForCheck()
      }
    )
  }

  loadOperators() { // 经营者列表
    this.operatorService.getAll().subscribe(
      (operators) => {
        // console.log(operators)
        this.operators = operators
        this.changeDetectorRef.markForCheck()
      }
    )
  }

  loadStalls() {  //摊位列表
    this.stallService.getUsableStalls(this.shop.marketId).subscribe(
      (stalls) => {
        // console.log(stalls)
        this.stalls = stalls  //摊位对象
        this.changeDetectorRef.markForCheck()
      }
    )
  }

  loadStall(stallId) { //摊位名
    this.stallService.get(stallId).subscribe(
      (stall) => {
        // console.log(stall)
        this.stallName = stall.name;
        this.changeDetectorRef.markForCheck()
      }
    )
  }

  loadMarket() { //市场
    let marketOb = this.marketService.getAll();
    marketOb.subscribe(
      (markets) => {
        // console.log(markets)
        this.markets = markets
        this.loadStalls();
        if(this.shopId>0){
          this.loadElectronicScale()
        }
        this.changeDetectorRef.markForCheck()
      }
    )
    return marketOb
  }

  onMarketChange(marketId) {
    this.shop.marketId = marketId
    this.validateMarketId()
    this.loadStalls();
  }

  onFuncTypeChange(funcType) {
    this.shop.funcType = funcType
    this.validateFuncType()
  }

  onStatusChange(status) {
    this.shop.status = status
    this.validateStatus()
  }

  onStallNameChange(stall: Stall) { // 摊位内容改变时调用
    this.shop.stallId = stall.id
    this.shop.funcType = this.shop.funcType ? this.shop.funcType : stall.funcType
    this.validateStallId()
  }

  onScaleSelected(scale:any) {
    this.selectedScale = new ElectronicScale()
    this.selectedScale.id = scale.id
    this.selectedScale.lastUpdateUser = scale.last_update_user
    this.selectedScale.sequenceNo = scale.sequence_no
    this.selectedScale.softVersion = scale.soft_version
    this.selectedScale.marketId = scale.market_id
    this.selectedScale.shopId = scale.shop_id
    this.selectedScale.status = scale.status
  }

  operatorNameFormatter = (operator: Operator) => { // 经营者输入显示数据
    return operator.name + "（" + operator.mobile + "）"
  }

  onOperatorNameChange = (operator: Operator) => { // 经营者内容改变时调用
    this.shop.operatorId = operator.id
    this.operatorRequired = false
    this.validateOperatorId()
  }

  addOperator() { //添加经营者
    this.modalService.open<Operator>({
      component: OperatorFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        add: true
      }
    }).subscribe(operator => {
      console.log('Rebirth Modal -> Get ok with result:', operator)
      this.operatorName = operator.name + "（" + operator.mobile + "）"
      this.shop.operatorId = operator.id
      this.loadOperators()
      this.validateOperatorId()
    }, error => {

    })
  }
  stallNameFormatter = (stall: Stall) => { // 摊位输入显示数据
    return stall.name
  }

  scaleNameFormatter = (scale: any) => { // 电子秤输入显示数据
    return scale.sequence_no
  }

  loadElectronicScale() { // 电子秤
    this.electronicScaleService.getAllotableElectronic(this.shop.marketId).subscribe(
      (electronicScales) => {
        // console.log(electronicScales)
        this.allotableElectronicScales = electronicScales
        this.changeDetectorRef.detectChanges()
      }
    )
    this.electronicScaleService.getAllotedElectronic(this.shop.marketId, this.shopId).subscribe(
      (electronicScales) => {
        // console.log(electronicScales)
        this.allotedElectronicScales = electronicScales
        this.changeDetectorRef.detectChanges()
      }
    )
  }

  loadContractor() { // 获取合同
    this.contractService.query(1, 100, this.shopId).subscribe(
      (page) => {
        console.log(page)
        this.contracts = page.items
        this.changeDetectorRef.markForCheck()
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

  //分配电子秤
  allotElectronicScale() {
    // console.log(this.selectedScale)
    this.selectedScale.shopId = this.shopId;
    this.electronicScaleService.bind(this.selectedScale.id, this.selectedScale).subscribe(()=>{
      this.loadElectronicScale()
    })
  }

  //解绑电子秤
  unbindElectronicScale(id) {
    this.dialogService.confirm({
      title: '提示',
      content: '是否解绑该电子秤',
      html: false,
      yes: '确定',
      no: '取消'
    })
      .subscribe(
        data => {
          this.electronicScaleService.unbind(id).subscribe(() => {
            this.loadElectronicScale()
          })
        },
        error => {}
      );
  }

  //添加商户
  addShop() {
    if(this.validateShop()) {
      this.shopService.add(this.shop).subscribe(
        (shop) => {
          this.router.navigate(['/manage/shops']);
        }
      )
    }
  }

  //编辑保存商户
  editShop() {
    if(this.validateShop()) {
      this.shopService.save(this.shopId, this.shop).subscribe(
        (shop) => {
          this.router.navigate(['/manage/shops']);
        }
      )
    }
  }

  //验证商户表单
  validateShop() {
    console.log(this.shop)
    //验证商户名称
    this.validateShopName()
    //验证市场Id
    this.validateMarketId()
    //验证经营者
    this.validateOperatorId()
    //验证摊位
    this.validateStallId()
    //验证功能区
    this.validateFuncType()
    //验证状态
    this.validateStatus()

    return this.shopForm.shopName &&
      this.shopForm.marketId &&
      this.shopForm.operatorId &&
      this.shopForm.stallId &&
      this.shopForm.funcType &&
      this.shopForm.status
  }
  validateShopName(){
    this.shopForm.shopName = this.shop.name ? true : false
  }
  validateMarketId(){
    this.shopForm.marketId = this.shop.marketId ? true : false
  }
  validateOperatorId(){
    this.shopForm.operatorId = this.shop.operatorId ? true : false
  }
  validateStallId(){
    this.shopForm.stallId = this.shop.stallId ? true : false
  }
  validateFuncType(){
    this.shopForm.funcType = this.shop.funcType ? true : false
  }
  validateStatus(){
    this.shopForm.status = typeof this.shop.status == "number" ? true : false
  }

  cancel() {
    window.history.back()
  }

  addContract() { //增加合同
    this.modalService.open<Contract>({
      component: ContractFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        isShopForm: true, //判断是否从商户管理进入。
        marketId: this.shop.marketId,
        shopId: this.shopId,
        add: true
      }
    }).subscribe(contract => {
      this.loadContractor();
    }, error => {

    })
  }

  editContract(id: number) { //编辑合同
    this.modalService.open<Contract>({
      component: ContractFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        isShopForm: true, //判断是否从商户管理进入。
        marketId: this.shop.marketId,
        shopId: this.shopId,
        add: false,
        id: id
      }
    }).subscribe(contract => {
      this.loadContractor();
    }, error => {

    })
  }

  deleteContract(id: number) { //删除合同
    this.dialogService.confirm({
      title: '提示',
      content: '是否删除该合同',
      html: false,
      yes: '确定',
      no: '取消'
    })
      .subscribe(
        data => {
          this.contractService.deleteContract(id).subscribe(
            (res) => {
              console.log(res)
              this.loadContractor()
            }
          )
        },
        error => {}
      );
  }

  saveChangeStall(){
     this.shopService.changeStall(this.shopId,this.shop.stallId).subscribe(
       (res)=>{
         if(res){
           this.stallService.get(this.shop.stallId).subscribe(
             (resStall)=>{
               this.stallName = resStall.name
               this.stallChange = false
               this.validateStallId()
             }
           )
         }
       })
  }
  operatorsBlur(value){
    console.log(this.shop.operatorId)
    if(this.shop.operatorId==null){
      this.operatorRequired = true
    }
  }
}

