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
  context: { id: number,isShopForm: boolean,marketId: number };
  dismiss: EventEmitter<Contract>;
  uploadFiles: any[];
  contract: any = {}
  markets: Market[]
  shops: Shop[]

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private contractService: ContractService,
              private marketService: MarketService,
              private shopService: ShopService) {
  }

  ngOnInit(): void {
    console.log('ModalTestComponent init....');
    this.marketService.getAll().subscribe(
      (markets) => {
        this.markets = markets
      }
    )
    this.shopService.getAll(null).subscribe(
      (shops) => {
        this.shops = shops
      }
    )
    if(!this.context.isShopForm){
      this.loadContract();
    }
  }
  loadContract(){
    this.contractService.get(this.context.id).subscribe(
      (contract) => {
        this.contract = contract
        this.changeDetectorRef.markForCheck()
      }
    )
  }
  save() {
    this.contractService.save(this.contract).subscribe(
      (contract) => {
        this.dismiss.emit(contract);
      }
    )
  }

  cancel() {
    this.dismiss.error(this.contract);
  }

  onRemoveDone(files) {
    console.log('files', files);
  }

  uploadFilesChange($event) {
    this.uploadFiles = $event.map(item => item.uploadResponse.path);
  }
}

