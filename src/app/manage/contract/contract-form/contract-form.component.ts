import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild} from "@angular/core";
import {Modal} from "rebirth-ng";
import {Contract} from "../shared/contract.model";
import {ContractService} from "../shared/contract.service";
import {Market} from "../../market/shared/market.model";
import {MarketService} from "../../market/shared/market.service";
import {Shop} from "../../shop/shared/shop.model";
import {ShopService} from "../../shop/shared/shop.service";
import {dicts} from "../../../thurder-ng/models/dictionary";
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-contract-form',
  templateUrl: "./contract-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractFormComponent implements Modal, OnInit {
  context: { id: number,isShopForm: boolean,marketId: number, shopId: number, add:boolean, onlyRead: true}
  dismiss: EventEmitter<Contract>
  uploadFiles: any[]
  contract: Contract = new Contract()
  attachments: any[] = []
  markets: Market[]
  shops: Shop[]
  equipmentsOptions = ["电子秤","不锈钢架", "PC垫板","PPP占板","三防罩","操作交易台","上墙货架","展示架","交易台","宰杀操作台","蓄养池"];
  equipmentsLabel: string[]
  equipmentName = dicts["EQUIPMENT_NAME"]
  uploadUrl: string = "http://market-bus.djws.com.cn/api/contracts/attachments"
  @ViewChild("contractForm")
  contractForm:FormControl

  //提交
  onSubmitTest() {
    console.log(this.contractForm)
  }

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private contractService: ContractService,
              private marketService: MarketService,
              private shopService: ShopService) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
    //判断添加合同（合同管理里添加，商户管理里添加），修改合同
    if(this.context.add) {
      if(this.context.isShopForm){
        this.contract.marketId = this.context.marketId
        this.contract.shopId = this.context.shopId
      }
    }else {
      if(this.context.id){
        this.loadContract();
      }
    }

    this.loadMarkets()
    this.loadShops()

  }

  //加载市场信息列表
  loadMarkets(){
    this.marketService.getAll().subscribe(
      (markets) => {
        this.markets = markets
        this.changeDetectorRef.markForCheck()
      }
    )
  }

  //加载商户信息列表
  loadShops(){
    this.shopService.getAll(null).subscribe(
      (shops) => {
        this.shops = shops
        this.changeDetectorRef.markForCheck()
      }
    )
  }

  //加载合同信息
  loadContract(){
    this.contractService.get(this.context.id).subscribe(
      (contract) => {
        console.log("加载合同信息")
        console.log(contract)
        Object.assign(this.contract, contract)
        this.contract.hireEquipments && this.formatOptions(this.contract.hireEquipments)
        this.changeDetectorRef.markForCheck()
      }
    )
    this.contractService.getAttachments(this.context.id).subscribe(
      (attachments) => {
        console.log(attachments)
        this.attachments = attachments
        this.changeDetectorRef.markForCheck()
      }
    )
  }

  add() {
    // console.log(this.attachments)
    this.attachments.map((e)=> {
      this.contract.attachmentIds.push(e.id)
    })
    this.contractService.add(this.contract).subscribe(
      (contract) => {
        this.dismiss.emit(contract);
      }
    )
  }

  update() {
    console.log(this.attachments)
    this.attachments.map((e)=> {
      this.contract.attachmentIds.push(e.id)
    })
    this.formatLabel(this.equipmentsLabel)
    console.log(this.contract)
    this.contractService.update(this.context.id, this.contract).subscribe(
      (contract) => {
        this.dismiss.emit(contract)
      }
    )
  }

  cancel() {
    this.dismiss.error(this.contract)
  }

  onRemoveDone(files) {
    console.log("files", files)
  }

  uploadFilesChange($event) {
    this.uploadFiles = $event.map(item => item.uploadResponse.path)
  }

  onDeleteAttachments(idx) {
    this.attachments.splice(idx,1);
  }

  onUploadSuccess($event) {
    this.attachments.push($event.uploadResponse)
    console.log(this.attachments)
  }

  formatOptions(str) {
    let arr = []
    str.split(",").map((item) => {
      arr.push(this.equipmentName[item])
    })
    this.equipmentsLabel = arr
  }

  formatLabel(e) {
    let arr = []
    for(let i=0; i < e.length; i++) {
      for(let key in this.equipmentName) {
        if(e[i] == this.equipmentName[key]) {
          arr.push(key)
          continue
        }
      }
    }
    this.contract.hireEquipments = arr.join(',')
  }
}

