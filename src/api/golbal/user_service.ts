import request, { ApiRes } from '../request'
import { UserLogin } from "@/types/user";

// 这里要处理返回数据的格式，不能再request里提前.data来处理，需要在各自的service里处理

const userList:UserLogin[] = [
  {
    UserCode: '1',
    UserName: '张三',
    UserEmail: "zhangsan@163.com",
    UserPassword: "123456",
    Token: "Mb6gF4Lf16quFcUX0qyGgwt5jOEyYUs1sPrYoqIqLLbc8lKLIQcM0X8MAPE9wTsB11",
  },
  {
    UserCode: '2',
    UserName: '李四',
    UserEmail: "wangwu@163.com",
    UserPassword: "123456",
    Token: "Mb6gF4Lf16quFcUX0qyGgwt5jOEyYUs1sPrYoqIqLLbc8lKLIQcM0X8MAPE9wTsB22",
  },
  {
    UserCode: '3',
    UserName: '王五',
    UserEmail: "liliu@163.com",
    UserPassword: "<PASSWORD>",
    Token: "Mb6gF4Lf16quFcUX0qyGgwt5jOEyYUs1sPrYoqIqLLbc8lKLIQcM0X8MAPE9wTsB33",
  },
  {
    UserCode: '4',
    UserName: '赵六',
    UserEmail: "admin@163.com",
    UserPassword: "123456",
    Token: "Mb6gF4Lf16quFcUX0qyGgwt5jOEyYUs1sPrYoqIqLLbc8lKLIQcM0X8MAPE9wTsB",
  },
  
];

export const getUserList = async () : Promise<UserLogin[]> => {
  // const response = await request({
  //   method: 'GET',
  //   url: '/getUserList'
  // });
  // const responseData = response?.data as ApiRes<UserLogin[]>;
  // return responseData.data || [];
  return userList;
}

// 下面调用真实的外部api接口，vite.config.ts里要配置代理
export const getAspireUserList = () => {
  const response = request({
    method: 'GET',
    url: '/aspire/Users'
  });
  return response;
}