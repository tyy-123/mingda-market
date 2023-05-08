import { getToken, clearUser } from '@/common/utils';
import { history, useModel } from 'umi';
import useConfirm from './useConfirm';
// import useConfirm from './useConfirm';
const useAuth = () => {
  const { initialState, setInitialState, loading } = useModel('@@initialState');
  const { deleteConfirm } = useConfirm();

  /**
   * 强制下线
   */
  const forcedOffline = () => {
    setInitialState({
      ...initialState!,
      user: null,
    });
    clearUser();
    history.replace({ pathname: '/login' });
  };

  /**
   * 问询退出
   */
  const logout = () => {
    deleteConfirm(
      () => {
        forcedOffline();
      },
      false,
      '确定退出本系统？',
      '退出确认',
    );
  };
  return {
    isLogin: initialState?.user || getToken() ? true : false,
    logout,
    forcedOffline,
  };
};
export default useAuth;
