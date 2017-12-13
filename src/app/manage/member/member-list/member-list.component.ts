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
  queryName ={'mobile':'', 'name':'', 'cardno':'', 'idcardno':''};

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
    this.memberService.query(this.queryName.mobile, this.page.pageNo).subscribe(
      (page) => {
        this.page = page
      }
    )
  }
  reset() {

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
    }, error => {

    })
  }
}
