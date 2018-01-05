import { Component, OnInit, EventEmitter } from '@angular/core';
import {Modal} from "rebirth-ng";
import {Member} from "../shared/member.model";
import {MemberService} from "../shared/member.service";
import { Validator } from "../../../shared/validator"

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit, Modal {
  context: { id: number, add: boolean };
  dismiss: EventEmitter<Member>;
  constructor(private memberService:MemberService,
  private validator:Validator) { }
  member: any = {}

  ngOnInit() {
    console.log('ModalTestComponent init....');
    if(!this.context.add){
      this.getMember();
    }
  }
  getMember(){
    this.memberService.get(this.context.id).subscribe(
      (member) => {
        this.member = member;
      }
    )
  }
  save() {
    if(this.validateMember()){
      this.memberService.save(this.member).subscribe(
        (member) => {
          this.dismiss.emit(member);
        }
      )
    }
  }
  update() {
    if(this.validateMember()){
      console.log(this.member);
      this.memberService.update(this.context.id, this.member).subscribe(
        (member) => {
          this.dismiss.emit(member);
        }
      )
    }
  }
  cancel() {
    this.dismiss.error(this.member);
  }

  //页面验证
  memberForm = {
    cardNo:true,
    name : true,
    mobile: true,
    mobileFormat: true,
    idCardNo: true,
    idCardNoFormat: true
  }

  validateCardNo(){
    this.memberForm.cardNo = this.member.cardNo ? true : false
  }
  validateName(){
    this.memberForm.name = this.member.name ? true : false
  }
  validateMobile(){
    this.memberForm.mobile = this.member.mobile ? true : false
    this.memberForm.mobileFormat = this.validator.isMobile(this.member.mobile)
  }
  validateIdCardNo(){
    this.memberForm.idCardNo = this.member.idCardNo ? true : false
    this.memberForm.idCardNoFormat = this.validator.isCardNo(this.member.idCardNo)
  }

  validateMember(){
    this.validateCardNo()
    this.validateIdCardNo()
    this.validateMobile()
    this.validateName()
    return this.memberForm.cardNo &&
        this.memberForm.name &&
        this.memberForm.mobile &&
        this.memberForm.idCardNo &&
        this.memberForm.mobileFormat &&
        this.memberForm.idCardNoFormat
  }
}
