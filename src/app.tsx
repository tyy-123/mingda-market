import { history } from 'umi';
import { FORGET_PAGE, LOGIN_PAGE, REGISTER_PAGE } from './constants';
import { errorConfig } from './requestErrorConfig';
import { apiUser, jdAjax } from './services';

export const request = {
  ...errorConfig,
};

export async function getInitialState() {
  let result = null;
  const whiteList = [REGISTER_PAGE, LOGIN_PAGE, FORGET_PAGE];
  console.log(history.location.pathname);
  
  if (!whiteList.includes(history.location.pathname)) {
    result = await jdAjax({}, apiUser.getLoginUser_get);
  }

  return {
    user:result.data,
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
