import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "rebirth-permission"
import {CurrentUser} from "../model/current-user.model";
import {Router} from "@angular/router";
import {rootRoute} from "@angular/router/src/router_module";

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit{


  user = new CurrentUser()
  userSet = {
    open: false
  }
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.user = this.authorizationService.getCurrentUser()
  }

  logOut(){
    this.authorizationService.setCurrentUser(null)
    this.userSet.open = false;
    this.router.navigate(['/']);
  }

  onUserClick(){
    this.userSet.open = this.userSet.open ? false :true
  }
}
