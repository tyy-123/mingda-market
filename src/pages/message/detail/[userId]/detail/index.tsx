import useUser from '@/hooks/useUser';
import useUrlState from '@ahooksjs/use-url-state';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'umi';
import io from 'socket.io-client';
import { Input, Avatar, message } from 'antd';
import { HomeOutlined, MessageOutlined } from '@ant-design/icons';

import './index.less';
import useWhere2go from '@/hooks/useWhere2go';
import { apiMessage, jdMixAjax } from '@/services';
const socket = io('ws://localhost:9999');
const Index = () => {
  const [state, setState] = useUrlState();
  const params: any = useParams();
  const [chatMsg, setChatMsg] = useState<any>([]);
  const chatMsgRef: any = useRef([]);
  const { username, avatar } = useUser(params?.userId);
  const { userInfo } = useUser();
  const { avatar: otherAvatar } = useUser(userInfo?.userId);
  const { goBack } = useWhere2go();

  const getUserMessageAjax = jdMixAjax(apiMessage.getUserMessage_get);
  const saveUserMessageAjax = jdMixAjax(apiMessage.saveUserMessage_post);

  const init = async () => {
    console.log(params.userId);
    console.log(userInfo.userId);
    const result = await getUserMessageAjax.run({
      params: {
        userId: userInfo.userId,
      },
    });
    console.log(result, '1111111111');
    // console.log(JSON.parse(result?.message));

    setChatMsg(result?.message || []);
    chatMsgRef.current = result?.message || [];
    // socket.emit('client_online', {
    //   nickName: '测试一下2',
    //   id: userInfo.userId,
    // });
    socket.emit('client_online', {
      nickName: userInfo.userId,
      id: userInfo.userId,
    });
    socket.emit('client_msg', {
      msg: '',
      nickName: userInfo.userId,
      userId: userInfo.userId,
    });
    // console.log(
    //   JSON.stringify([
    //     {
    //       msg: '你好呀',
    //       nickName: '测试一下2',
    //       times: '2023-04-24 19:26:46',
    //       userId: 10,
    //       type: 1,
    //     },
    //     {
    //       msg: '你好',
    //       nickName: '你好',
    //       times: '2023-04-24 19:26:46',
    //       userId: 10,
    //       type: 2,
    //     },
    //     {
    //       msg: '我想问一下置物架用了多久了',
    //       nickName: '测试一下2',
    //       times: '2023-04-24 19:26:46',
    //       userId: 4,
    //       type: 1,
    //     },
    //     {
    //       msg: '去年买的可小刀',
    //       nickName: '测试一下2',
    //       times: '2023-04-24 19:26:46',
    //       userId: 10,
    //       type: 2,
    //     },
    //   ]),
    // );

    // setChatMsg([
    //   {
    //     msg: '你好呀',
    //     nickName: '测试一下2',
    //     times: '2023-04-24 19:26:46',
    //     userId: 10,
    //     type: 2,
    //   },
    //   {
    //     msg: '你好',
    //     nickName: '你好',
    //     times: '2023-04-24 19:26:46',
    //     userId: 10,
    //     type: 1,
    //   },
    //   {
    //     msg: '我想问一下置物架用了多久了',
    //     nickName: '测试一下2',
    //     times: '2023-04-24 19:26:46',
    //     userId: 4,
    //     type: 2,
    //   },
    //   {
    //     msg: '去年买的可小刀',
    //     nickName: '测试一下2',
    //     times: '2023-04-24 19:26:46',
    //     userId: 10,
    //     type: 1,
    //   },
    // ]);
  };

  const handleSendMessage = () => {
    socket.emit('client_msg', {
      msg: `用户一发送消息${new Date().getDate()}`,
      nickName: '测试一下2',
      userId: userInfo.userId,
    });
    console.log('1111111111');

    socket.on('server_msg', (data) => {
      // const { chatMsg } = this.state;
      console.log('1111111111');
      console.log(data);
      const newChatMsg = chatMsgRef.current.concat(data);
      const newChatMsgSet = [...new Set(newChatMsg)];
      setChatMsg(newChatMsgSet);
      chatMsgRef.current = newChatMsgSet;
      console.log(newChatMsgSet);

      // chatMsgRef.current = newChatMsg;
      // console.log(newChatMsg);
    });
  };

  // const handleSendMessage2 = () => {
  //   socket.emit('client_online', {
  //     nickName: '测试一下2',
  //     id: params.userId,
  //   });
  //   socket.emit('client_msg', {
  //     msg: '用户二发送消息' + new Date().getDate(),
  //     nickName: '测试一下2',
  //     userId: params.userId,
  //   });
  //   socket.on('server_msg', (data) => {
  //     // const { chatMsg } = this.state;
  //     console.log(data);
  //     const newChatMsg = chatMsgRef.current.concat(data);
  //     setChatMsg(newChatMsg);
  //     chatMsgRef.current = newChatMsg;
  //     console.log(newChatMsg);
  //   });
  // };
  useEffect(() => {
    init();
  }, []);

  const handlePressEnter = (e: any) => {
    console.log(e.target.value);
    socket.emit('client_msg', {
      msg: e.target.value,
      nickName: userInfo.userId,
      userId: userInfo.userId,
    });
    socket.on('server_msg', async (data) => {
      console.log('1111111111');
      console.log(data);
      //筛选出彼此两个人的消息
      if (
        data.userId === Number(params.userId) ||
        data.userId === userInfo.userId
      ) {
        const newChatMsg = chatMsgRef.current.concat(data);
        const newChatMsgSet = [...new Set(newChatMsg)];
        setChatMsg(newChatMsgSet);
        chatMsgRef.current = newChatMsgSet;
        console.log(newChatMsgSet);
        console.log(JSON.stringify(newChatMsgSet));

        await saveUserMessageAjax.run({
          data: {
            userId: userInfo.userId,
            replyUserId: Number(params.userId),
            message: JSON.stringify(newChatMsgSet),
          },
        });
        const reserveChatMessage = newChatMsgSet.map((item: any) => {
          return {
            ...item,
            type: item.type === 1 ? 2 : 1,
          };
        });
        await saveUserMessageAjax.run({
          data: {
            userId: Number(params.userId),
            replyUserId: userInfo.userId,
            message: JSON.stringify(reserveChatMessage),
          },
        });
      }
    });
  };
  useEffect(() => {
    socket.on('server_msg', (data) => {
      console.log(data);
      if (
        data.userId === Number(params.userId) ||
        data.userId === userInfo.userId
      ) {
        const newChatMsg = chatMsgRef.current.concat(data);
        const newChatMsgSet = [...new Set(newChatMsg)];
        setChatMsg(newChatMsgSet);
        chatMsgRef.current = newChatMsgSet;
        console.log(newChatMsgSet);
        console.log(JSON.stringify(newChatMsgSet));
      }
    });
  }, []);
  return (
    <div className="md--message-detail">
      {/* 这是消息详情页面 */}
      {/* <div onClick={handleSendMessage}>用户1发送消息</div> */}
      {/* <div onClick={handleSendMessage2}> 用户2发送消息</div> */}
      <header className="message-detail">
        <span className="left-back" onClick={goBack}>{`< 返回`}</span>
        <span className="chat-title">{username}</span>
      </header>
      <main className="chat-list">
        {chatMsg?.map(({ msg, type }: any) => {
          {
            if (msg) {
              if (type === 1)
                return (
                  <div className="chat-item other">
                    <Avatar size={40} src={avatar} />
                    <div className="chat-content">{msg}</div>
                  </div>
                );
              else
                return (
                  <div className="chat-item">
                    <div className="chat-content">{msg}</div>
                    <Avatar size={40} src={otherAvatar} />
                  </div>
                );
            } else {
              return <></>;
            }
          }
        })}
      </main>
      <div className="note-publish-comment">
        <div className="go-home-left">
          <HomeOutlined style={{ color: '#aeaeae' }} />
          <div>首页</div>
        </div>
        <Input
          placeholder="✍友善聊天，传递温暖"
          onPressEnter={handlePressEnter}
        />
        <div className="go-home-right">
          <MessageOutlined style={{ color: '#aeaeae' }} />
          <div>消息</div>
        </div>
      </div>
    </div>
  );
};
export default Index;
