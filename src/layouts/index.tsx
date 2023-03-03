import { IRouteComponentProps } from 'umi';
import { ConfigProvider } from 'antd';
import { useState } from 'react';
import zhCN from 'antd/es/locale/zh_CN';
// import enUS from 'antd/es/locale/en_US';
// import Header from './components/header';
import { LangContext } from '@/context';
import MdLanguage from '@/lang';
import './index.less';

export default function Layout({ children, location }: IRouteComponentProps) {
  const [locale, setLocal] = useState(zhCN);
  const lang = MdLanguage.zhCN;

  const pathname = location.pathname;
  const isLoginPage = pathname === '/login';
  return (
    <ConfigProvider locale={locale}>
      <LangContext.Provider value={{ lang }}>
        <div className="jd__base-layout">
          {/* {!isLoginPage && <Header />} */}
          <main className="base-layout__maintainer">{children}</main>
        </div>
      </LangContext.Provider>
    </ConfigProvider>
  );
}
