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

  /**
   * 跳转到发布帖子
   */
  const goPostNote = (modelId: any) => {
    history.push({
      pathname: '/market/home/postNote',
      query: {
        modelId,
      },
    });
  };

  /**
   * 跳转到帖子详情页面
   * @param noteId 帖子Id
   */
  const goNoteDetail = (noteId: any) => {
    history.push({
      pathname: '/market/home/detail/noteDetail',
      query: {
        noteId,
      },
    });
  };
  /**
   * 返回
   */
  const goBack = () => {
    history.goBack();
  };
  return {
    goBack,
    goLogin,
    goForget,
    goRegister,
    goPostNote,
    goHome,
    goMarketDetail,
    goNoteDetail,
  };
};

export default useWhere2go;
