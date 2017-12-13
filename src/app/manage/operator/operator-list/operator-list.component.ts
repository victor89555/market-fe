import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {OperatorFormComponent} from "../operator-form/operator-form.component";
import {OperatorService} from "../shared/operator.service";
import {Operator} from "../shared/operator.model";
import {Page} from "../../../thurder-ng/models/page.model";

@Component({
  selector: 'app-operator-list',
  templateUrl: './operator-list.component.html',
  styleUrls: [
    "./operator-list.component.scss",
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})

export class OperatorListComponent implements OnInit {

  editing = {}
  page: Page<any> = new Page()
  qry_name: string = ""

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private operatorService: OperatorService) {
  }

  ngOnInit(): void {
    this.query()
  }
  query() {
    this.operatorService.query(this.qry_name, this.page.pageNo).subscribe(
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
    this.modalService.open<Operator>({
      component: OperatorFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
      }
    }).subscribe(operator => {
      console.log('Rebirth Modal -> Get ok with result:', operator)
    }, error => {

    })
  }

  edit(id: number) {
    this.modalService.open<Operator>({
      component: OperatorFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(operator => {
      console.log('Rebirth Modal -> Get ok with result:', operator)
    }, error => {

    })
  }

}
