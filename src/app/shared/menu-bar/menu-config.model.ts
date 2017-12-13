export interface MenuItem {
  link: string;
  name: string;
  svgClass?: string;
  svgPath?: string;
  children?: MenuItem[];
}

export interface menuItem {
  title: string;
  link?: string;
  icon: string;
  active: boolean;
  children?: menuItem[];
  isOpen?: boolean;
}

export interface MenuConfig {
  menus: MenuItem[];
}
