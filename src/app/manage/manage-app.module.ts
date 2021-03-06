import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {ManageAppComponent} from "./manage-app.component";
import {SharedModule} from "../shared/shared.module";
import {ROUTER_CONFIG} from "./manage-app.routes";
import {MenuService} from "./menu.service";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
// import {NgxDatatableModule} from "@swimlane/ngx-datatable/src";  // ng build打包时需要使用这个路径
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OrderFormComponent} from "./order/order-form/order-form.component";
import {OrderListComponent} from "./order/order-list/order-list.component";
import {OrderService} from "./order/shared/order.service";
import {MarketFormComponent} from "./market/market-form/market-form.component";
import {MarketListComponent} from "./market/market-list/market-list.component";
import {MarketService} from "./market/shared/market.service";
import {StallListComponent} from "./stall/stall-list/stall-list.component";
import {StallFormComponent} from "./stall/stall-form/stall-form.component";
import {StallService} from "./stall/shared/stall.service";
import {ThurderNGModule} from "../thurder-ng/thurder-ng.module";
import {OperatorListComponent} from "./operator/operator-list/operator-list.component";
import {OperatorFormComponent} from "./operator/operator-form/operator-form.component";
import {ShopFormComponent} from "./shop/shop-form/shop-form.component";
import {ShopListComponent} from "./shop/shop-list/shop-list.component";
import {OperatorService} from "./operator/shared/operator.service";
import {ShopService} from "./shop/shared/shop.service";
import {ElectronicScaleListComponent} from "./electronicScale/electronicScale-list/electronicScale-list.component";
import {ElectronicScaleFormComponent} from "./electronicScale/electronicScale-form/electronicScale-form.component";
import {ElectronicScaleService} from "./electronicScale/shared/electronicScale.service";
import {ContractListComponent} from "./contract/contract-list/contract-list.component";
import {ContractFormComponent} from "./contract/contract-form/contract-form.component";
import {ContractService} from "./contract/shared/contract.service";
import {MemberListComponent} from './member/member-list/member-list.component';
import {MemberFormComponent} from './member/member-form/member-form.component';
import {MemberService} from "./member/shared/member.service";
import {UserListComponent} from './user/user-list/user-list.component';
import {UserFormComponent} from './user/user-form/user-form.component';
import {UserService} from "./user/shared/user.service";
import {RoleListComponent} from './role/role-list/role-list.component';
import {RoleFormComponent} from './role/role-form/role-form.component';
import {RoleService} from "./role/shared/role.service";
import {ResourceService} from "./resource/shared/resource.service";
import {OrderStatisticsComponent} from './order/order-statistics/order-statistics.component'
import {NgxEchartsModule} from "ngx-echarts";
import {ContractViewComponent} from './contract/contract-view/contract-view.component'
import {StallHistoryComponent} from './stall/stall-history/stall-history.component';
import {MarketStatisticsComponent} from './market/market-statistics/market-statistics.component'
import {ShopStatisticsComponent} from './shop/shop-statistics/shop-statistics.component';
import {ElectronicScaleHistoryComponent} from './electronicScale/electronic-scale-history/electronic-scale-history.component';
import {MonthReportComponent} from './report/month-report/month-report.component'
import {ReportService} from "./report/shared/report.service";
import {UserAuthorizeComponent} from './user/user-authorize/user-authorize.component'
import {AttachmentService} from './shared/attachment.service';
import { ResourceListComponent } from './resource/resource-list/resource-list.component';
import { DetectionListComponent } from './detection/detection-list/detection-list.component';
import { DetectionFormComponent } from './detection/detection-form/detection-form.component'
import { DetectionService } from './detection/shared/detection.service';
import { RepairReportsComponent } from './market/repair-reports/repair-reports.component'

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ThurderNGModule,
    RouterModule.forChild(ROUTER_CONFIG),
    NgxDatatableModule,
    NgxEchartsModule
  ],
  exports: [],
  declarations: [
    ManageAppComponent,
    OrderListComponent,
    OrderFormComponent,
    MarketFormComponent,
    MarketListComponent,
    StallListComponent,
    StallFormComponent,
    OperatorListComponent,
    OperatorFormComponent,
    ShopFormComponent,
    ShopListComponent,
    ElectronicScaleListComponent,
    ElectronicScaleFormComponent,
    ContractListComponent,
    ContractFormComponent,
    MemberListComponent,
    MemberFormComponent,
    UserListComponent,
    UserFormComponent,
    RoleListComponent,
    RoleFormComponent,
    OrderStatisticsComponent,
    ContractViewComponent,
    StallHistoryComponent,
    ShopStatisticsComponent,
    MarketStatisticsComponent,
    ElectronicScaleHistoryComponent,
    MonthReportComponent,
    UserAuthorizeComponent,
    ResourceListComponent,
    DetectionListComponent,
    DetectionFormComponent,
    RepairReportsComponent
  ],
  entryComponents: [
    OrderFormComponent,
    MarketFormComponent,
    StallFormComponent,
    OperatorFormComponent,
    ShopFormComponent,
    ElectronicScaleFormComponent,
    ContractFormComponent,
    MemberFormComponent,
    UserFormComponent,
    UserAuthorizeComponent,
    RoleFormComponent,
    ContractViewComponent,
    ElectronicScaleHistoryComponent,
    RepairReportsComponent
  ],
  providers: [
    MenuService,
    OrderService,
    MarketService,
    StallService,
    OperatorService,
    ShopService,
    ElectronicScaleService,
    ContractService,
    MemberService,
    UserService,
    RoleService,
    ResourceService,
    ReportService,
    AttachmentService,
    DetectionService
  ]
})
export class ManageAppModule {

}
