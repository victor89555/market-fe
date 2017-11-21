import {ComponentFactoryResolver, Injector, Type, ViewContainerRef} from '@angular/core'
import {SafeHtml} from '@angular/platform-browser'

export interface OverlayOptions {
  component?: Type<any>
  html?: string | SafeHtml
  componentFactoryResolver?: ComponentFactoryResolver
  injector?: Injector
  dismissable?: boolean
  backdropClass?: string
  zIndex?: number
  rootContainer?: ViewContainerRef
}
