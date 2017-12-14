import { Component, OnInit, EventEmitter } from '@angular/core';
import {Modal} from "rebirth-ng";
import {Member} from "../shared/member.model";
import {MemberService} from "../shared/member.service";

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit, Modal {
  context: { id: number, add: boolean };
  dismiss: EventEmitter<Member>;
  constructor(private memberService:MemberService) { }
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
    this.memberService.save(this.member).subscribe(
      (member) => {
        this.dismiss.emit(member);
      }
    )
  }
  update() {
    console.log(this.member);
    this.memberService.update(this.context.id, this.member).subscribe(
      (member) => {
        this.dismiss.emit(member);
      }
    )
  }
  cancel() {
    this.dismiss.error(this.member);
  }

}
