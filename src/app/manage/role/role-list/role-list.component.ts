import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
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
              private roleService: RoleService) {
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
      resolve: { "add": true}
    }).subscribe(user => {
      this.query()
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
    })
  }

  delete(id: number) {
    this.roleService.delete(id).subscribe(() => {
      this.query()
    })
  }

}
