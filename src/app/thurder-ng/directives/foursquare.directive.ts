/**
 * Created by zhaixm on 2017/7/11.
 */
import {AfterViewInit, Directive, ElementRef, Renderer2} from '@angular/core'
import {LoggerService} from '../services/logger.service'

@Directive({
  selector: '[foursquare]'
})
export class FoursquareDirective implements AfterViewInit {

  constructor(private _element: ElementRef, private renderer: Renderer2, private logger: LoggerService) {
    // renderer.setStyle(_element.nativeElement, 'color', 'red')
  }

  ngAfterViewInit(): void {
    let el = this._element.nativeElement
    this.logger.debug(el.clientWidth)
    // 动态设置区域高度=宽度
    this.renderer.setStyle(el, 'height', el.clientWidth + 'px')
    this.renderer.setStyle(el, 'overflow-y', 'hidden')
  }
}
