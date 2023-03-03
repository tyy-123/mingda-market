import _ from 'lodash';
export * from './api';
import { request } from 'umi';

export type MixSN = string | number;

export type AjaxRequestParams = {
  path?: {
    [key: string]: MixSN;
  };
  params?: {
    [key: string]: MixSN;
  };
  data?: any;
  body?: any;
};

export type AjaxRequestConfig = {
  url: string;
  options: {
    method: string;
    headers?: {
      [key: string]: string;
    };
    [key: string]: any;
  };
};

function ajaxConfigCreator(config: AjaxRequestConfig) {
  const conf = _.assign({}, config);
  conf.options.method = conf.options.method.toLocaleLowerCase();
  return conf;
}

export function jdAjaxCode(obj: AjaxRequestParams, config: AjaxRequestConfig) {
  const conf = ajaxConfigCreator(config);
  if (obj.path) {
    for (const key in obj.path) {
      if (obj.path.hasOwnProperty(key)) {
        conf.url = conf.url.replace('{' + key + '}', obj.path[key].toString());
      }
    }
  }
  let body = undefined;
  if (obj.body) body = JSON.stringify(obj.body);
  delete obj.path;
  delete obj.path;
  return request(conf.url, {
    ...conf.options,
    ...obj,
    body,
  });
}

export async function jdAjax(
  obj: AjaxRequestParams,
  config: AjaxRequestConfig,
) {
  try {
    const res = await jdAjaxCode(obj, config);
    console.log(res);
    if (!res) throw new Error();
    else return res;
  } catch (error) {
    console.log(error);
  }
}

export * from './mixAjax';
