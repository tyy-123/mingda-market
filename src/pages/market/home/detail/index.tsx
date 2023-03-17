import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import useUrlState from '@ahooksjs/use-url-state';
import { FloatButton } from 'antd';
import { EditOutlined, HomeOutlined } from '@ant-design/icons';
import useWhere2go from '@/hooks/useWhere2go';
import './index.less';

import { useEffect } from 'react';
import { useModal } from '@/hooks/useModal';
import PostModal from '@/components/postModal';

const Index: React.FC = () => {
  const [state, setState] = useUrlState();

  const [currentKey, setCurrentKey] = useState<string>(
    state?.currentKey ?? 'all',
  );

  const { goHome } = useWhere2go();

  const postFormModal = useModal({});

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: `全部`,
      children: <div>全部</div>,
    },
    {
      key: 'usedIdle',
      label: `二手闲置`,
      children: <div>二手闲置</div>,
    },
    {
      key: 'askForHelp',
      label: `打听求助`,
      children: <div>打听求助</div>,
    },
    {
      key: 'loveMakeFriends',
      label: `恋爱交友`,
      children: <div>恋爱交友</div>,
    },
    {
      key: 'interestFacts',
      label: `瓜田趣事`,
      children: <div>瓜田趣事</div>,
    },
    {
      key: 'teacherMsgs',
      label: `兼职信息`,
      children: <div>兼职信息</div>,
    },
    {
      key: 'schoolWork',
      label: `校园招聘`,
      children: <div>校园招聘</div>,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
    setCurrentKey(key);
    setState({ currentKey: key });
  };

  useEffect(() => {
    setCurrentKey(state?.currentKey);
  }, [state?.currentKey]);

  return (
    <div className="md_market-detail">
      <Tabs activeKey={currentKey} items={items} onChange={onChange} />
      <FloatButton.Group shape="square" style={{ right: 20 }}>
        <FloatButton
          onClick={postFormModal.show}
          icon={<EditOutlined />}
          description={'发布'}
        />
        <FloatButton
          icon={<HomeOutlined />}
          description={'首页'}
          onClick={goHome}
        />
      </FloatButton.Group>
      <PostModal
        visible={postFormModal.visible}
        onCancel={postFormModal.hide}
      />
    </div>
  );
};
export default Index;
