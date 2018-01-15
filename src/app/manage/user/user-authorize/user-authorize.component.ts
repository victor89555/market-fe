import {Component, EventEmitter, OnInit} from '@angular/core';
import {User} from "../shared/user.model"
import {UserService} from "../shared/user.service"
import {RoleService} from "../../role/shared/role.service"
import {Role} from "../../role/shared/role.model"

@Component({
  selector: 'app-user-authorize',
  templateUrl: './user-authorize.component.html',
  styleUrls: ['./user-authorize.component.scss'],
})
export class UserAuthorizeComponent implements OnInit {
  context: { id: number, add: boolean };
  dismiss: EventEmitter<User>;

  user: User = new User()
  roles: Role[] = []
  checkedRoles: Role[] = []
  labelFormatter = (item) => item && item.name;
  valueParser = (item) => item && item.id;

  constructor(private userService: UserService, private roleService: RoleService) {
  }

  ngOnInit() {
    this.getRoles()
  }

  getUser() {
    this.userService.get(this.context.id).subscribe(
      (user) => {
        this.user = user;
      }
    )
  }

  getRoles() {
    this.roleService.getAll().subscribe(
      (roles) => {
        this.roles = roles
        this.userService.get(this.context.id).subscribe(
          (user) => {
            this.user = user;
            this.checkedRoles = this.roles.filter(role => user.roleIds.find(id => id == role.id))
          })
      }
    )
  }

  save() {
    this.user.roleIds = this.checkedRoles.map(role => {
      return role.id
    })
    this.userService.update(this.context.id, this.user).subscribe(
      (user) => {
        this.dismiss.emit(user);
      }
    )
    /*this.dismiss.emit(this.member);*/
  }

  cancel() {
    this.dismiss.error(this.user);
  }

}
