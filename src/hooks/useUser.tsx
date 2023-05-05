import { apiUser, jdAjax, jdMixAjax, MixSN } from '@/services';
import { useCallback, useEffect, useState } from 'react';
import { useModel } from 'umi';

const useUser = (userId?: MixSN) => {
  const { setInitialState, initialState } = useModel('@@initialState');

  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [org, setOrg] = useState('');

  const getUserAjax = jdMixAjax(apiUser.getUserInfo_id_get);

  const refreshUser = async () => {
    const user = await jdAjax({}, apiUser.getLoginUser_get);
    setInitialState({
      ...initialState!,
      user: user.data,
    });
    return user.data;
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
   * @param userId 用户id
   */
  const getUserInfoById = async (userId: MixSN) => {
    try {
      const res = await getUserAjax.run({
        params: {
          userId,
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
      console.log(res);
      setAvatar(res.avatar);
      setUsername(res.username);
      setOrg(res.org);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) init();
  }, [userId]);

  return {
    //用户头像
    avatar,
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
