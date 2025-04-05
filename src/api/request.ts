//request.ts
import axios, { AxiosRequestConfig, AxiosProgressEvent } from "axios";
//接口返回数据
export interface ApiRes<T> {
  success: boolean;
  code: number;
  data?: T;
  message: string;
}

export interface ProgressConfig extends Omit<AxiosRequestConfig, 'onUploadProgress' | 'onDownloadProgress'> {
  onUploadProgress?: (progress: number) => void;
  onDownloadProgress?: (progress: number) => void;
}

const instance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 从localStorage获取token并添加到请求头
      config.headers['Authorization'] = `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJhZG1pbiIsInJvbGVpZCI6IjEiLCJuYmYiOjE3NDI4Njg1ODAsImV4cCI6MTc2NDkwMDU4MCwiaWF0IjoxNzQyODY4NTgwfQ.6Wm6S4CNtKi9lGqxam4_ZnDebnTXVxycDubbv0DLy2c'}`;
    return config;
  },
  function (error) {
    // 对请求错误做点什么
    return Promise.reject(error);
  }
);

instance.defaults.headers.post['Content-Type'] = 'application/json';



// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应成功做点什么
    return response;
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

interface ProgressData {
  progress: number;
  status: 'processing' | 'completed';
  result?: any;
}

// 带进度的请求函数
export const requestWithProgress = async <T>(config: ProgressConfig) => {
  const { onUploadProgress, ...axiosConfig } = config;
  
  // 首先发送 POST 请求
  const postResponse = await fetch(`${instance.defaults.baseURL}${config.url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config.data)
  });

  if (!postResponse.ok) {
    throw new Error(`HTTP error! status: ${postResponse.status}`);
  }

  // 使用 GET 请求来获取进度更新
  const progressUrl = `${instance.defaults.baseURL}${config.url}/progress`;
  const eventSource = new EventSource(progressUrl);
  
  return new Promise<ApiRes<T>>((resolve, reject) => {
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as ApiRes<ProgressData>;
        console.log('Received stream data:', data);
        
        if (data.data?.progress !== undefined) {
          onUploadProgress?.(data.data.progress);
        }
        
        if (data.data?.status === 'completed') {
          eventSource.close();
          resolve(data as ApiRes<T>);
        }
      } catch (e) {
        console.error('Failed to parse event data:', e);
      }
    };

    eventSource.onerror = (error) => {
      eventSource.close();
      reject(new Error('EventSource failed: ' + error));
    };
  });
};