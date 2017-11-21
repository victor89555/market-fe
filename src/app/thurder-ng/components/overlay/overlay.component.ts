/**
 * Created by zhaixm on 2017/7/27.
 */
import {Component, ElementRef, EventEmitter, HostListener, Input, Renderer2, ViewChild} from '@angular/core'
import {DocumentRef} from '../../support/document-ref.service'
import {OverlayOptions} from './overlay-options.model'
import {WindowRef} from '../../support/window-ref.service'
import {centerWindowPosition} from '../../utils/dom-utils'
import {OverlayContentComponent} from './overlay-content.component'
import {ModalDismissReasons} from '../modal/modal-dismiss-reasons.model'

@Component({
  selector: 'tg-overlay',
  templateUrl: './overlay.component.html'
})
export class OverlayComponent {
  static MASKED_CSS = 'tg-masked'
  @Input() overlayOptions: OverlayOptions;
  dismiss = new EventEmitter<any>();
  @ViewChild('overlayBody') overlayBody: ElementRef;
  @ViewChild(OverlayContentComponent) overlayContent: OverlayContentComponent;

  constructor(private windowRef: WindowRef,
              private documentRef: DocumentRef,
              private elementRef: ElementRef,
              private renderer: Renderer2) {

  }

  open() {
    this.toggleBodyClass(true);
  }

  close() {
    this.toggleBodyClass(false);
  }

  addContent(options: OverlayOptions) {
    this.overlayOptions = options;
    if (!this.overlayOptions.html && this.overlayOptions.component) {
      this.overlayContent.addContent(this.overlayOptions);
    }
    this.adjustOverlayPosition();
    return this.dismiss
  }

  @HostListener('window:resize', [])
  onWinResize() {
    this.adjustOverlayPosition();
  }

  @HostListener('click', ['$event'])
  onBackdropClick($event: Event) {
    // debugger
    if (this.overlayOptions.dismissable) {  // && this.elementRef.nativeElement === $event.target
      this.dismiss.emit(ModalDismissReasons.BACKDROP_CLICK);
    }
  }

  private adjustOverlayPosition() {
    setTimeout(() => {
      const pos = centerWindowPosition(this.overlayBody, this.windowRef);
      this.renderer.setStyle(this.overlayBody.nativeElement, 'top', `${pos.top}px`);
      this.renderer.setStyle(this.overlayBody.nativeElement, 'left', `${pos.left}px`);
    }, 0);
  }

  private toggleBodyClass(masked: boolean): void {
    if (masked) {
      this.renderer.addClass(this.documentRef.body, OverlayComponent.MASKED_CSS);
      return;
    }

    this.renderer.removeClass(this.documentRef.body, OverlayComponent.MASKED_CSS);
  }


  /*static MASKED_CSS = 'tg-masked'
  animationDone = new EventEmitter<any>();
  masked: boolean = true

  constructor(private renderer: Renderer2, private documentRef: DocumentRef) {

  }

  close(): Observable<any> {
    this.masked = false
    return this.animationDone
  }

  cleanup() {
    this.toggleBodyClass(false);
  }

  addContent(options) {

  }

  */
}
