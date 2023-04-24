import { BaseComponentProps } from '@/interface';
import { Avatar, Button, Upload, message, Image } from 'antd';
import './index.less';
import useUser from '@/hooks/useUser';
import { getDescribeTime, listToTree } from '@/common/utils';
import { MixSN, apiComment, jdMixAjax } from '@/services';
import { useEffect, useState } from 'react';
import ChildCommentShow from '../childCommentShow';

export interface CommentShowProps extends BaseComponentProps {
  comment: any;
}

const Index: React.FC<CommentShowProps> = ({ comment }) => {
  const { userId, releaseTime, content, commentId } = comment;
  // console.log(commentId);
  const { avatar, username } = useUser(userId);
  const [childComment, setChildComment] = useState([]);
  const getChildCommentListAjax = jdMixAjax(apiComment.getChildCommentList_get);
  const { getUserInfoById } = useUser();
  const isTopComment = true;
  // const comment = {
  //   username: '嘿嘿',
  //   avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //   releaseTime: '2023-04-10 00:00:00',
  //   content: '推荐Ukiss的睫毛打底',
  // };

  // console.log(getDescribeTime(releaseTime));
  const init = async () => {
    const result = await getChildCommentListAjax.run({
      params: {
        commentId,
      },
    });
    console.log(result);
    const newResult = await result?.map(async (item: any) => {
      // console.log(item.userId);
      // console.log(item.reply_to);
      const user = await getUserInfoById(item.userId);
      console.log(user);
      const replyUser = await getUserInfoById(item.reply_to);
      console.log(replyUser);
      return {
        ...item,
        ...user,
        replyToName: replyUser.username,
      };
    });
    console.log(newResult);

    setChildComment(result);
  };

  const getDetailCommentMsg = async (userId: MixSN, reply_to: MixSN) => {
    const user = await getUserInfoById(userId);
    console.log(user);
    const replyUser = await getUserInfoById(reply_to);
    console.log(replyUser);
    return {
      ...user,
      replyToName: replyUser.username,
    };
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div className="md__comment-show">
      <header className="comment-header">
        <span className="header-left">
          <Avatar src={avatar} onClick={() => {}} />
          <span className="user-name">{username}</span>
        </span>
      </header>
      <main className="comment-content">{content}</main>
      <footer className="comment-footer">
        <span className="footer-left">{getDescribeTime(releaseTime)}</span>
        <span className="footer-right">回复</span>
      </footer>
      {childComment?.length > 0 && (
        <div className="child-comment">
          {childComment.map((comment) => (
            <ChildCommentShow comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Index;
