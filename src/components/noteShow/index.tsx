import { BaseComponentProps, ModelType, NoteMsg } from '@/interface';
import { Avatar, Button, Upload, message, Image } from 'antd';
import './index.less';
import useWhere2go from '@/hooks/useWhere2go';
import { getDescribeTime } from '@/common/utils';

export interface NoteShowProps extends BaseComponentProps {
  noteMSg: NoteMsg;
  kw?: String;
}
export const ModelTypeMap = new Map([
  [ModelType.USEDIDLE, '二手闲置'],
  [ModelType.ASKFORHELP, '打听求助'],
  [ModelType.LOVEMAKEFRIENDS, '恋爱交友'],
  [ModelType.INTERESTFACTS, '瓜田趣事'],
  [ModelType.TEACHERMSGS, '兼职信息'],
  [ModelType.SCHOOLWORK, '校园招聘'],
]);

const NoteShow: React.FC<NoteShowProps> = ({ noteMSg, kw }) => {
  const {
    noteId,
    avatar,
    commentCount,
    content,
    imgs,
    releaseTime,
    userId,
    username,
    modelId,
  } = noteMSg;

  const { goNoteDetail, goMsgDetail } = useWhere2go();
  const highLight = (n: any, m: any) => {
    let str = n;
    let word = m;
    let result = str.replace(
      new RegExp('(' + word + ')', 'ig'),
      '<span style="color:#57ba9d" >' + word + '</span>',
    );
    return result;
  };
  return (
    <div className="md__note-show">
      <header className="note-header">
        <span className="header-left">
          <Avatar
            src={avatar}
            onClick={() => {
              goMsgDetail(userId);
            }}
          />
          <span className="user-name">{username}</span>
        </span>
        <span className="header-right">{commentCount}条评论</span>
      </header>
      <main
        onClick={() => {
          goNoteDetail(noteId);
        }}
        className="note-content"
        dangerouslySetInnerHTML={{ __html: highLight(content, kw) }}
      >
        {/* {content} */}
      </main>
      <div
        className="img-list"
        onClick={() => {
          goNoteDetail(noteId);
        }}
      >
        {imgs?.map(
          (src: string,i:number) =>
            src && (
              <div key={src+i} className="img-div">
                <img src={src}></img>
              </div>
            ),
        )}
      </div>
      <footer className="note-footer">
        <Button type="link">#{ModelTypeMap.get(modelId)}#</Button>
        <span className="footer-right">{getDescribeTime(releaseTime)}</span>
      </footer>
    </div>
  );
};
export default NoteShow;
