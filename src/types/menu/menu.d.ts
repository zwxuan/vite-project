export interface AppItem {
    name: string;
    key:string;
    active?: boolean;
    path?:string;
}

export interface MenuGroup {
    title: string;
    key: string;
    parentkey?:string;
    apps: Array<AppItem>;
}

export interface MenuProps {
    data: MenuGroup[];
}
