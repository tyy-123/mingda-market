import { history } from 'umi';
const useWhere2go = () => {
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
    goHome,
    goMarketDetail,
  };
};

export default useWhere2go;
