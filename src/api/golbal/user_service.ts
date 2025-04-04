import request, { ApiRes } from '../request'
import { UserLogin } from "@/types/user";

// 这里要处理返回数据的格式，不能再request里提前.data来处理，需要在各自的service里处理

// export const getUserList = async () => {
//   const response = await request({
//     method: 'GET',
//     url: '/getUserList'
//   });
//   // return response?.data;
//   const ss = response?.data as ApiRes<UserLogin[]>;
//   return ss.data;
// }

export const getUserList = async () => {
  const response = await request({
    method: 'GET',
    url: '/getUserList'
  });
  return response?.data;
}
// 下面调用真实的外部api接口，vite.config.ts里要配置代理
export const getAspireUserList = () => {
  const response = request({
    method: 'GET',
    url: '/aspire/Users'
  });
  return response;
}