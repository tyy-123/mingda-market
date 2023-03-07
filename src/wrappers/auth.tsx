import useAuth from '@/hooks/useAuth';
import { ReactChild, ReactFragment, ReactPortal } from 'react';
import { Redirect } from 'umi';

export default (props: {
  children:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) => {
  const { isLogin } = useAuth();
  console.log(isLogin);

  if (isLogin) {
    return <>{props.children}</>;
  } else {
    return <Redirect to="/login" />;
  }
};
