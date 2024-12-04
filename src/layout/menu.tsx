//menu.tsx
import './layout_less/menu.less'
import {useEffect,useState} from 'react';
import { useAppDispatch } from '@/hooks/use_global.hooks';
import { setCollapsed } from "@/store/reducers/global";
import Menu from '@/components/menu/index';
import { getMainMenuList,getSubMenuList } from '@/api/golbal/menu_service';
import { MenuGroup,MenuProps } from '@/types/menu/menu';
interface AppSiderProps {
    collapsed: boolean;
}
const AppMenu : React.FC<AppSiderProps> = ({collapsed}) => {
    //处理点击具体二级菜单时跳转到详细页面要将菜单隐藏
    const dispatch = useAppDispatch();
    const handleCollapsed = () => {
        //更新全局状态  collapsed
        dispatch(setCollapsed());
    };

    const selectMenu = async (key:string) => {
        const resSub = await getSubMenuList();
        const submenuData = resSub?.data as MenuGroup[];
        const filterMenuData = submenuData.filter((item) => {
            return item.parentkey === key;
        });
        // 设置币制台账数据
        setSubMenuList([...filterMenuData]);
        setSelectkey(key);
    };

    

    const [mainmenuList, setMainMenuList] = useState([] as MenuGroup[]);
    const [submenuList, setSubMenuList] = useState([] as MenuGroup[]);
    const [selectkey, setSelectkey] = useState('basic');
    // 获取币制数据
    useEffect(() => {
        // 获取币制数据
        const getData = async () => {
            const res = await getMainMenuList();
            const menuData = res?.data as MenuGroup[];
            // 设置币制台账数据
            setMainMenuList([...menuData]);

            const resSub = await getSubMenuList();
            const submenuData = resSub?.data as MenuGroup[];
            const filterMenuData = submenuData.filter((item) => {
                return item.parentkey === 'basic';
            });
            // 设置币制台账数据
            setSubMenuList([...filterMenuData]);

        };


        getData();
    }, []);

    const menudataList:MenuProps =  {
        data :mainmenuList,
    }
  return (
    <Menu menudatas={menudataList} collapsed={collapsed} onClick={handleCollapsed} activeMenudatas={submenuList} selectMenu={selectMenu} selectkey={selectkey} />
  );
};
export default AppMenu;