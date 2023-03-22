import { jdMixAjax, apiUser } from '@/services';
import { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import classNames from 'classnames';
import { useModel } from 'umi';

const cls = classNames('md__personal-page');

export type userType={
  account:string;
  password:string;
  avatar:string;
  username:string;
}

const Index = () => {
  const getLoginUserAjax = jdMixAjax(apiUser.getLoginUser_get);
  const { setInitialState, initialState } = useModel('@@initialState');

  const [userInfo, setUerInfo] = useState();

  //初始化个人信息
  const init = async () => {
    const res = await getLoginUserAjax.run({});
    console.log(res);
    setUerInfo(res);
    console.log(initialState?.user);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <div className={cls}>
      <div className="personal-msg">
        <Avatar size={64} src={initialState?.user.avatar} />
        <div>{initialState?.user.username}</div>
      </div>
    </div>
  );
};
export default Index;
