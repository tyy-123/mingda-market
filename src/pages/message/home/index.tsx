import { useRef, useState } from 'react';
import io from 'socket.io-client';
const socket = io('ws://localhost:9999');
const Index = () => {
  const [chatMsg, setChatMsg] = useState<any>([]);
  const chatMsgRef: any = useRef([]);
  // socket.emit('client_online', {
  //   nickName: '测试一下',
  //   id: 1,
  // });
  // socket.emit('client_msg', {
  //   msg: '我是发送者',
  //   nickName: '测试一下',
  //   userId: 1,
  // });
  // socket.emit('client_online', {
  //   nickName: '测试一下2',
  //   id: 2,
  // });
  // socket.emit('client_msg', {
  //   msg: '我是接受者',
  //   nickName: '测试一下2',
  //   userId: 2,
  // });
  // socket.on('server_msg', (data) => {
  //   // const { chatMsg } = this.state;
  //   console.log(data);
  //   const newChatMsg = chatMsg.concat(data);
  //   setChatMsg(newChatMsg);
  //   // chatMsgRef.current = newChatMsg;
  //   // console.log(newChatMsg);
  // });

  return <div>消息</div>;
};
export default Index;
