import Mock from "mockjs";
import { UserLogin } from "@/types/user.d";
// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const userList:UserLogin[] = [
  {
    UserCode: Mock.mock("@id"),
    UserName: Mock.mock("@cname"),
    UserEmail: "zhangsan@163.com",
    UserPassword: "123456",
    Token: "Mb6gF4Lf16quFcUX0qyGgwt5jOEyYUs1sPrYoqIqLLbc8lKLIQcM0X8MAPE9wTsB11",
  },
  {
    UserCode: Mock.mock("@id"),
    UserName: Mock.mock("@cname"),
    UserEmail: "wangwu@163.com",
    UserPassword: "123456",
    Token: "Mb6gF4Lf16quFcUX0qyGgwt5jOEyYUs1sPrYoqIqLLbc8lKLIQcM0X8MAPE9wTsB22",
  },
  {
    UserCode: Mock.mock("@id"),
    UserName: Mock.mock("@cname"),
    UserEmail: "liliu@163.com",
    UserPassword: "<PASSWORD>",
    Token: "Mb6gF4Lf16quFcUX0qyGgwt5jOEyYUs1sPrYoqIqLLbc8lKLIQcM0X8MAPE9wTsB33",
  },
  {
    UserCode: Mock.mock("@id"),
    UserName: Mock.mock("@cname"),
    UserEmail: "admin@163.com",
    UserPassword: "123456",
    Token: "Mb6gF4Lf16quFcUX0qyGgwt5jOEyYUs1sPrYoqIqLLbc8lKLIQcM0X8MAPE9wTsB",
  },
  
];
 
export default [
  // 用户登录
  {
    url: "/api/getUserList",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: userList,
      };
    },
  },
];