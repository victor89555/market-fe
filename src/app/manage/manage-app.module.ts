import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManageAppComponent } from './manage-app.component';
import { SharedModule } from '../shared/shared.module';
import { ROUTER_CONFIG } from './manage-app.routes';
import { OrderMockComponent } from './order-mock/order-mock.component';
import { UserMockComponent } from './user-mock/user-mock.component';
import { InlineComponent } from './order/order-list.component';
import { BasicAutoComponent } from './order/order-form/basic-auto.component';
import { FooterComponent } from './order/order-form/foot.component';
import { InlineEditComponent } from './order/order-form/order-list-edit.component';
import { ModalTestComponent } from './order/order-form/order-list-edit.component';
import { MenuService } from './menu.service';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule} from "@angular/forms";


@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(ROUTER_CONFIG),
    NgxDatatableModule
  ],
  exports: [],
  declarations: [
    ManageAppComponent,
    OrderMockComponent,
    UserMockComponent,
    InlineComponent,
    BasicAutoComponent,
    FooterComponent,
    InlineEditComponent,
    ModalTestComponent
  ],
  entryComponents: [
    ModalTestComponent
  ],
  providers: [
    MenuService
  ],
})
export class ManageAppModule {

}
