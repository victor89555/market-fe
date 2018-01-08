import {Component, OnInit, ComponentFactoryResolver} from '@angular/core';
import {AuthorizationService} from "rebirth-permission"
import {CurrentUser} from "../model/current-user.model";
import {Router} from "@angular/router";
import {rootRoute} from "@angular/router/src/router_module";
import {ModalService} from "rebirth-ng";
import { UpdateInfoComponent } from "../info/update-info/update-info.component"
import { UpdatePasswordComponent } from "../update-password/update-password.component"

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
    private router: Router,
    private modalService: ModalService,
    private componentFactoryResolver: ComponentFactoryResolver
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

  updateInfo() {
    this.modalService.open<any>({
      component: UpdateInfoComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
      }
    }).subscribe(operator => {

    }, error => {

    })
  }

  updatePassword() {
    this.modalService.open<any>({
      component: UpdatePasswordComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
      }
    }).subscribe(operator => {

    }, error => {

    })
  }
}
