import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {DialogService, ModalService} from "rebirth-ng";
import {RoleFormComponent} from "../role-form/role-form.component";
import {Role} from "../shared/role.model";
import {RoleService} from "../shared/role.service";
import {Page} from "../../../thurder-ng/models/page.model";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: [
    "./role-list.component.scss",
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})

export class RoleListComponent implements OnInit {

  editing = {}
  page: Page<any> = new Page()
  qry_name: string = ""
  qry_code: string = ""

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private roleService: RoleService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.query()
  }

  query() {
    this.roleService.query(this.qry_name, this.page.pageNo).subscribe(
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
    this.qry_name = "";
    this.qry_code = ""
    this.query()
  }

  add() {
    this.modalService.open<Role>({
      component: RoleFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {"add": true}
    }).subscribe(user => {
        this.query()
      },
      error => {
      })
  }

  edit(id: number) {
    this.modalService.open<Role>({
      component: RoleFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(user => {
        this.query()
      },
      error => {
      })
  }

  delete(id: number, name: string) {
    this.dialogService.confirm({
      title: '提示',
      content: `确定要删除角色：${name}？`,
      html: false,
      yes: '确定',
      no: '取消'
    }).subscribe(
      data => {
        this.roleService.delete(id).subscribe(() => {
          this.query()
        })
      },
      error => {
      }
    );
  }

}
