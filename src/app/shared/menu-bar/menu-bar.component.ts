import {Component, EventEmitter, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {WindowRef} from 'rebirth-ng';
import {MenuConfig, menuItem} from './menu-config.model';
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

  menuList : menuItem[] = [
    {
      title: "市场管理",
      icon: "home",
      link:"",
      active: true,
      isOpen: true,
      children: [
        {title: "基础信息",link:"/manage/markets",active: true,icon: "user"}
      ]
    },
    {
      title: "商户管理",
      icon: "home",
      link:"",
      active: false,
      isOpen: true,
      children: [
        {title: "商户信息",link:"/manage/shops",active: false,icon: "user"},
        {title: "合同管理",link:"/manage/contracts",active: false,icon: "user"},
        {title: "电子秤管理",link:"/manage/electronicScales",active: false,icon: "user"},
        {title: "商户台账查询",link:"/manage/shops",active: false,icon: "user"},
        {title: "检测结果查询",link:"JavaScript:;",active: false,icon: "user"}
      ]
    },
    {
      title: "运营管理",
      icon: "home",
      link:"",
      active: false,
      isOpen: true,
      children: [
        {title: "交易信息查询",link:"/manage/orders",active: false,icon: "user"},
        {title: "检测信息溯源",link:"JavaScript:;",active: false,icon: "user"},
        {title: "交易情况统计",link:"JavaScript:;",active: false,icon: "user"}
      ]
    },
    {
      title: "系统管理",
      icon: "home",
      link:"",
      active: false,
      isOpen: true,
      children: [
        {title: "用户管理",link:"/manage/users",active: false,icon: "user"},
        {title: "角色管理",link:"/manage/roles",active: false,icon: "user"},
        {title: "资源管理",link:"/manage/resources",active: false,icon: "user"}
      ]
    }
  ]

  constructor(private router: Router, private renderer: Renderer2, private windowRef: WindowRef) {
  }

  onSelect(i) {
    var n = null
    for(let x in this.menuList){
      for(let y in this.menuList[x].children){
        if(this.menuList[x].children[y]===i){
          n = x
          if(!i.active){
            i.active = true
            this.menuList[x].active = true
          }
        }else{
          if(x != n){
            this.menuList[x].active = false
          }
          this.menuList[x].children[y].active = false
        }
      }
    }
  }
  onToggleClick(i){
    for(var key in this.menuList){
      if(this.menuList[key] === i){
        i.isOpen = i.isOpen ? false : true
      }
    }
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
     switch(index){
       case 0:
         this.menuChoose(8);
         break;
       case 1:
         this.menuChoose(10);
     }
     if(this.arrowState[index]=="arrow open"){
       this.arrowState[index]="arrow closed"
     }else{
       this.arrowState[index]="arrow open"
     }
  }
  选中功能高亮
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
