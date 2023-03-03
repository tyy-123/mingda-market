import { FORGET_PAGE, LOGIN_PAGE, REGISTER_PAGE } from '@/constants';
import { history } from 'umi';
const useWhere2go = () => {

    /**
   * 跳转注册页面
   */
    const goRegister = () => {
      history.push({
        pathname: REGISTER_PAGE,
      });
    };
  
    /**
     * 忘记密码
     */
    const goForget = () => {
      history.push({
        pathname: FORGET_PAGE,
      });
    };
  
    /**
     * 登录
     */
    const goLogin = () => {
      history.push({
        pathname: LOGIN_PAGE,
      });
    };
  /**
   * 跳转集市板块
   * @param currentKey 板块key
   */
  const goMarketDetail = (currentKey: string) => {
    history.push({
      pathname: '/market/home/detail',
      query: { currentKey },
    });
  };

  /**
   * 跳转首页
   */
  const goHome = () => {
    history.push({
      pathname: '/market/home',
    });
  };
  return {
    goLogin,
    goForget,
    goRegister,
    goHome,
    goMarketDetail,
  };
};

export default useWhere2go;
