import { IRouteComponentProps } from 'umi';
function _Layout({ children }: IRouteComponentProps) {
  return <>{children} </>;
}

_Layout.wrappers = ['@/wrappers/auth'];

export default _Layout;
