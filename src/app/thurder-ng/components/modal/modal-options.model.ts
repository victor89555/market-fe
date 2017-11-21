import {ComponentFactoryResolver, Injector, Type, ViewContainerRef} from '@angular/core';

export interface ModalOptions {
  component: Type<any>;
  componentFactoryResolver?: ComponentFactoryResolver;
  injector?: Injector;
  resolve?: any;
  backdrop?: boolean;
  backdropClass?: string;
  keyboard?: boolean;
  modal?: boolean;
  modalClass?: string;
  zIndex?: number
  size?: 'lg' | 'sm';
  rootContainer?: ViewContainerRef;

}
