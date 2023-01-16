import Footer from '@/layouts/components/footer';
import { IRouteComponentProps } from 'umi';
function _Layout({ children }: IRouteComponentProps) {
  return (
    <>
      {children}
      <Footer/>
    </>
  );
}

// _Layout.wrappers = ['@/wrappers/auth'];

export default _Layout;
