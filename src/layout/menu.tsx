//menu.tsx
import './layout_less/menu.less'
import {useEffect,useState} from 'react';
import { useAppDispatch } from '@/hooks/use_global.hooks';
import { setCollapsed } from "@/store/reducers/global";
import Menu from '@/components/menu/index';
import { getMainMenuList,getSubMenuList } from '@/api/golbal/menu_service';
import { MenuGroup,MenuProps } from '@/types/menu/menu';
import { useLocation } from 'react-router-dom';
interface AppSiderProps {
    collapsed: boolean;
}
const AppMenu : React.FC<AppSiderProps> = ({collapsed}) => {
    //处理点击具体二级菜单时跳转到详细页面要将菜单隐藏
    const dispatch = useAppDispatch();
    const location = useLocation();
    const handleCollapsed = () => {
        //更新全局状态  collapsed
        dispatch(setCollapsed({collapsed: !collapsed,tabsActiveKey: ''}));
    };

    const selectMenu = async (keyCode:string) => {
        const resSub = await getSubMenuList();
        const submenuData = resSub as MenuGroup[];
        const filterMenuData = submenuData.filter((item) => {
            return item.parentkey === keyCode;
        });
        // 设置子菜单数据
        setSubMenuList([...filterMenuData]);
        setSelectkey(keyCode);
    };

    

    const [mainmenuList, setMainMenuList] = useState([] as MenuGroup[]);
    const [submenuList, setSubMenuList] = useState([] as MenuGroup[]);
    const [selectkey, setSelectkey] = useState('basic');
    // 获取菜单数据
    useEffect(() => {
        // 获取币制数据
        const getData = async () => {
            const res = await getMainMenuList();
            const menuData = res as MenuGroup[];
            // 设置主菜单数据
            setMainMenuList([...menuData]);

            const resSub = await getSubMenuList();
            const submenuData = resSub as MenuGroup[];

            let activeParentKey = 'basic';
            const currentPath = location.pathname;

            // 根据当前路径查找对应的 activeParentKey
            for (const group of submenuData) {
                if (group.apps) {
                    const foundApp = group.apps.find(app => {
                         if (!app.path) return false;
                         return app.path === currentPath || currentPath.startsWith(app.path + '/');
                    });
                    if (foundApp) {
                        if (group.parentkey) {
                            activeParentKey = group.parentkey;
                        }
                        break;
                    }
                }
            }

            // 设置子菜单数据
            const filterMenuData = submenuData.filter((item) => {
                return item.parentkey === activeParentKey;
            });
            // 设置菜单数据
            setSubMenuList([...filterMenuData]);
            setSelectkey(activeParentKey);
        };


        getData();
    }, [location.pathname]);

    const menudataList:MenuProps =  {
        data :mainmenuList,
    }
  return (
    <Menu menudatas={menudataList} collapsed={collapsed} onClick={handleCollapsed} activeMenudatas={submenuList} selectMenu={selectMenu} selectkey={selectkey} />
  );
};
export default AppMenu;