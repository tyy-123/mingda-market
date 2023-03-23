import Footer from '@/layouts/components/footer';
import userIdleImg from '@/assets/images/market-module-userIdle.png';
import backgroundImg from '@/assets/images/market-background.png';
import helpImg from '@/assets/images/market-module-help.png';
import loveImg from '@/assets/images/market-module-love.png';
import factsImg from '@/assets/images/market-module-facts.png';
import teacherImg from '@/assets/images/market-module-teacher.png';
import workImg from '@/assets/images/market-module-work.png';

import { Image, FloatButton } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import './index.less';
import useWhere2go from '@/hooks/useWhere2go';
import { useModal } from '@/hooks/useModal';
import PostModal from '@/components/postModal';
import { useEffect } from 'react';
import { apiNote, jdMixAjax } from '@/services';
const Index = () => {
  const { goMarketDetail } = useWhere2go();
  //发布帖子Modal
  const postFormModal = useModal({});
  const getNoteListAjax = jdMixAjax(apiNote.getNoteList_get);

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

  const init = async () => {
    const result = await getNoteListAjax.run({});
    console.log(result);
  };

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
      <main className="market-post">帖子列表</main>
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
