import { NgModule } from '@angular/core';
import { RebirthHttpModule } from 'rebirth-http';
import { RebirthStorageModule, StorageType } from 'rebirth-storage';
import { RebirthEventSourceModule } from 'rebirth-event-source';
import { RebirthNGModule } from 'rebirth-ng';
import { AuthorizationService, RebirthPermissionModule } from 'rebirth-permission';
import { ReStorageService } from './storage/storage.service';
import { GuidService } from './guid/guid.service';
import { LoadingService } from './loading/loading.service';
import {BrowserModule} from '@angular/platform-browser'

@NgModule({
  imports: [
    RebirthHttpModule,
    RebirthStorageModule,
    RebirthEventSourceModule,
    RebirthNGModule.forRoot(),
    RebirthPermissionModule.forRoot({ loginPage: '/login' }),
    BrowserModule,
  ],
  providers: [
    LoadingService,
    GuidService,
    ReStorageService
  ],
  exports: []
})
export class CoreModule {

  constructor(authorizationService: AuthorizationService) {
    // authorization storage way(sessionStorage, localStorage, memory)
    authorizationService.setStorageType(StorageType.sessionStorage);
  }
}
