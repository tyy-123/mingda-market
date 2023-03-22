import { LangContext } from '@/context';
import { apiUser, jdMixAjax } from '@/services';
import {
  CaptFieldRef,
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import classNames from 'classnames';
import { useContext, useRef } from 'react';
import {
  LockOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Button, Form, message } from 'antd';
// import Logo from '@/components/logo';
import useWhere2go from '@/hooks/useWhere2go';
// import Copyright from '@/components/copyright';
import { setToken } from '@/common/utils';
import { history } from 'umi';
import './index.less';
// import useUser from '@/hooks/useUser';
// import { UserType } from '@/constants';

const cls = classNames('md__login-page');
const Login: React.FC = () => {
  const captchaRef = useRef<CaptFieldRef | null | undefined>();
  const langContext: any = useContext(LangContext);
  const [loginForm] = Form.useForm();

  const loginAjax = jdMixAjax(apiUser.login_get);

  const { goRegister } = useWhere2go();

  const handleLogin = async (values: any) => {
    console.log(values);
    const res = await loginAjax.run({
      params: { ...values },
    });
    console.log(res);

    if (res) {
      setToken(res.token);
      setTimeout(async () => {
        // const user = await refreshUser();
        message.success('登录成功');

        // const type = user && user.type;
        // if (type && [UserType.EXPERT, UserType.LEADER].includes(type)) {
        //   const userTypeAlias = type === UserType.EXPERT ? 'experts' : 'leader';
        //   history.push({ pathname: `/manage/approval/${userTypeAlias}/list` });
        // } else {
        history.push({ pathname: '/market' });
        // }
      }, 300);
    }
  };

  return (
    <div className={cls}>
      <div className="login-card">
        <div className="login-welcome">
          <span className="login-welcome-txt">
            {langContext.lang.login.welcome}
          </span>
        </div>
        {/* <Logo /> */}
        <div className="login-way">
          <span className="login-way-txt">{langContext.lang.login.way}</span>
        </div>
        <LoginForm<any>
          form={loginForm}
          grid
          rowProps={{
            gutter: [0, 8],
          }}
          onFinish={handleLogin}
        >
          <ProFormText
            name="account"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
              maxLength: 50,
            }}
            placeholder={'请输入账号/邮箱'}
            rules={[
              {
                pattern: /^[^\s]*$/,
                message: '请勿输入空格',
              },
              {
                required: true,
                whitespace: true,
                message: '请输入账号/邮箱',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
              maxLength: 16,
            }}
            placeholder={'请输入密码'}
            rules={[
              {
                required: true,
                whitespace: true,
                message: '请输入密码',
              },
            ]}
          />
          {/* <ProFormCaptcha
        name="captcha"
        fieldRef={captchaRef}
        fieldProps={{
          size: 'large',
          prefix: <SafetyCertificateOutlined className={'prefixIcon'} />,
          maxLength: 5,
        }}
        captchaProps={{
          size: 'large',
          className: 'jd-btn--captcha',
        }}
        placeholder={'请输入验证码'}
        countDown={0}
        captchaTextRender={(timing, count) => {
          if (timing) {
            captchaRef.current?.endTiming();
          }
          return <img src={data?.imageBase} alt="" />;
        }}
        rules={[
          {
            required: true,
            message: '请输入验证码',
          },
        ]}
        onGetCaptcha={refresh}
      /> */}
          <div
            style={{
              marginBlockEnd: 24,
              color: 'rgba(0,0,0,0.6)',
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
          </div>
        </LoginForm>
        <div className="login-register-forget">
          <Button type="link" className="jd-link--blue" onClick={goRegister}>
            {langContext.lang.login.register}
          </Button>
          {/* <Button
            type="link"
            className="jd-link--blue"
            //  onClick={goForget}
          >
            {langContext.lang.login.forget}
          </Button> */}
        </div>
      </div>
    </div>
  );
};
export default Login;
