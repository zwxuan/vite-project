//currency_service.ts
import request from '../request'
 
// 获取当前用户信息
export const getMainMenuList = () => {
  return request({
    method: 'GET',
    url: '/mainmenu'
  })
}

export const getSubMenuList = () => {
    return request({
      method: 'GET',
      url: '/submenu'
    })
  }