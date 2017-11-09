import { Routes } from '@angular/router';
import { ManageAppComponent } from './manage-app.component';
import { AuthLoginPermission } from 'rebirth-permission';
import { OrderMockComponent } from './order-mock/order-mock.component';
import { UserMockComponent } from './user-mock/user-mock.component';
import { InlineComponent } from './order/order-list.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: '',
    component: ManageAppComponent,
    canActivate: [AuthLoginPermission],
    children: [
      // can use role AuthRolePermission
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: OrderMockComponent },
      { path: 'order', component: OrderMockComponent },
      { path: 'user', component: UserMockComponent },
      { path: 'document', component: UserMockComponent },
      { path: 'inline', component: InlineComponent },
    ]
  }
];
