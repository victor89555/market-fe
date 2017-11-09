import { Routes } from '@angular/router';
// import { AuthLoginPermission } from 'rebirth-permission';
import { InlineComponent } from './order-list.component';
import { FooterComponent } from './order-form/foot.component';
import { InlineEditComponent } from './order-form/order-list-edit.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: '',
    component: InlineComponent,
    // canActivate: [AuthLoginPermission],
    children: [
      // can use role AuthRolePermission
      { path: '', pathMatch: 'full', redirectTo: 'home' },


    ]
  }
];
