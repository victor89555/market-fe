import {NgModule} from "@angular/core";
import {InlineComponent} from "./order-list.component";
import {InlineEditComponent} from "./order-form/order-list-edit.component";
import {FooterComponent} from "./order-form/foot.component";
import {RebirthHttpModule} from "rebirth-http";
import {OrderListService} from "./order-list.service";

@NgModule({
  imports: [
    RebirthHttpModule
  ],
  declarations: [InlineComponent,
    InlineEditComponent,
    FooterComponent,
  ],
  providers: [
    OrderListService
  ],
})
export class InlineModule {
}
