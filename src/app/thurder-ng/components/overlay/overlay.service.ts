/**
 * Created by zhaixm on 2017/7/27.
 */
import {ComponentFactoryResolver, ComponentRef, Injectable, Injector} from '@angular/core'
import {ThurderNgConfig} from '../../support/thurder-ng-config'
import {OverlayComponent} from './overlay.component'
import {DomSanitizer} from '@angular/platform-browser'
import {OverlayOptions} from './overlay-options.model'
import {Observable} from 'rxjs/Observable'

@Injectable()
export class OverlayService {

  private overlayRef: ComponentRef<OverlayComponent>;
  private overlayCount = 0;

  constructor(private thurderNGConfig: ThurderNgConfig, private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector, private domSanitizer: DomSanitizer) {
  }

  open<T>(options: OverlayOptions): Observable<T> {
    if (!this.overlayCount++) {
      return this.createOverlay(options);
    } else {
      return this.overlayRef.instance.dismiss
      // throw new Error('overlay has opened!');
    }
  }

  private createOverlay(options: OverlayOptions) {
    const rootContainer = options.rootContainer || this.thurderNGConfig.rootContainer;
    if (!rootContainer) {
      throw new Error('Should setup ViewContainerRef on modal overlay or rebirth config service!');
    }

    if (options.html && (typeof options.html === 'string')) {
      options.html = this.domSanitizer.bypassSecurityTrustHtml(options.html as string);
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(OverlayComponent);
    const injector = options.injector || this.injector;
    this.overlayRef = rootContainer.createComponent(componentFactory, rootContainer.length, injector);
    const cmp = this.overlayRef.instance;
    let dismissResult = cmp.addContent(options)
    cmp.open()
    return dismissResult;
  }

  close(): void {
    if (this.overlayCount >= 1 && this.overlayRef) {
      this.overlayRef.instance.close()
      this.overlayRef.destroy();
      this.overlayCount = 0
    }
  }

}
