import { NgModule } from '@angular/core';

// import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
// import { ROUTER_CONFIG } from './order.routes';
import { InlineComponent } from './order-list.component';
import { InlineEditComponent } from  './order-form/order-list-edit.component';
import { FooterComponent } from './order-form/foot.component';



@NgModule({
  imports: [
    // SharedModule,
    // RouterModule.forChild(ROUTER_CONFIG),
    // NgxDatatableModule
  ],
  declarations: [InlineComponent,
    InlineEditComponent,
    FooterComponent,

  ],

})
export class InlineModule {
}
