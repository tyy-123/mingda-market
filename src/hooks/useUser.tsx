import { apiUser, jdAjax, jdMixAjax, MixSN } from '@/services';
import { useCallback, useEffect, useState } from 'react';
import { useModel } from 'umi';

const useUser = (userId?: MixSN) => {
  const { setInitialState, initialState } = useModel('@@initialState');

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [org, setOrg] = useState('');

  const getUserAjax = jdMixAjax(apiUser.getUserInfo_id_get);

  const refreshUser = async () => {
    const currentUser = await jdAjax({}, apiUser.getLoginUser_get);
    setInitialState({
      ...initialState!,
      user: currentUser,
    });
    return apiUser;
  };

  // /**
  //  * 验证账号是否已存在
  //  */
  // const isAccountExist = async (username: string) => {
  //   try {
  //     const res = await jdAjax({ params: { username } }, apiAuth.exists_get);
  //     if (res) return true;
  //     else throw new Error();
  //   } catch (err) {
  //     return false;
  //   }
  // };

  /**
   * 通过用户Id查询用户信息
   * @param id 用户id
   */
  const getUserInfoById = async (id: MixSN) => {
    try {
      const res = await getUserAjax.run({
        path: {
          id,
        },
      });
      return res;
    } catch (error) {
      return {};
    }
  };

  const init = useCallback(async () => {
    if (!userId) return;
    const res = await getUserInfoById(userId);
    if (res) {
      setName(res.name);
      setUsername(res.username);
      setOrg(res.org);
    }
  }, [userId]);

  useEffect(() => {
    init();
  }, [userId]);

  return {
    //用户姓名
    name,
    //用户账号/邮箱
    username,
    //用户系所/单位
    org,
    userInfo: initialState?.user || {},
    refreshUser,
    getUserInfoById,
    getUserAjax,
    // isAccountExist,
  };
};

export default useUser;
