import { useRequest } from '@@/plugin-request/request';
import { AjaxRequestConfig } from '.';

export interface ServiceConfig {
  url: string;
  method: string;
  headers?: {
    [key: string]: string;
  };
}

const service = (params: any, config: AjaxRequestConfig) => {
  const path = params?.path;
  if (path) {
    for (const key in path) {
      if (Object.prototype.hasOwnProperty.call(path, key)) {
        config.url = config.url.replace('{' + key + '}', path[key]);
      }
    }
  }
  const newConfig: ServiceConfig = {
    url: config.url,
    ...config.options,
  };
  return { ...newConfig, ...params };
};

const commonOptions = { manual: true };

export const jdMixAjax = (
  serviceConfig: AjaxRequestConfig,
  options: any = {},
) => {
  return useRequest((params?: any) => service(params, { ...serviceConfig }), {
    ...commonOptions,
    ...options,
  });
};
