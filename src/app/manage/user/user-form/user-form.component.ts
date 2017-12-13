import {Component, EventEmitter, OnInit} from '@angular/core';
import {Modal} from "rebirth-ng";
import {UserService} from "../shared/user.service";
import {User} from "../shared/user.model";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, Modal {
  context: { id: number, add: boolean };
  dismiss: EventEmitter<User>;

  constructor(private userService: UserService) {
  }

  user: any = {}

  ngOnInit() {
    console.log('ModalTestComponent init....');
    if (!this.context.add) {
      this.getUser();
    }
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

  update() {
    this.user.id = this.context.id;
    console.log(this.user);
    this.userService.update(this.context.id, this.user).subscribe(
      (user) => {
        this.dismiss.emit(user);
      }
    )
  }

  cancel() {
    this.dismiss.error(this.user);
  }

}
