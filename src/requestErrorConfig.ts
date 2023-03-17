import { history, RequestConfig } from 'umi';
import { getToken, getUrlToken, setToken } from './common/utils';

// 请求前缀
export const URL_PREFIX = '/api';

const SUCCESS = 200;
const UN_AUTHORIZATION = 401;
const TIMEOUT = 1800 * 1000; // 30min

const afterProcessing = (data: any) => {
  switch (data.code) {
    case UN_AUTHORIZATION:
      history.replace('/login');
      break;
    default:
      break;
  }
};

/**
 * @name 错误处理
 */
export const errorConfig: RequestConfig = {
  timeout: TIMEOUT,
  errorConfig: {
    adaptor: (resData) => {
      const code = resData.code || resData.errCode;
      return {
        ...resData,
        success:
          code === SUCCESS ||
          resData.ErrorCode === 0 ||
          resData.ActionStatus === 'OK',
        errorMessage:
          resData.title ||
          resData.msg ||
          // resData.ErrorInfo ||
          // resData.error_description ||
          '未知错误',
        showType: 2,
        errorCode: code || resData.ErrorCode,
      };
    },
  },
  // 请求拦截器
  requestInterceptors: [
    (url, options) => {
      const headers: any = {
        ...(() => {
          return options?.requestType === 'form'
            ? {}
            : { 'Content-Type': 'application/json;charset=UTF-8' };
        })(),
        ...options.headers,
      };
      const urlToken = getUrlToken();
      const token = (urlToken ? 'Bearer ' + urlToken : null) || getToken();
      if (token) {
        headers['accessToken'] = token;
        setToken(token)
      }

      return {
        url: `${URL_PREFIX}${url}`,
        options: {
          ...options,
          headers: {
            ...headers,
          },
        },
      };
    },
  ],
  responseInterceptors: [
    async (response) => {
      const data = await response.clone().json();
      afterProcessing(data);
      return response;
    },
  ],
};
