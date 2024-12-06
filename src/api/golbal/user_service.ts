import request from '../request'
export const getUserList = () => {
    return request({
      method: 'GET',
      url: '/getUserList'
    })
}