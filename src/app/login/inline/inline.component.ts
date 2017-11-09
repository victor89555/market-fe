import { Component, ViewEncapsulation } from '@angular/core';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
@Component({
  selector: 'app-inline',
  templateUrl: './inline.component.html',
  styleUrls: [
    './themes/material.scss',
    './themes/dark.scss',
    './themes/bootstrap.scss',
    './themes/app.css'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    Location, {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
    ],
})

export class InlineComponent {

  curState:string

  get state() {
    return this.curState;
  }

  set state(state) {
    this.curState = state;
  }

  version: string = "1";
  constructor(location: Location) {
    this.state = location.path(true);
  }
}
