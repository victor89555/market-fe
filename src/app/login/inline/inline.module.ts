import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ROUTER_CONFIG} from './inline.routes';
import {InlineComponent} from './inline.component';
import {InlineEditComponent} from './basic/inline-edit.component';
import {FooterComponent} from './basic/foot.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTER_CONFIG),
    NgxDatatableModule
  ],
  declarations: [InlineComponent,
    InlineEditComponent,
    FooterComponent],
})
export class InlineModule {
}
