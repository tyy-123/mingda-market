import useUser from '@/hooks/useUser';
import useUrlState from '@ahooksjs/use-url-state';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'umi';
import io from 'socket.io-client';
const socket = io('ws://localhost:9999');
const Index = () => {
  const [state, setState] = useUrlState();
  const params: any = useParams();
  const [chatMsg, setChatMsg] = useState<any>([]);
  const chatMsgRef: any = useRef([]);

  const { userInfo } = useUser();
  const init = () => {
    console.log(params.userId);
    console.log(userInfo.userId);
    socket.emit('client_online', {
      nickName: '测试一下2',
      id: userInfo.userId,
    });
    // socket.emit('client_online', {
    //   nickName: userInfo.userId,
    //   id: userInfo.userId,
    // });
  };

  const handleSendMessage = () => {
    socket.emit('client_msg', {
      msg: '用户一发送消息' + new Date().getDate(),
      nickName: '测试一下2',
      userId: userInfo.userId,
    });
    socket.on('server_msg', (data) => {
      // const { chatMsg } = this.state;
      console.log(data);
      const newChatMsg = chatMsgRef.current.concat(data);
      setChatMsg(newChatMsg);
      chatMsgRef.current = newChatMsg;
      console.log(newChatMsg);

      // chatMsgRef.current = newChatMsg;
      // console.log(newChatMsg);
    });
  };

  const handleSendMessage2 = () => {
    socket.emit('client_online', {
      nickName: '测试一下2',
      id: params.userId,
    });
    socket.emit('client_msg', {
      msg: '用户二发送消息' + new Date().getDate(),
      nickName: '测试一下2',
      userId: params.userId,
    });
    socket.on('server_msg', (data) => {
      // const { chatMsg } = this.state;
      console.log(data);
      const newChatMsg = chatMsg.concat(data);
      setChatMsg(newChatMsg);
      // chatMsgRef.current = newChatMsg;
      // console.log(newChatMsg);
    });
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div className="md--message-detail">
      这是消息详情页面
      <div onClick={handleSendMessage}>用户1发送消息</div>
      <div onClick={handleSendMessage2}> 用户2发送消息</div>
    </div>
  );
};
export default Index;
