import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import {FoursquareDirective} from '../thurder-ng/directives/foursquare.directive'
import {ThurderNgConfig} from './support/thurder-ng-config'
import {OverlayComponent} from './components/overlay/overlay.component'
import {OverlayService} from './components/overlay/overlay.service'
import {OverlayContentComponent} from './components/overlay/overlay-content.component'
import {ModalBackdropComponent} from './components/modal/modal-backdrop.component'
import {DocumentRef} from './support/document-ref.service'
import {WindowRef} from './support/window-ref.service';
import {DictConvertPipe} from './pipes/dict-convert.pipe'
import {LoggerService} from "./services/logger.service"
import {DictSelectComponent} from "./components/dict/dict-select.component"
import {CommonModule} from "@angular/common"
import {EntrysPipe} from "./pipes/entrys.pipe"

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    FoursquareDirective,
    DictSelectComponent,
    DictConvertPipe,
    EntrysPipe,
    OverlayComponent,
    OverlayContentComponent,
    ModalBackdropComponent,
  ],
  entryComponents: [
    OverlayComponent,
  ],
  exports: [
    DictConvertPipe,
    EntrysPipe,
    FoursquareDirective,
    DictSelectComponent,
  ],
  providers: [
    WindowRef,
    DocumentRef,
    ThurderNgConfig,
    OverlayService,
    LoggerService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ThurderNGModule {
}
