import { BaseComponentProps } from '@/interface';
import { Avatar, Button, Upload, message, Image } from 'antd';
import './index.less';
import useUser from '@/hooks/useUser';
import { getDescribeTime, listToTree } from '@/common/utils';
import { MixSN, apiComment, jdMixAjax } from '@/services';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import ChildCommentShow from '../childCommentShow';

export interface CommentShowProps extends BaseComponentProps {
  comment: any;
  onComment: any;
}

const Index: React.FC<CommentShowProps> = ({ comment, onComment }) => {
  const { userId, releaseTime, content, commentId,childCommentList } = comment;
  // console.log(commentId);
  const { avatar, username } = useUser(userId);
  const [childComment, setChildComment] = useState<any>([]);
  const getChildCommentListAjax = jdMixAjax(apiComment.getChildCommentList_get);
  const { getUserInfoById } = useUser();
  const isTopComment = true;


  const init = async () => {
    const result = await getChildCommentListAjax.run({
      params: {
        commentId,
      },
    });
    const newResult = [...result];
    setChildComment(newResult);
  };

  const getDetailCommentMsg = async (userId: MixSN, reply_to: MixSN) => {
    const user = await getUserInfoById(userId);
    console.log(user);
    const replyUser = await getUserInfoById(reply_to);
    console.log(replyUser);
    return {
      ...user,
      replyToName: replyUser?.username,
    };
  };
  useEffect(() => {
    init();
  }, []);

  const handleComment = (userId: any, reply_to: any) => {
    onComment(false, userId, reply_to);
  };
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
        <span
          className="footer-right"
          onClick={() => handleComment(userId, null)}
        >
          回复
        </span>
      </footer>
      {childCommentList?.length > 0 && (
        <div className="child-comment">
          {childCommentList.map((comment: any, i: any) => (
            <ChildCommentShow
              key={comment + i}
              comment={comment}
              onComment={handleComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Index;
