import { jdMixAjax, apiUser } from '@/services';
import { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import classNames from 'classnames';
import { useModel } from 'umi';
import { getToken } from '@/common/utils';
import './index.less';

const cls = classNames('md__personal-page');

export type userType = {
  account: string;
  password: string;
  avatar: string;
  username: string;
};

const Index = () => {
  const getLoginUserAjax = jdMixAjax(apiUser.getLoginUser_get);
  const { setInitialState, initialState } = useModel('@@initialState');
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');

  const [userInfo, setUerInfo] = useState();

  const personCenterItems = ['个人资料', '我的帖子', '账号设置'];

  //初始化个人信息
  const init = async () => {
    const res = await getLoginUserAjax.run({});
    console.log(res);
    setUerInfo(res);
    setAvatar(res.avatar);
    setUsername(res.username)
    console.log(initialState?.user);
  };

  useEffect(() => {
    if (getToken()) {
      init();
    }
  }, [getToken()]);

  return (
    <div className={cls}>
      <div className="personal-msg">
        <Avatar size={64} src={avatar} />
        <div>{initialState?.user.username}</div>
      </div>
      <div className="personal-center">
        {personCenterItems.map((item) => (
          <div className="center-item">
            {`${item}`}
            <span className="center-more">{`>`}</span>
          </div>
        ))}
      </div>
      <div className="person footer">民大集市-无聊就来看看</div>
    </div>
  );
};
export default Index;
