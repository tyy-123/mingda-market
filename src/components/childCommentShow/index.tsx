import { BaseComponentProps } from '@/interface';
import { Avatar, Button, Upload, message, Image } from 'antd';
import './index.less';
import useUser from '@/hooks/useUser';
import { getDescribeTime, listToTree } from '@/common/utils';
import { MixSN, apiComment, jdMixAjax } from '@/services';
import { useEffect, useState } from 'react';

export interface CommentShowProps extends BaseComponentProps {
  comment: any;
}

const Index: React.FC<CommentShowProps> = ({ comment }) => {
  const { userId, releaseTime, content, reply_to, commentId } = comment;
  // console.log(commentId);
  const { avatar, username } = useUser(userId);
  const { username: replyToUserName } = useUser(reply_to);

  return (
    <div className="md__child-comment-show">
      <header className="comment-header">
        <span className="header-left">
          <Avatar src={avatar} onClick={() => {}} />
          <span className="user-name">
            {username}{' '}
            <span className="reply-to">
              <span className="black-reply">{replyToUserName && '回复@'}</span>
              {replyToUserName ? `${replyToUserName}` : ''}
            </span>
          </span>
        </span>
      </header>
      <main className="comment-content">{content}</main>
      <footer className="comment-footer">
        <span className="footer-left">{getDescribeTime(releaseTime)}</span>
        <span className="footer-right">回复</span>
      </footer>
    </div>
  );
};
export default Index;
