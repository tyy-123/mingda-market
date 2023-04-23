import { BaseComponentProps } from '@/interface';
import './index.less';

export interface CommentShowProps extends BaseComponentProps {
  comment: any;
}

const Index: React.FC<CommentShowProps> = ({ comment }) => {
  const { username, avatar, releaseTime, content } = comment;
  console.log(comment);

  const isTopComment = true;
  // const comment = {
  //   username: '嘿嘿',
  //   avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //   releaseTime: '2023-04-10 00:00:00',
  //   content: '推荐Ukiss的睫毛打底',
  // };
  return <div className="md__comment-show">{content}</div>;
};
export default Index;
