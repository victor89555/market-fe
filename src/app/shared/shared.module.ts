import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { PageHeaderComponent } from './page-header/page-header.component';
import { RebirthNGModule } from 'rebirth-ng';
import { RebirthPermissionModule } from 'rebirth-permission';
import { RouterModule } from '@angular/router';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { CollapseDirective } from './collapse/collapse.directive';
import { FieldErrorComponent } from './field-error/field-error.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { UpdateInfoComponent } from './info/update-info/update-info.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { PersonageService } from './info/shared/personage.service';
import {ThurderNGModule} from "../thurder-ng/thurder-ng.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    RebirthNGModule,
    RebirthPermissionModule,
    FormsModule,
    ThurderNGModule,
  ],
  declarations: [
    PageFooterComponent,
    CollapseDirective,
    MenuBarComponent,
    PageHeaderComponent,
    FieldErrorComponent,
    UpdateInfoComponent,
    UpdatePasswordComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RebirthNGModule,
    RebirthPermissionModule,
    PageFooterComponent,
    PageHeaderComponent,
    CollapseDirective,
    MenuBarComponent,
  ],
  entryComponents:[
    UpdateInfoComponent,
    UpdatePasswordComponent
  ],
  providers: [PersonageService]
})
export class SharedModule {

}
