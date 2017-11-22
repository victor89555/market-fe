import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {ElectronicScaleService} from "../shared/electronicScale.service";
import {ElectronicScale} from "../shared/electronicScale.model";
import {Page} from "../../../thurder-ng/models/page.model";
import {ElectronicScaleFormComponent} from "../electronicScale-form/electronicScale-form.component";

@Component({
  selector: 'app-electronicScale-list',
  templateUrl: './electronicScale-list.component.html',
  styleUrls: [
    "./electronicScale-list.component.scss",
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})

export class ElectronicScaleListComponent implements OnInit {

  editing = {}
  page: Page<any> = new Page()
  qry_name: string = ""

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private electronicScaleService: ElectronicScaleService) {
  }

  ngOnInit(): void {
    this.query()
  }

  query() {
    this.electronicScaleService.query(this.qry_name, this.page.pageNo).subscribe(
      (page) => {
        this.page = page
      }
    )
  }

  setPage(pageInfo) {
    this.page.pageNo = pageInfo.offset + 1
    this.query()
  }

  reset() {
    this.qry_name = ""
    this.query()
  }

  add() {
    this.modalService.open<ElectronicScale>({
      component: ElectronicScaleFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {}
    }).subscribe(electronicScale => {
      console.log('Rebirth Modal -> Get ok with result:', electronicScale)
    }, error => {
      console.error('Rebirth Modal -> Get cancel with result:', error)
    })
  }

  edit(id: number) {
    this.modalService.open<ElectronicScale>({
      component: ElectronicScaleFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(electronicScale => {
      console.log('Rebirth Modal -> Get ok with result:', electronicScale)
    }, error => {
      console.error('Rebirth Modal -> Get cancel with result:', error)
    })
  }

}
