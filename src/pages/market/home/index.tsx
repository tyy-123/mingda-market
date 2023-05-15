import Footer from '@/layouts/components/footer';
import userIdleImg from '@/assets/images/market-module-userIdle.png';
import backgroundImg from '@/assets/images/market-background.png';
import helpImg from '@/assets/images/market-module-help.png';
import loveImg from '@/assets/images/market-module-love.png';
import factsImg from '@/assets/images/market-module-facts.png';
import teacherImg from '@/assets/images/market-module-teacher.png';
import workImg from '@/assets/images/market-module-work.png';

import { Image, FloatButton, Spin } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import './index.less';
import useWhere2go from '@/hooks/useWhere2go';
import { useModal } from '@/hooks/useModal';
import PostModal from '@/components/postModal';
import { useEffect, useRef, useState } from 'react';
import { apiNote, jdMixAjax } from '@/services';
import { NoteMsg } from '@/interface';
import NoteShow from '@/components/noteShow';
import { useScroll, useSize } from 'ahooks';
import useUser from '@/hooks/useUser';
const Index = () => {
  const { goMarketDetail } = useWhere2go();
  //发布帖子Modal
  const postFormModal = useModal({});
  const getNoteListAjax = jdMixAjax(apiNote.getNoteList_get);
  const getNoteListByPageAjax = jdMixAjax(apiNote.getNoteListPage_get);

  const [notes, setNotes] = useState<NoteMsg[]>([]);

  const ref: any = useRef(null);
  const scroll: any = useScroll(document);

  const { userInfo } = useUser();

  const [noteData, setNoteData] = useState<any>({
    list: [],
    total: 0,
  });
  const marketModuleItems = [
    {
      key: 'usedIdle',
      icon: userIdleImg,
      label: '二手闲置',
    },
    {
      key: 'askForHelp',
      icon: helpImg,
      label: '打听求助',
    },
    {
      key: 'loveMakeFriends',
      icon: loveImg,
      label: '恋爱交友',
    },
    {
      key: 'interestFacts',
      icon: factsImg,
      label: '瓜田趣事',
    },
    {
      key: 'teacherMsgs',
      icon: teacherImg,
      label: '兼职信息',
    },
    {
      key: 'schoolWork',
      icon: workImg,
      label: '校园招聘',
    },
  ];

  const init = async (current?: any) => {
    //获取所有帖子
    // const res = await getNoteListAjax.run({});
    const res1 = await getNoteListByPageAjax.run({
      params: {
        current: current ? current : 1,
        page: 10,
        userId: userInfo.userId,
      },
    });
    // console.log(res);
    console.log(res1);
    setNotes(notes?.concat(res1.list));
    setNoteData({
      list: noteData.list.concat(res1.list),
      total: res1.total,
    });
  };

  useEffect(() => {
    if (scroll?.top && ref?.current?.clientHeight - scroll?.top === 622) {
      console.log('滑倒底啦');
      //滑倒了最低端
      if (noteData?.list?.length < noteData.total) {
        const page = (notes as any)?.length / 10 + 1;
        init(page);
      }
    }
  }, [scroll]);

  useEffect(() => {
    init();
  }, []);
  return (
    <div className="md__market-home">
      <header className="home-header">
        <Image src={backgroundImg} preview={false} />
      </header>
      <section className="market-module">
        {marketModuleItems.map(({ key, icon, label }) => (
          <div
            key={key}
            className="module-item"
            onClick={() => {
              goMarketDetail(key);
            }}
          >
            <Image src={icon} preview={false} />
            <p>{label}</p>
          </div>
        ))}
      </section>
      <Spin spinning={getNoteListByPageAjax.loading}>
        <main className="market-post" ref={ref}>
          {notes?.length && notes?.map((item) => <NoteShow noteMSg={item} />)}
        </main>
      </Spin>
      <Footer />
      <FloatButton
        icon={<PlusCircleFilled style={{ color: '#43ba9d' }} />}
        style={{ bottom: 100 }}
        onClick={postFormModal.show}
      />
      <PostModal
        visible={postFormModal.visible}
        onCancel={postFormModal.hide}
      />
    </div>
  );
};
export default Index;
