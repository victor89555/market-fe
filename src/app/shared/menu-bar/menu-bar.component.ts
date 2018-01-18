import {Component, OnInit, Renderer2} from '@angular/core';
import {WindowRef} from 'rebirth-ng';
import {menuItem} from './menu-config.model';
import {Router} from '@angular/router';
import {AuthorizationService} from "rebirth-permission";

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  exportAs: 'menuBar'
})
export class MenuBarComponent implements OnInit {

  static MAX_MIDDLE_SCREEN = 768;
  static MIN_MIDDLE_SCREEN = 576;

  menuList: menuItem[] = [
    {
      title: "市场管理",
      icon: "home",
      link: "",
      active: true,
      isOpen: true,
      resource: "BLOCK_MARKET",
      children: [
        {title: "市场信息", link: "/manage/markets", active: true, icon: "more", resource: "MENU_MARKET"},
        // {title: "摊位管理", link: "/manage/stalls", active: false, icon: "more", resource: "MENU_MARKET_STALL"}
      ]
    },
    {
      title: "商户管理",
      icon: "all",
      link: "",
      active: false,
      isOpen: true,
      resource: "BLOCK_SHOP",
      children: [
        {title: "商户信息", link: "/manage/shops", active: false, icon: "user1", resource: "MENU_SHOP"},
        {title: "经营者信息", link: "/manage/operators", active: false, icon: "user1", resource: "MENU_OPERATOR"},
        {title: "合同查询", link: "/manage/contracts", active: false, icon: "order", resource: "MENU_CONTRACT"},
        {title: "电子秤管理", link: "/manage/electronicScales", active: false, icon: "balance", resource: "MENU_ELEC"},
        // {title: "商户台账查询",link:"/manage/orders",active: false,icon: "book"},
        {title: "检测结果查询", link: "JavaScript:;", active: false, icon: "chem", resource: "MENU_CHECK"}
      ]
    },
    {
      title: "运营管理",
      icon: "open",
      link: "",
      active: false,
      isOpen: true,
      resource: "BLOCK_OPERATION",
      children: [
        {title: "会员管理", link: "/manage/members", active: false, icon: "profile", resource: "MENU_MEMBER"},
        {title: "交易信息查询", link: "/manage/orders", active: false, icon: "pages", resource: "MENU_ORDER"},
        {
          title: "交易情况统计",
          link: "/manage/marketStatistics",
          active: false,
          icon: "plot",
          resource: "MENU_OPERATION_STATISTICS"
        },
        {title: "月度报表", link: "/manage/monthReport", active: false, icon: "order", resource: "MENU_REPORT"},
        {title: "检测信息溯源", link: "JavaScript:;", active: false, icon: "text", resource: "MENU_TRACEABILITY"}
      ]
    },
    {
      title: "系统管理",
      icon: "set",
      link: "",
      active: false,
      isOpen: true,
      resource: "BLOCK_SYSTEM",
      children: [
        {title: "用户管理", link: "/manage/users", active: false, icon: "user1", resource: "MENU_USER"},
        {title: "角色管理", link: "/manage/roles", active: false, icon: "profile", resource: "MENU_ROLE"},
        {title: "资源管理", link: "/manage/resources", active: false, icon: "box", resource: "MENU_RESOURCE"}
      ]
    }
  ]

  constructor(private router: Router,
              private renderer: Renderer2,
              private windowRef: WindowRef,
              private authorizationService: AuthorizationService) {
  }

  //选中menubar
  onSelect(i) {
    let n = null
    for (let x in this.menuList) {
      for (let y in this.menuList[x].children) {
        if (this.menuList[x].children[y] === i) {
          n = x
          if (!i.active) {
            i.active = true
            this.menuList[x].active = true
          }
        } else {
          if (x != n) {
            this.menuList[x].active = false
          }
          this.menuList[x].children[y].active = false
        }
      }
    }
  }

  //开关menubar一级菜单
  onToggleClick(i) {
    for (var key in this.menuList) {
      if (this.menuList[key] === i) {
        i.isOpen = i.isOpen ? false : true
      }
    }
  }

  checkMenu(url) {
    let n = null
    for (let x in this.menuList) {
      for (let y in this.menuList[x].children) {
        if (this.menuList[x].children[y].link == url) {
          n = x
          if (!this.menuList[x].children[y].active) {
            this.menuList[x].children[y].active = true
            this.menuList[x].active = true
          }
        } else {
          if (x != n) {
            this.menuList[x].active = false
          }
          this.menuList[x].children[y].active = false
        }
      }
    }
  }

  ngOnInit(): void {
    this.checkMenu(this.router.url)
  }
}
