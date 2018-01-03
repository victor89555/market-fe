import {BrowserModule} from "@angular/platform-browser";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {AppComponent} from "./app.component";
import {ROUTER_CONFIG} from "./app.routes";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "./core/core.module";
import {FormsModule} from "@angular/forms";
import { CustomFormsModule } from 'ng2-validation'
import {ManageAppModule} from "./manage/manage-app.module";
import { Validator } from "./shared/validator"

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    CustomFormsModule,
    ManageAppModule,
    RouterModule.forRoot(ROUTER_CONFIG),
  ],
  providers: [Validator],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {

}
