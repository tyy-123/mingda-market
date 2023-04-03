import { NoteMsg } from '@/interface';
import { apiNote, jdMixAjax } from '@/services';
import { useEffect, useState } from 'react';

const useNote = () => {
  const getNoteListByPageAjax = jdMixAjax(apiNote.getNoteListPage_get);
  const getNoteListAjax = jdMixAjax(apiNote.getNoteList_get);
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
    const result = await getNoteListByPageAjax.run({
      params: {
        current: 1,
        page: 5,
        modelId,
      },
    });
    return result;
  };

  const init = async () => {
    const res = await getNoteListAjax.run({});
    setAllNotes(res)
    const usedIdleNotes=await getModelNotes(0)
    setUsedIdleNotes(usedIdleNotes)
    const askFoeHelpNotes=await getModelNotes(1)
    setAskFoeHelpNotes(askFoeHelpNotes)
    const loveMakeFriendsNotes=await getModelNotes(2)
    setLoveMakeFriends(loveMakeFriendsNotes)
    const interestFactsNotes=await getModelNotes(3)
    setInterestFactsNotes(interestFactsNotes)
    const teacherMsgsNotes=await getModelNotes(4)
    setTeacherMsgsNotes(teacherMsgsNotes)
    const schoolWorkNotes=await getModelNotes(5)
    setSchoolWorkNotes(schoolWorkNotes)
  };
  useEffect(() => {
    init();
  }, []);
  return {
    getModelNotes,
    allNotes,
    schoolWorkNotes,
    teacherMsgsNotes,
    interestFactsNotes,
    loveMakeFriendsNotes,
    askFoeHelpNotes,
    usedIdleNotes

  };
};

export default useNote;
