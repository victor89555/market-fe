import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {ManageAppComponent} from "./manage-app.component";
import {SharedModule} from "../shared/shared.module";
import {ROUTER_CONFIG} from "./manage-app.routes";
import {UserMockComponent} from "./user-mock/user-mock.component";
import {MenuService} from "./menu.service";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule} from "@angular/forms";
import {OrderFormComponent} from "./order/order-form/order-form.component";
import {OrderListComponent} from "./order/order-list/order-list.component";
import {OrderService} from "./order/shared/order.service";
import {MarketFormComponent} from "./market/market-form/market-form.component";
import {MarketListComponent} from "./market/market-list/market-list.component";
import {MarketService} from "./market/shared/market.service";
import {StallListComponent} from "./stall/stall-list/stall-list.component";
import {StallFormComponent} from "./stall/stall-form/stall-form.component";
import {StallService} from "./stall/shared/stall.service";

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(ROUTER_CONFIG),
    NgxDatatableModule,
  ],
  exports: [],
  declarations: [
    ManageAppComponent,
    UserMockComponent,
    OrderListComponent,
    OrderFormComponent,
    MarketFormComponent,
    MarketListComponent,
    StallListComponent,
    StallFormComponent,
  ],
  entryComponents: [
    OrderFormComponent,
    MarketFormComponent,
    StallFormComponent
  ],
  providers: [
    MenuService,
    OrderService,
    MarketService,
    StallService
  ],
})
export class ManageAppModule {

}
