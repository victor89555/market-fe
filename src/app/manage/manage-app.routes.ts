import {Routes} from "@angular/router";
import {ManageAppComponent} from "./manage-app.component";
import {AuthLoginPermission} from "rebirth-permission";
import {UserMockComponent} from "./user-mock/user-mock.component";
import {OrderListComponent} from "./order/order-list/order-list.component";
import {MarketListComponent} from "./market/market-list/market-list.component";
import {StallListComponent} from "./stall/stall-list/stall-list.component";
import {OperatorListComponent} from "./operator/operator-list/operator-list.component";
import {ShopListComponent} from "./shop/shop-list/shop-list.component";
import {ElectronicScaleListComponent} from "./electronicScale/electronicScale-list/electronicScale-list.component";
import {ContractListComponent} from "./contract/contract-list/contract-list.component";
import {ShopFormComponent} from "./shop/shop-form/shop-form.component";
import {OrderFormComponent} from "./order/order-form/order-form.component";
import {MemberListComponent} from "./member/member-list/member-list.component";
import {UserListComponent} from "./user/user-list/user-list.component";
import {RoleListComponent} from "./role/role-list/role-list.component";

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
      {path: 'operators', component: OperatorListComponent},
      {path: 'shops', component: ShopListComponent},
      {path: 'electronicScales', component: ElectronicScaleListComponent},
      {path: 'contracts', component: ContractListComponent},
      {path: 'user', component: UserMockComponent},
      {path: 'document', component: UserMockComponent},
      {path: 'shopForm/:id', component: ShopFormComponent},
      {path: 'orderLines/:id', component: OrderFormComponent},
      {path: 'members', component: MemberListComponent},
      {path: 'users', component:UserListComponent},
      {path: 'roles', component:RoleListComponent}
    ]
  }
];
