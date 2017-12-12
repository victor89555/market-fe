import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "rebirth-permission"

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit{

  constructor(private authorizationService: AuthorizationService) {

  }

  ngOnInit(): void {
    this.authorizationService.getCurrentUser()
    // this.authorizationService.setCurrentUser(null)
  }
}
