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

interface ProgressData {
  progress: number;
  status: 'processing' | 'completed';
  result?: any;
}

// 带进度的请求函数
export const requestWithProgress = async <T>(config: ProgressConfig) => {
  const { onUploadProgress, onDownloadProgress, ...axiosConfig } = config;
  
  const response = await fetch(`${instance.defaults.baseURL}${config.url}`, {
    method: config.method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(config.data)
  });

  if (!response.ok || !response.body) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let lastResponse: ApiRes<T> | null = null;
  let accumulatedData = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      console.log('done:', done, 'value:', value);
      
      if (done) break;
      if (!value || value.length === 0) continue;

      accumulatedData += decoder.decode(value, { stream: !done });

      try {
        // 尝试解析完整的JSON字符串
        while (accumulatedData) {
          const jsonEndIndex = accumulatedData.indexOf('}');
          if (jsonEndIndex === -1) break; // 如果没有找到完整的JSON字符串，继续等待更多数据

          const chunk = accumulatedData.slice(0, jsonEndIndex + 1);
          accumulatedData = accumulatedData.slice(jsonEndIndex + 1);

          const data = JSON.parse(chunk) as ApiRes<ProgressData>;
          console.log('Parsed data:', data);
          
          if (data.data?.progress !== undefined) {
            onUploadProgress?.(data.data.progress);
          }
          
          if (data.data?.status === 'completed') {
            lastResponse = data as unknown as ApiRes<T>;
          }
        }
      } catch (e) {
        console.error('Failed to parse chunk:', e);
      }
    }

    return lastResponse || {
      code: 500,
      success: false,
      message: "No valid response received"
    } as ApiRes<T>;
  } finally {
    reader.releaseLock();
  }
};