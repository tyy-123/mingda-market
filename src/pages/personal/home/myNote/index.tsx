import NoteShow from '@/components/noteShow';
import ReturnHeader from '@/components/returnHeader';
import useUser from '@/hooks/useUser';
import { NoteMsg } from '@/interface';
import { apiNote, jdMixAjax } from '@/services';
import { useEffect, useState } from 'react';
import './index.less'

const Index = () => {
  const { userInfo } = useUser();
  const [myNote, setMyNote] = useState<NoteMsg[]>([]);
  const getNoteByIdAjax = jdMixAjax(apiNote.getNoteById_get);

  const init = async () => {
    const result = await getNoteByIdAjax.run({
      params: {
        userId: userInfo.userId,
      },
    });
    setMyNote(result);
    console.log(result);
  };

  useEffect(() => {
    init();
  }, []);
  
  return (
    <div className='personal-my-note'>
      <ReturnHeader />
      <main className="market-post">
        帖子列表
        {myNote?.map((item,i:any) => (
          <NoteShow key={item+i} noteMSg={item} />
        ))}
      </main>
    </div>
  );
};
export default Index;
