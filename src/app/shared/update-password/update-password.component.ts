import {Component, EventEmitter, OnInit} from '@angular/core';
import { UpdatePasswordService } from './updatePassword.service'
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
  providers:[UpdatePasswordService]
})
export class UpdatePasswordComponent implements OnInit {
  dismiss: EventEmitter<any>;
  password = {'origPwd':null,'newPwd':null,'newPwd1':null}
  clicked =false
  constructor(private updatePasswordService:UpdatePasswordService) { }

  ngOnInit() {
  }

  update() {
    if(this.validatePsdF()){
      this.updatePasswordService.update(this.password).subscribe(
        (psw) => {
          this.dismiss.emit(psw);
        }
      )
    }
  }
  cancel() {
    this.dismiss.error(this.password);
  }
  validateEqual(){
    this.clicked =true
    this.validateNewPwd1()
  }

  passwordForm = {
    origPwd:true,
    newPwd:true,
    newPwd1:true,
    equal:true
  }
  validatePsdF(){
    this.validateOrigPwd()
    this.validateNewPwd()
    this.validateNewPwd1()
    return this.passwordForm.origPwd &&
        this.passwordForm.newPwd &&
        this.passwordForm.newPwd1 &&
        this.passwordForm.equal
  }
  validateOrigPwd(){
    this.passwordForm.origPwd = this.password.origPwd != null
  }
  validateNewPwd(){
    this.passwordForm.newPwd = this.password.newPwd != null
  }
  validateNewPwd1(){
    this.passwordForm.newPwd1 = this.password.newPwd1 != null
    if(this.clicked){
      this.passwordForm.equal = this.password.newPwd == this.password.newPwd1
    }
  }
}
