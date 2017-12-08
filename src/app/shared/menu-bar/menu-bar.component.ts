import {Component, EventEmitter, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {WindowRef} from 'rebirth-ng';
import {MenuConfig} from './menu-config.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  // templateUrl: './menu-bar.component_bak.html',
  styleUrls: ['./menu-bar.component.scss'],
  host: {
    '[class]': `getClassNames()`,
  },
  exportAs: 'menuBar'
})
export class MenuBarComponent implements OnInit, OnDestroy {


  static MAX_MIDDLE_SCREEN = 768;
  static MIN_MIDDLE_SCREEN = 576;
  @Input() menuConfig: MenuConfig;
  @Input() isTextMenuBarOpen: boolean;
  isIconMenuBarOpen = false;
  windowResize = new EventEmitter<any>();
  listens: any[] = [];
  hide:boolean[] =[false,true];
  menuActive:boolean[]=new Array(15);
  arrowState:string[] =['arrow open','arrow closed'];

  constructor(private router: Router, private renderer: Renderer2, private windowRef: WindowRef) {
  }

  getClassNames() {
    const textMenuClass = this.isTextMenuBarOpen ? 'open-text-menu' : 'hide-text-menu';
    const iconMenuClass = this.isIconMenuBarOpen ? 'open-icon-menu' : 'hide-icon-menu';
    return `${textMenuClass} ${iconMenuClass}`;
  }

  updateMenuBarStatus() {
    this.isTextMenuBarOpen = this.windowRef.innerWidth >= MenuBarComponent.MAX_MIDDLE_SCREEN;
    this.isIconMenuBarOpen = this.windowRef.innerWidth >= MenuBarComponent.MIN_MIDDLE_SCREEN;
  }

  ngOnInit(): void {
    this.updateMenuBarStatus();
    this.windowResize
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(() => this.updateMenuBarStatus());

    this.listens.push(this.renderer.listen('window', 'resize',
      ($event) => this.windowResize.emit($event)));
    this.menuActive[0]=true;
  }

  shouldShowUpArrow(path): boolean {
    return this.router.url.indexOf(path) !== -1;
  }

  toggle() {
    this.isTextMenuBarOpen = !this.isTextMenuBarOpen;
    if (this.windowRef.innerWidth >= MenuBarComponent.MIN_MIDDLE_SCREEN) {
      this.isIconMenuBarOpen = true;
    } else {
      this.isIconMenuBarOpen = this.isTextMenuBarOpen;
    }
  }

  showTextMenuBar(event) {
    event.preventDefault();
    this.isTextMenuBarOpen = true;
  }

  ngOnDestroy(): void {
    this.listens.forEach(listen => listen());
  }
  // 功能列表的显隐
  isHidden(index:number) {
     this.hide[index]=!this.hide[index];
     this.menuActive[8] = !this.menuActive[8];
     if(this.arrowState[index]=="arrow open"){
       this.arrowState[index]="arrow closed"
     }else{
       this.arrowState[index]="arrow open"
     }
  }
  // 选中功能高亮
  menuChoose(chosed) {
    for(let i=0;i<this.menuActive.length;i++){
      if(i==chosed){
        this.menuActive[i]=true;
      }else {
        this.menuActive[i]=false;
      }
    }
  }
}
