import {Component, ComponentFactoryResolver, OnInit, ViewEncapsulation} from '@angular/core';
import {Page} from "../../../thurder-ng/models/page.model";
import {MemberService} from "../shared/member.service";
import {ModalService} from "rebirth-ng";
import {Member} from "../shared/member.model";
import {MemberFormComponent} from "../member-form/member-form.component";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MemberListComponent implements OnInit {

  constructor(private memberService: MemberService,
              private modalService: ModalService,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.query()
  }
  page: Page<any> = new Page()
  queryMember ={'mobile':'', 'name':'', 'cardNo':'', 'idCardNo':''};

  setPage(pageInfo) {
    this.page.pageNo = pageInfo.offset + 1
    this.query()
  }

  add() {
    this.modalService.open<Member>({
      component: MemberFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        add :true
      }
    }).subscribe(member => {
      console.log('Rebirth Modal -> Get ok with result:', member)
    }, error => {

    })
  }

  query() {
    this.memberService.query(this.queryMember.name,this.queryMember.mobile,this.queryMember.cardNo,
      this.queryMember.idCardNo,1,10 ).subscribe(
      (page) => {
        this.page = page
      }
    )
  }
  reset() {
    this.queryMember.idCardNo=""
    this.queryMember.cardNo=""
    this.queryMember.name=""
    this.queryMember.mobile=""
    this.query()
  }
  edit(id: number) {
    this.modalService.open<Member>({
      component: MemberFormComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        id: id
      }
    }).subscribe(member => {
      console.log('Rebirth Modal -> Get ok with result:', member)
      this.query()
    }, error => {

    })
  }
  delete(id:number){
    this.memberService.delete(id).subscribe(()=>{
      this.query()
    })
  }
}
