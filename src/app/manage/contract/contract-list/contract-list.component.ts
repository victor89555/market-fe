import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {ContractFormComponent} from "../contract-form/contract-form.component";
import {ContractService} from "../shared/contract.service";
import {Contract} from "../shared/contract.model";
import {Page} from "../../../thurder-ng/models/page.model";

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: [
    "./contract-list.component.scss",
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})

export class ContractListComponent implements OnInit {

  editing = {}
  page: Page<any> = new Page()
  qry_name: string = ""

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private contractService: ContractService) {
  }

  ngOnInit(): void {
    this.query()
  }

  query() {
    this.contractService.query(this.qry_name, this.page.pageNo).subscribe(
      (page) => {
        this.page = page
      }
    )
  }

  reset() {
    this.qry_name = ""
    this.query()
  }

  add() {
    this.modalService.open<Contract>({
      component: ContractFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
      }
    }).subscribe(contract => {
      console.log('Rebirth Modal -> Get ok with result:', contract)
    }, error => {

    })
  }

  edit(id: number) {
    this.modalService.open<Contract>({
      component: ContractFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(contract => {
      console.log('Rebirth Modal -> Get ok with result:', contract)
    }, error => {

    })
  }

}
