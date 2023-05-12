import useUser from '@/hooks/useUser';
import { apiMessage, jdMixAjax } from '@/services';
import { Avatar, Empty } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';
import useWhere2go from '@/hooks/useWhere2go';
import { getDescribeTime } from '@/common/utils';
const Index = () => {
  const [messageShowList, setMessageShowList] = useState<any>([]);

  const getMessageListAjax = jdMixAjax(apiMessage.getMessageList_get);

  const { goMsgDetail } = useWhere2go();

  const { userInfo, getUserInfoById } = useUser();

  const init = async () => {
    const messageList = await getMessageListAjax.run({
      params: {
        userId: userInfo.userId,
      },
    });
    console.log(messageList);
    let messageShowList = [];
    for (let i = 0; i < messageList?.length; i++) {
      const { replyUserId, message } = messageList[i];
      const replyUserMsg = await getUserInfoById(replyUserId);
      const { avatar, username } = replyUserMsg;
      messageShowList.push({
        ...messageList[i],
        avatar,
        username,
        lastMsg: message[message?.length - 1].msg,
        releaseTime: message[message?.length - 1].times,
      });
    }
    console.log(messageShowList);
    setMessageShowList(messageShowList);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="md-message__user">
      <header className="message-header">我的消息</header>
      <main className="message-list">
        {messageShowList?.map(
          ({ avatar, lastMsg, username, releaseTime, replyUserId }: any) => (
            <div
              className="message-item"
              onClick={() => {
                goMsgDetail(replyUserId);
              }}
            >
              <header className="message-item-header">
                <span className="header-left">
                  <Avatar src={avatar} size={50} />
                </span>
                <span className="header-right">
                  <div className="right-top">
                    <span className="user-name">{username}</span>
                    <span className="time-right">
                      {getDescribeTime(releaseTime)}
                    </span>
                    <div className="right-bottom">{lastMsg}</div>
                  </div>
                </span>
              </header>
            </div>
          ),
        )}
        {!messageShowList?.length && <Empty description="暂时没有你的消息噢" />}
      </main>
    </div>
  );
};
export default Index;
