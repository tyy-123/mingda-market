import { NoteMsg } from '@/interface';
import { apiNote, jdMixAjax } from '@/services';
import { useEffect, useState } from 'react';

const useNote = () => {
  const getNoteListByPageAjax = jdMixAjax(apiNote.getNoteListPage_get);
  const getNoteListAjax = jdMixAjax(apiNote.getNoteList_get);
  const uploadAjax = jdMixAjax({
    ...apiNote.uploadImage_post,
    options: {
      ...apiNote.uploadImage_post.options,
      headers: {},
      requestType: 'form',
    },
  });
  const getNoteMsgByIdAjax = jdMixAjax(apiNote.getNoteMsgById_get);

  const addRecommendDataAjax = jdMixAjax(apiNote.addRecommendData_get);

  const [allNotes, setAllNotes] = useState<NoteMsg[]>();
  const [usedIdleNotes, setUsedIdleNotes] = useState<NoteMsg[]>();
  const [askFoeHelpNotes, setAskFoeHelpNotes] = useState<NoteMsg[]>();
  const [loveMakeFriendsNotes, setLoveMakeFriends] = useState<NoteMsg[]>();
  const [interestFactsNotes, setInterestFactsNotes] = useState<NoteMsg[]>();
  const [teacherMsgsNotes, setTeacherMsgsNotes] = useState<NoteMsg[]>();
  const [schoolWorkNotes, setSchoolWorkNotes] = useState<NoteMsg[]>();
  /**
   *
   * @param modelId 模块Id
   */
  const getModelNotes = async (modelId: number) => {
    const result = await getNoteListAjax.run({
      params: {
        modelId,
      },
    });
    return result;
  };

  const init = async () => {
    const res = await getNoteListAjax.run({});
    setAllNotes(res);
    const usedIdleNotes = await getModelNotes(0);
    setUsedIdleNotes(usedIdleNotes);
    const askFoeHelpNotes = await getModelNotes(1);
    setAskFoeHelpNotes(askFoeHelpNotes);
    const loveMakeFriendsNotes = await getModelNotes(2);
    setLoveMakeFriends(loveMakeFriendsNotes);
    const interestFactsNotes = await getModelNotes(3);
    setInterestFactsNotes(interestFactsNotes);
    const teacherMsgsNotes = await getModelNotes(4);
    setTeacherMsgsNotes(teacherMsgsNotes);
    const schoolWorkNotes = await getModelNotes(5);
    setSchoolWorkNotes(schoolWorkNotes);
  };

  /**
   * 上传图片获取图片地址
   * @param file
   */
  const getImgUrlUploadImage = async (file: { originFileObj: any }) => {
    const formData: any = new FormData();
    formData.append('file', file.originFileObj);
    const imgUrl = await uploadAjax.run({
      data: formData,
    });
    return imgUrl;
  };

  /**
   * 通过帖子Id获取帖子信息
   * @param noteId
   * @returns
   */
  const getNoteMsgById = async (noteId: number) => {
    const noteMsg = await getNoteMsgByIdAjax.run({
      params: {
        noteId,
      },
    });
    console.log(noteMsg);
    return noteMsg;
  };

  /**
   * 添加推荐数据
   * @param params
   */
  const addRecommendData = async (params: any) => {
    try {
      await addRecommendDataAjax.run({
        params,
      });
    } catch (error) {}
  };

  useEffect(() => {
    init();
  }, []);
  return {
    getModelNotes,
    allNotes,
    getImgUrlUploadImage,
    getNoteMsgById,
    schoolWorkNotes,
    teacherMsgsNotes,
    interestFactsNotes,
    loveMakeFriendsNotes,
    askFoeHelpNotes,
    usedIdleNotes,
    addRecommendData,
  };
};

export default useNote;
