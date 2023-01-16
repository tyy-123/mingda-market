import {
  HomeOutlined,
  UserOutlined,
  MessageOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { BaseComponentProps } from '@/interface';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import classNames from 'classnames';
import './index.less';
import { useState } from 'react';
import { history, useLocation } from 'umi';

export interface HeaderProps extends BaseComponentProps {}

const Footer: React.FC<HeaderProps> = ({ className, style }) => {
  const location = useLocation();

  //默认底部导航栏
  const items: MenuProps['items'] = [
    {
      label: '集市',
      key: '/market/home',
      icon: <HomeOutlined />,
    },
    {
      label: '搜索',
      key: '/search',
      icon: <SearchOutlined />,
    },
    {
      label: '消息',
      key: '/message',
      icon: <MessageOutlined />,
    },
    {
      label: '我的',
      key: '/personal/home',
      icon: <UserOutlined />,
    },
  ];
  const cls = classNames('md__footer-component', className);

  const onClick: MenuProps['onClick'] = ({ key }) => {
    history.push({ pathname: key });
  };

  return (
    <Menu
      className={cls}
      style={style}
      onClick={onClick}
      defaultSelectedKeys={[location.pathname]}
      mode="horizontal"
      items={items}
    />
  );

  // return (
  //   <div className={cls} style={style}>
  //     <div className="footer-market" >
  //       <HomeOutlined />
  //       集市
  //     </div>
  //     <div className="footer-search" >
  //     <SearchOutlined />
  //       搜索
  //     </div>
  //     <div className="footer-message" >
  //     <MessageOutlined />
  //       消息
  //     </div>
  //     <div className="footer-person" >
  //     <UserOutlined />
  //       我的
  //     </div>
  //   </div>
  // );
};

export default Footer;
