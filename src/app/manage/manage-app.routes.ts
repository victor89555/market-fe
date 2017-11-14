import {Routes} from '@angular/router';
import {ManageAppComponent} from './manage-app.component';
import {AuthLoginPermission} from 'rebirth-permission';
import {UserMockComponent} from './user-mock/user-mock.component';
import {OrderListComponent} from "./order/order-list/order-list.component"

export const ROUTER_CONFIG: Routes = [
  {
    path: 'manage',
    component: ManageAppComponent,
    canActivate: [AuthLoginPermission],
    children: [
      // can use role AuthRolePermission
      {path: '', pathMatch: 'full', redirectTo: 'orders'},
      {path: 'orders', component: OrderListComponent},
      {path: 'user', component: UserMockComponent},
      {path: 'document', component: UserMockComponent},
    ]
  }
];
