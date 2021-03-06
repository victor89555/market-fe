import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService, NotifyService, DialogService} from "rebirth-ng";
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
  queryOperator = {"name": "", "mobile": ""}
  index: number = 0

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private operatorService: OperatorService,
              private alertBoxService: NotifyService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.query()
  }

  query() {
    this.operatorService.query(this.queryOperator.name,
      this.queryOperator.mobile, 1, 10).subscribe(
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
    this.queryOperator.name = ""
    this.queryOperator.mobile = ""
    this.query()
  }

  add() {
    this.modalService.open<Operator>({
      component: OperatorFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        "add": true
      }
    }).subscribe(operator => {
      console.log('Rebirth Modal -> Get ok with result:', operator)
      this.query()
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
      this.query()
    }, error => {

    })
  }

  delete(id: number,name:string) {
    this.dialogService.confirm({
      title: '提示',
      content: `确定要删除经营者：${name}？`,
      html: false,

      yes: '确定',
      no: '取消'
    })
      .subscribe(
        data => {
          this.operatorService.delete(id).subscribe(() => {
            this.query()
          })
        },
        error => {
        }
      );
  }

  //测试用Alert
  openAlert() {
    this.alertBoxService.placement("top")
    this.alertBoxService.open({
      type: 'danger',
      html: '<strong>err!</strong>it\'s a test error message!(' + this.index++ + ')'
    }, 2000);
  }
}
