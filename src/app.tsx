import { history } from 'umi';
import { FORGET_PAGE, LOGIN_PAGE, REGISTER_PAGE } from './constants';
import { errorConfig } from './requestErrorConfig';
import {  jdAjax } from './services';

export const request = {
  ...errorConfig,
};

export async function getInitialState() {
  let user = null;
  const whiteList = [REGISTER_PAGE, LOGIN_PAGE, FORGET_PAGE];
  if (!whiteList.includes(history.location.pathname)) {
    // user = await jdAjax({}, apiUser.info_get);
  }

  return {
    user,
    // globalConfig: window.staticConfig,
  };
}

export const onRouteChange = ({ location }: any) => {
  // back top
  if (location.pathname !== window.location.pathname) {
    const el = document.scrollingElement || document.documentElement;
    if (el.scrollTop !== 0) {
      el.scrollTop = 0;
    }
  }
};
