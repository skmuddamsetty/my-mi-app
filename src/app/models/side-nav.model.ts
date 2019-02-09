export interface SideNav {
  isAvailable?: boolean;
  title?: string;
  url?: string;
  icon?: string;
  category?: string;
}
export interface SideNavId extends SideNav {
  id: string;
}
