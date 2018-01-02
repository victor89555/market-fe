import {Routes} from "@angular/router";
import {ManageAppComponent} from "./manage-app.component";
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
import {AuthLoginPermission} from "rebirth-permission"
import {OrderStatisticsComponent} from "./order/order-statistics/order-statistics.component"
import {StallHistoryComponent} from "./stall/stall-history/stall-history.component";
import {ShopStatisticsComponent} from "./shop/shop-statistics/shop-statistics.component";
import {MarketStatisticsComponent} from "./market/market-statistics/market-statistics.component";
import {ElectronicScaleHistoryComponent} from "./electronicScale/electronic-scale-history/electronic-scale-history.component";
import {MonthReportComponent} from "./report/month-report/month-report.component";

export const ROUTER_CONFIG: Routes = [
  {
    path: 'manage',
    component: ManageAppComponent,
    canActivate: [AuthLoginPermission],
    children: [
      // can use role AuthRolePermission
      {path: '', pathMatch: 'full', redirectTo: 'orders'},
      {path: 'orders', component: OrderListComponent},
      {path: 'orderStatistics', component: OrderStatisticsComponent},
      {path: 'markets', component: MarketListComponent},
      {path: 'marketStatistics', component: MarketStatisticsComponent},
      {path: 'stalls', component: StallListComponent},
      {path: 'stalls/:marketId', component: StallListComponent},
      {path: 'stalls/history/:stallId', component: StallHistoryComponent},
      {path: 'operators', component: OperatorListComponent},
      {path: 'shops', component: ShopListComponent},
      {path: 'shops/statistics/:shopId', component: ShopStatisticsComponent},
      {path: 'electronicScales', component: ElectronicScaleListComponent},
      {path: 'electronicScalesHistory/:id', component: ElectronicScaleHistoryComponent},
      {path: 'contracts', component: ContractListComponent},
      {path: 'shopForm/:id', component: ShopFormComponent},
      {path: 'orderLines/:id', component: OrderFormComponent},
      {path: 'members', component: MemberListComponent},
      {path: 'users', component:UserListComponent},
      {path: 'roles', component:RoleListComponent},
      {path: 'monthReport', component:MonthReportComponent,}
    ]
  }
];
