import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild} from "@angular/core";
import {Modal} from "rebirth-ng";
import {Contract} from "../shared/contract.model";
import {ContractService} from "../shared/contract.service";
import {Market} from "../../market/shared/market.model";
import {MarketService} from "../../market/shared/market.service";
import {Shop} from "../../shop/shared/shop.model";
import {ShopService} from "../../shop/shared/shop.service";
import {dicts} from "../../../thurder-ng/models/dictionary";
import {FormControl} from '@angular/forms';
import {AttachmentService} from "../../shared/attachment.service"
import {AuthorizationService} from "rebirth-permission"
import {environment} from "../../../../environments/environment"

@Component({
  selector: 'app-contract-form',
  templateUrl: "./contract-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractFormComponent implements Modal, OnInit {
  context: { id: number, isShopForm: boolean, marketId: number, shopId: number, add: boolean, onlyRead: true }
  dismiss: EventEmitter<Contract>
  uploadFiles: any[]
  contract: Contract = new Contract()
  attachments: any[] = []
  markets: Market[]
  shops: Shop[]
  equipmentsOptions = ["电子秤", "不锈钢架", "PC垫板", "PPP占板", "三防罩", "操作交易台", "上墙货架", "展示架", "交易台", "宰杀操作台", "蓄养池"];
  equipmentsLabel: string[]
  equipmentName = dicts["EQUIPMENT_NAME"]
  uploadUrl: string = environment.api.host + "/contracts/attachments"
  uploadRequestHeaders: any
  @ViewChild("contractForm")
  contractForm: FormControl = new FormControl()

  //提交
  onSubmitTest() {
    console.log(this.contractForm)
    // this.validateForm()
  }

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private contractService: ContractService,
              private marketService: MarketService,
              private shopService: ShopService,
              private attachmentService: AttachmentService,
              private authorizationService: AuthorizationService) {
  }

  ngOnInit(): void {
    const currentUser = this.authorizationService.getCurrentUser()
    if (currentUser) {
      this.uploadRequestHeaders = {headers: {Authorization: `Bearer ${currentUser.token }`}}
    }
    //判断添加合同（合同管理里添加，商户管理里添加），修改合同
    if (this.context.add) {
      if (this.context.isShopForm) {
        this.contract.marketId = this.context.marketId
        this.contract.shopId = this.context.shopId
      }
    } else {
      if (this.context.id) {
        this.loadContract();
      }
    }

    this.loadMarkets()
    this.loadShops()

  }

  //加载市场信息列表
  loadMarkets() {
    this.marketService.getAll().subscribe(
      (markets) => {
        this.markets = markets
        this.changeDetectorRef.markForCheck()
      }
    )
  }

  //加载商户信息列表
  loadShops() {
    this.shopService.getAll(null).subscribe(
      (shops) => {
        this.shops = shops
        this.changeDetectorRef.markForCheck()
      }
    )
  }

  //加载合同信息
  loadContract() {
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
    if (this.validateForm()) {
      // console.log(this.attachments)
      this.attachments.map((e) => {
        this.contract.attachmentIds.push(e.id)
      })
      this.contractService.add(this.contract).subscribe(
        (contract) => {
          this.dismiss.emit(contract);
        }
      )
    }
  }

  update() {
    if (this.validateForm()) {
      // console.log(this.attachments)
      this.attachments.map((e) => {
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

  downloadAttachment(id, fileName) {
    this.attachmentService.download(id, fileName)
  }

  onDeleteAttachments(idx) {
    this.attachments.splice(idx, 1);
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
    for (let i = 0; i < e.length; i++) {
      for (let key in this.equipmentName) {
        if (e[i] == this.equipmentName[key]) {
          arr.push(key)
          continue
        }
      }
    }
    this.contract.hireEquipments = arr.join(',')
  }


  //验证表单
  contractValidateForm = {
    startTime: {
      status: true,
      errText: ''
    },
    endTime: {
      status: true,
      errText: ''
    },
    status: {
      status: true,
      errText: ''
    },
    totalAmount: {
      status: true,
      errText: ''
    },
    scaleDeposit: {
      status: true,
      errText: ''
    },
    manageFee: {
      status: true,
      errText: ''
    },
    equipmentDeposit: {
      status: true,
      errText: ''
    },
    remark: {
      status: true,
      errText: ''
    },
    equipmentsLabel: {
      status: true,
      errText: ''
    },
    attachments: {
      status: true,
      errText: ''
    }
  }

  validateForm() {
    this.validateStartTime()
    this.validateEndTime()
    this.validateStatus()
    this.validateTotalAmount()
    this.validateScaleDeposit()
    this.validateManageFee()
    this.validateRemark()
    this.validateEquipmentsLabel()
    this.validateAttachments()

    return this.contractValidateForm.startTime.status &&
      this.contractValidateForm.endTime.status &&
      this.contractValidateForm.status.status &&
      this.contractValidateForm.totalAmount.status &&
      this.contractValidateForm.scaleDeposit.status &&
      this.contractValidateForm.manageFee.status &&
      this.contractValidateForm.remark.status &&
      this.contractValidateForm.equipmentsLabel.status &&
      this.contractValidateForm.attachments.status
  }

  //验证签约时间
  validateStartTime() {
    let e = this.contractValidateForm.startTime
    //验证为空
    if (this.isEmpty(this.contract.signTime)) {
      e.status = false
      e.errText = "签约时间不能为空"
    } else {
      e.status = true
    }
    return true
  }

  changeStartTime() {
    console.log(1)
    this.validateStartTime()
  }

  //验证到期时间
  validateEndTime() {
    let e = this.contractValidateForm.endTime
    //验证为空
    if (this.isEmpty(this.contract.validityTime)) {
      e.status = false
      e.errText = "到期时间不能为空"
      return false
    } else {
      e.status = true
    }
    //验证到期时间大于签约时间
    let st = new Date(this.contract.signTime).getTime()
    let et = new Date(this.contract.validityTime).getTime()
    if (et - st > 0) {
      e.status = true
    } else {
      e.status = false
      e.errText = "到期时间不能小于签约时间"
      return false
    }
    return true
  }

  changeEndTime() {
    this.validateEndTime()
  }

  //验证状态
  validateStatus() {
    let e = this.contractValidateForm.status
    //验证不能为空
    if (this.isEmpty(this.contract.status)) {
      e.status = false
      e.errText = '请选择状态'
      return false
    } else {
      e.status = true
    }
    return true
  }

  //验证店铺租金
  validateTotalAmount() {
    let e = this.contractValidateForm.totalAmount

  }

  //验证电子称押金
  validateScaleDeposit() {
    let e = this.contractValidateForm.scaleDeposit

  }

  //验证市场管理费
  validateManageFee() {
    let e = this.contractValidateForm.manageFee

  }

  //验证备注
  validateRemark() {
    let e = this.contractValidateForm.remark
  }

  //验证租用设备
  validateEquipmentsLabel() {
    let e = this.contractValidateForm.equipmentsLabel
  }

  //验证附件
  validateAttachments() {
    let e = this.contractValidateForm.attachments
  }

  //判断值为空
  isEmpty(val) {
    if (typeof val == "undefined" || val == null || val == "") {
      return true;
    } else {
      return false;
    }
  }
}

