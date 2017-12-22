import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router'

@Component({
  selector: 'app-stall-history',
  templateUrl: './stall-history.component.html',
  styleUrls: ['./stall-history.component.scss']
})
export class StallHistoryComponent implements OnInit {
  stallId:number
  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((params:Params)=>{
      this.stallId = params['stallId']
      console.log(this.stallId)
    })
  }

}
