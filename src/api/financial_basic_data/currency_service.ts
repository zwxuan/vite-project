//currency_service.ts
import request from '../request'
 
// 获取当前用户信息
export const getCurrencyList = () => {
  return request({
    method: 'GET',
    url: '/currency'
  })
}