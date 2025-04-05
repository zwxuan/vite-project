//currency_service.ts
import { MenuGroup } from '@/types/menu/menu';
import request, { ApiRes } from '../request'

// 获取当前用户信息
export const getMainMenuList = async ():Promise<MenuGroup[]> => {
  const response = await request({
    method: 'GET',
    url: '/mainmenu'
  });
  const responseData = response?.data as ApiRes<MenuGroup[]>;
  return responseData.data || [];
}

export const getSubMenuList = async ():Promise<MenuGroup[]> => {
  const response = await request({
    method: 'GET',
    url: '/submenu'
  });
  const responseData = response?.data as ApiRes<MenuGroup[]>;
  return responseData.data || [];
}