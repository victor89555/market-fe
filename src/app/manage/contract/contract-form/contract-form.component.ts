import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit} from "@angular/core";
import {Modal} from "rebirth-ng";
import {Contract} from "../shared/contract.model";
import {ContractService} from "../shared/contract.service";
import {Market} from "../../market/shared/market.model";
import {MarketService} from "../../market/shared/market.service";
import {Shop} from "../../shop/shared/shop.model";
import {ShopService} from "../../shop/shared/shop.service";

@Component({
  selector: 'app-contract-form',
  templateUrl: "./contract-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractFormComponent implements Modal, OnInit {
  context: { id: number,isShopForm: boolean,marketId: number, shopId: number, add:boolean};
  dismiss: EventEmitter<Contract>;
  uploadFiles: any[];
  contract: Contract = new Contract()
  attachments: any[] = []
  markets: Market[]
  shops: Shop[]
  uploadUrl: string = "http://market-bus.djws.com.cn/api/contracts/attachments"

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
        Object.assign(this.contract, contract)
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

  save() {
    this.attachments.map((e)=> {
      this.contract.attachmentIds.push(e.uploadResponse.id)
    })
    this.contractService.save(this.contract).subscribe(
      (contract) => {
        this.dismiss.emit(contract);
      }
    )
  }

  update() {
    this.attachments.map((e)=> {
      this.contract.attachmentIds.push(e.uploadResponse.id)
    })
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
    this.attachments.push($event)
    console.log(this.attachments)
  }
}

