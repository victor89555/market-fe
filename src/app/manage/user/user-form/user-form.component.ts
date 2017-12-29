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
    if(this.validateUser()){
      this.userService.save(this.user).subscribe(
        (user) => {
          this.dismiss.emit(user);
        }
      )
    }
    /*this.dismiss.emit(this.member);*/
  }

  update() {
    if(this.validateUser()){
      this.user.id = this.context.id;
      console.log(this.user);
      this.userService.update(this.context.id, this.user).subscribe(
        (user) => {
          this.dismiss.emit(user);
        }
      )
    }
  }

  cancel() {
    this.dismiss.error(this.user);
  }

  // 用户表单验证
  userForm = {
    name:true,
    mobile:true,
    manager:true,
    sex:true,
    enable:true
  }

  validateName(){
    this.userForm.name = this.user.name ? true : false
  }
  validateMobile(){
    this.userForm.mobile = this.user.mobile ? true : false
  }

  validateManager(){
    this.userForm.manager = this.user.manager ? true : false
  }
  validateSex(){
    this.userForm.sex = this.user.sex ? true : false
  }
  validateEnable(){
    this.userForm.enable = this.user.enable ? true : false
  }

  validateUser(){
    this.validateName()
    this.validateMobile()
    this.validateEnable()
    this.validateManager()
    this.validateSex()
    return this.userForm.name &&
        this.userForm.mobile &&
        this.userForm.manager &&
        this.userForm.sex &&
        this.userForm.enable

  }
}
