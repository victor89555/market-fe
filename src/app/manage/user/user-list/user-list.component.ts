import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "rebirth-ng";
import {UserFormComponent} from "../user-form/user-form.component";
import {UserService} from "../shared/user.service";
import {User} from "../shared/user.model";
import {Page} from "../../../thurder-ng/models/page.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: [
    "./user-list.component.scss",
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})

export class UserListComponent implements OnInit {

  editing = {}
  page: Page<any> = new Page()
  qry_name: string = ""
  qry_code: string = ""

  constructor(private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.query()
  }

  query() {
    this.userService.query(this.qry_name, this.page.pageNo).subscribe(
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
    this.modalService.open<User>({
      component: UserFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {}
    }).subscribe(user => {
      this.query()
    }, error => {
    })
  }

  edit(id: number) {
    this.modalService.open<User>({
      component: UserFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(() => {
      this.query()
    }, error => {
    })
  }

  delete(id: number) {
    this.userService.delete(id).subscribe(() => {
      this.query()
    })
  }

}
