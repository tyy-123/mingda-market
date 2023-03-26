import { BaseComponentProps, ModelType, NoteMsg } from '@/interface';
import { Avatar, Button, Upload, message } from 'antd';
import './index.less';

export interface NoteShowProps extends BaseComponentProps {
  noteMSg: NoteMsg;
}
export const ModelTypeMap = new Map([
  [ModelType.USEDIDLE, '二手闲置'],
  [ModelType.ASKFORHELP, '打听求助'],
  [ModelType.LOVEMAKEFRIENDS, '恋爱交友'],
  [ModelType.INTERESTFACTS, '瓜田趣事'],
  [ModelType.TEACHERMSGS, '兼职信息'],
  [ModelType.SCHOOLWORK, '校园招聘'],
]);

const NoteShow: React.FC<NoteShowProps> = ({ noteMSg }) => {
  const {
    avatar,
    commentCount,
    content,
    imgs,
    releaseTime,
    username,
    modelId,
  } = noteMSg;

  console.log(noteMSg);

  return (
    <div className="md__note-show">
      <header className="note-header">
        <span className="header-left">
          <Avatar src={avatar} />
          <span className="user-name">{username}</span>
        </span>
        <span className="header-right">{commentCount}条评论</span>
      </header>
      <main className="note-content">{content}</main>
      <footer className="note-footer">
        <Button type="link">#{ModelTypeMap.get(modelId)}#</Button>
      </footer>
    </div>
  );
};
export default NoteShow;
