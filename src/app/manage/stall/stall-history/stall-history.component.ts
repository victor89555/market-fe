import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router'
import {Page} from "../../../thurder-ng/models/page.model";
import {StallService} from "../shared/stall.service";

@Component({
  selector: 'app-stall-history',
  templateUrl: './stall-history.component.html',
  styleUrls: ['./stall-history.component.scss']
})
export class StallHistoryComponent implements OnInit {
  stallId:number
  page: Page<any> = new Page()
  constructor(private route: ActivatedRoute,
              private router: Router,
              private  stallService:StallService) { }

  ngOnInit() {
    this.route.params.forEach((params:Params)=>{
      this.stallId = params['stallId']
    })
    this.query();
  }
  // 获取摊位历史信息
  query() {
    this.stallService.queryHistory(this.page.pageNo,10,this.stallId).subscribe(
      (page) => {
        this.page = page
      }
    )
  }
  setPage(pageInfo) {
    this.page.pageNo = pageInfo.offset + 1
    this.query()
  }
}
