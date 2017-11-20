import {Routes} from "@angular/router";
import {ManageAppComponent} from "./manage-app.component";
import {AuthLoginPermission} from "rebirth-permission";
import {UserMockComponent} from "./user-mock/user-mock.component";
import {OrderListComponent} from "./order/order-list/order-list.component";
import {MarketListComponent} from "./market/market-list/market-list.component";
import {StallListComponent} from "./stall/stall-list/stall-list.component";

export const ROUTER_CONFIG: Routes = [
  {
    path: 'manage',
    component: ManageAppComponent,
    canActivate: [AuthLoginPermission],
    children: [
      // can use role AuthRolePermission
      {path: '', pathMatch: 'full', redirectTo: 'orders'},
      {path: 'orders', component: OrderListComponent},
      {path: 'markets', component: MarketListComponent},
      {path: 'stalls', component: StallListComponent},
      {path: 'user', component: UserMockComponent},
      {path: 'document', component: UserMockComponent},
    ]
  }
];
