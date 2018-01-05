import {Component, EventEmitter, OnInit} from '@angular/core';
import {User} from "../shared/user.model"
import {UserService} from "../shared/user.service"

@Component({
  selector: 'app-user-authorize',
  templateUrl: './user-authorize.component.html',
  styleUrls: ['./user-authorize.component.scss'],
})
export class UserAuthorizeComponent implements OnInit {
  context: { id: number, add: boolean };
  dismiss: EventEmitter<User>;

  user: User = new User()

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    this.userService.get(this.context.id).subscribe(
      (user) => {
        this.user = user;
      }
    )
  }

  save() {
    this.userService.save(this.user).subscribe(
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
