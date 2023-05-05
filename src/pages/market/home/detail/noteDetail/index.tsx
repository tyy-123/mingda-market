import useUrlState from '@ahooksjs/use-url-state';
import useNote from '@/hooks/useNote';
import { useEffect, useRef, useState } from 'react';
import NoteShow from '@/components/noteShow';
import { NoteMsg } from '@/interface';
import { Input, message } from 'antd';
import useWhere2go from '@/hooks/useWhere2go';
import {
  HighlightOutlined,
  MessageOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import './index.less';
import { apiComment, apiNote, jdMixAjax } from '@/services';
import CommentShow from '@/components/commentShow';
import useUser from '@/hooks/useUser';

const Index: React.FC = () => {
  const [state, setState] = useUrlState();
  const { getNoteMsgById } = useNote();
  const [noteMsg, setNoteMsg] = useState<any>();
  const [commentList, setCommentList] = useState<any>();
  const [content, setContent] = useState<any>();
  const getCommentListAjax = jdMixAjax(apiComment.getCommentList_get);
  const [isFirstLevel, setIsFirstLevel] = useState<any>();
  const [parentCommentId, setParentCommentId] = useState<any>();
  const [reply_to, setReply_to] = useState<any>(null);

  const parentCommentIdRef: any = useRef();

  const apiCommentAjax = jdMixAjax(apiComment.addComment_get);
  const apiChildCommentAjax = jdMixAjax(apiComment.addChildComment_get);
  const getChildCommentListAjax = jdMixAjax(apiComment.getChildCommentList_get);
  const updateCommentCountAjax = jdMixAjax(apiNote.updateCommentCount_get);

  //发帖自动聚焦
  const myInput: any = useRef();

  const { goBack } = useWhere2go();

  const { userInfo } = useUser();

  const init = async (noteId: number) => {
    const noteMsg = await getNoteMsgById(noteId);
    setNoteMsg(noteMsg);
    const commentList = await getCommentListAjax.run({
      params: {
        noteId,
      },
    });
    const newCommentList: any = [];
    for (let i = 0; i < commentList?.length; i++) {
      const { commentId } = commentList[i];
      let obj = {};
      const result = await getChildCommentListAjax.run({
        params: {
          commentId,
        },
      });
      obj = { ...commentList[i], childCommentList: result };
      newCommentList.push(obj);
    }
    setCommentList(newCommentList);
  };

  useEffect(() => {
    if (state.noteId) {
      init(state.noteId);
    }
  }, [state.noteId]);

  /**
   * 点击评论
   * @param isFirstLevel 是否父级id
   * @param parentCommentId 父级id
   * @param reply_to 回复者id
   *
   */
  const handleComment = (
    isFirstLevel: any,
    parentCommentId?: any,
    reply_to?: any,
  ) => {
    console.log(isFirstLevel, parentCommentId, reply_to);
    setIsFirstLevel(isFirstLevel);
    let commentInput = document.getElementById('comment'); //选取id为test的元素

    if (commentInput) {
      commentInput.style.visibility = 'visible'; // 隐藏选择的元素
    }

    if (parentCommentId) {
      setParentCommentId(parentCommentId);
      parentCommentIdRef.current = parentCommentId;
    }
    if (reply_to) setReply_to(reply_to);
  };

  const handleChange = (e: any) => {
    const content = e.target.value;
    setContent(content);
  };

  const handlePublishComment = async () => {
    if (!content) {
      message.info('请输入内容再发布');
      return;
    }
    console.log(isFirstLevel);
    try {
      if (isFirstLevel) {
        await apiCommentAjax.run({
          params: {
            noteId: state.noteId,
            userId: userInfo.userId,
            content,
          },
        });
      } else {
        await apiChildCommentAjax.run({
          params: {
            userId: userInfo.userId,
            parentCommentId,
            reply_to: reply_to ? reply_to : '',
            content,
          },
        });
      }
      handleBlur();
      await updateCommentCountAjax.run({
        params: {
          noteId: state.noteId,
        },
      });
      init(state.noteId);
    } catch (error) {}
  };
  /**
   * 发布评论失去焦点
   */
  const handleBlur = () => {
    setContent('');
    let commentInput = document.getElementById('comment'); //选取id为test的元素

    if (commentInput) {
      commentInput.style.visibility = 'hidden'; // 隐藏选择的元素
    }
  };
  return (
    <div className="md__noteDetail-page">
      <div className="note-detail-header" onClick={goBack}>{`< 返回`}</div>
      {noteMsg && <NoteShow noteMSg={{ ...noteMsg }} />}
      <footer
        className="noter-footer"
        onClick={() => {
          handleComment(true);
        }}
      >
        <span className="footer-right">
          <MessageOutlined />
          评论帖子
        </span>
      </footer>
      <div className="note-comment">
        <header className="comment-header-top">评论留言</header>
        {commentList?.map((comment: any, i: number) => (
          <CommentShow
            key={comment + i}
            comment={comment}
            onComment={handleComment}
          />
        ))}
      </div>
      <div className="note-publish-comment" id="comment">
        <div className="go-home-left" onClick={handleBlur}>
          <EyeInvisibleOutlined style={{ color: '#aeaeae' }} />
          <div>关闭</div>
        </div>
        <Input
          value={content}
          placeholder="✍友善评论，传递温暖"
          onChange={handleChange}
        />
        <div className="go-home-right" onClick={handlePublishComment}>
          <HighlightOutlined style={{ color: '#aeaeae' }} />
          <div>发布</div>
        </div>
      </div>
    </div>
  );
};
export default Index;
