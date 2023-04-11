import useUrlState from '@ahooksjs/use-url-state';
import useNote from '@/hooks/useNote';
import { useEffect, useState } from 'react';
import NoteShow from '@/components/noteShow';
import { NoteMsg } from '@/interface';
import { Input } from 'antd';
import useWhere2go from '@/hooks/useWhere2go';
import { HomeOutlined, MessageOutlined } from '@ant-design/icons';
import './index.less';

const Index: React.FC = () => {
  const [state, setState] = useUrlState();
  const { getNoteMsgById } = useNote();
  const [noteMsg, setNoteMsg] = useState<any>();

  const { goBack } = useWhere2go();

  const init = async (noteId: number) => {
    const noteMsg = await getNoteMsgById(noteId);
    setNoteMsg(noteMsg);
  };

  useEffect(() => {
    if (state.noteId) {
      init(state.noteId);
    }
  }, [state.noteId]);
  return (
    <div className="md__noteDetail-page">
      <div className="note-detail-header" onClick={goBack}>{`< 返回`}</div>
      {noteMsg && <NoteShow noteMSg={noteMsg} />}
      <div className="note-comment">一条又一条的评论区</div>
      <div className="note-publish-comment">
        <div className="go-home-left">
          <HomeOutlined style={{ color: '#aeaeae' }} />
          <div>首页</div>
        </div>
        <Input placeholder="✍友善评论，传递温暖" />
        <div className="go-home-right">
          <MessageOutlined style={{ color: '#aeaeae' }} />
          <div>消息</div>
        </div>
      </div>
    </div>
  );
};
export default Index;