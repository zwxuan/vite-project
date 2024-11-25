//request.ts
import axios, { AxiosRequestConfig } from "axios";
//接口返回数据
export interface ApiRes<T> {
  success: boolean;
  code: number;
  data?: T;
  message: string;
}
const instance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 请求成功做点什么
    return config;
  },
  function (error) {
    // 对请求错误做点什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应成功做点什么
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
 
export default async <T>(config: AxiosRequestConfig) => {
  const response: ApiRes<T> = await instance(config);
  return response;
};