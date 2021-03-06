import {Component, ViewContainerRef} from '@angular/core';
import {environment} from '../environments/environment';
import {RebirthHttpProvider} from 'rebirth-http';
import {NotifyService, REBIRTH_NG_I18N_ZHCN, RebirthNGConfig} from 'rebirth-ng';
import 'rxjs/add/operator/do';
import {AuthorizationService} from 'rebirth-permission';
import {LoadingService} from './core/loading/loading.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private rebirthNGConfig: RebirthNGConfig,
              private authorizationService: AuthorizationService,
              private viewContainerRef: ViewContainerRef,
              private loadingService: LoadingService,
              private router: Router,
              private rebirthHttpProvider: RebirthHttpProvider,
              private alertBoxService: NotifyService) {
    this.applicationSetup();
  }

  private applicationSetup() {
    this.rebirthNGConfig.rootContainer = this.viewContainerRef; // this.rebirthNGConfig.extend(REBIRTH_UI_I18N_ZHCN); i18n
    this.rebirthNGConfig.datePicker = REBIRTH_NG_I18N_ZHCN.datePicker;
    this.apiSetup();
  }

  private apiSetup() {
    this.rebirthHttpProvider
      .baseUrl(environment.api.host)
      .addInterceptor({
        request: () => {
          this.loadingService.show();
        },
        response: () => {
          this.loadingService.hide();
        }
      })
      .addInterceptor({
        request: (request) => {
          return request.clone({
            setHeaders: {
              "X-Requested-With": "XMLHttpRequest",
              // "Content-Type": "application/json"
            }
          });
        }
      })
      .addInterceptor({
        request: (request) => {
          const currentUser = this.authorizationService.getCurrentUser();
          if (currentUser) {
            return request.clone({
              setHeaders: {
                Authorization: `Bearer ${currentUser.token }`
              }
            });
          }
        }
      })
      .addResponseErrorInterceptor((res: HttpErrorResponse) => {
        if ([401, 0].includes(res.status)) {
          this.router.navigateByUrl('/login');
        }
        if ([400].indexOf(res.status) !== -1) {
          console.log(res.error.msg)
          this.alertBoxService.placement("top")
          this.alertBoxService.open({
            type: 'danger',
            html: res.error.msg || "Error！"
          }, 5000);
        }
      });
  }

}
