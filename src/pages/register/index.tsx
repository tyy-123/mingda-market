import { LangContext } from '@/context';
import {
  ProForm,
  ProFormCaptcha,
  ProFormText,
} from '@ant-design/pro-components';
import classNames from 'classnames';
import { useContext } from 'react';
import {
  LockOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  MailOutlined,
  BankOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Button, message } from 'antd';
import useWhere2go from '@/hooks/useWhere2go';
import { apiUser, jdAjax, jdMixAjax } from '@/services';
import { REX_NAME, REX_PHONE, REX_PWD, setToken } from '@/common/utils';
// import useUser from '@/hooks/useUser';
import { useBoolean } from 'ahooks';
import './index.less';

export interface RegisterProps {}

type RegisterData = {
  code: string;
  name: string;
  org: string;
  password: string;
  phone: string;
  /**
   * 性别
   * 0 女
   * 1 男
   */
  sex: 0 | 1;
  username: string;
};
const Register: React.FC<RegisterProps> = () => {
  const langContext: any = useContext(LangContext);
  const { goLogin, goHome } = useWhere2go();
  // const { refreshUser, isAccountExist } = useUser();
  const [isJumping, { setTrue, setFalse }] = useBoolean(false);

  const registerAjax = jdMixAjax(apiUser.register_post);

  /**
   * 验证账号
   */
  const handleVerifyAccount = async (_: any, username: string) => {
    // const isExist = await isAccountExist(username);
    // if (isExist) return Promise.reject(new Error('该账号已存在，请重新输入'));
    // else
    return Promise.resolve();
  };

  /**
   * 获取验证码
   * @param email 邮箱
   */
  const handleGetCode = async (email: string) => {
    console.log(email);
    try {
      let res = await jdAjax({ params: { email } }, apiUser.getCode_get);
      console.log(res);
      if (res.code === 200)
        message.success(`已向 ${email} 发送验证码，请注意查收`);
    } catch (error) {
      throw new Error(langContext.lang.register.codeError);
    }
  };

  /**
   * 注册账号
   * @param values
   */
  const handleRegister = async (values: RegisterData) => {
    try {
      const res = await registerAjax.run({
        params: {
          ...values,
        },
      });
      console.log(res);     
      if (res) {
        setToken(res.token);
        setTrue();
        setTimeout(async () => {
          message.success('注册成功');
          // await refreshUser();
          setTimeout(() => {
            setFalse();
            goHome();
          }, 1000);
        }, 300);
      } else throw new Error();
    } catch (error) {
      console.error(error);
      setFalse();
    }
  };

  const cls = classNames('jd__register-page');
  return (
    <div className={cls}>
      <div className="register-card">
        <div className="register-welcome">
          <span className="register-welcome-txt">
            {langContext.lang.register.welcome}
          </span>
        </div>
        <ProForm<RegisterData>
          grid
          rowProps={{
            gutter: [0, 8],
          }}
          submitter={{
            render: (props, doms) => {
              return [
                <Button
                  className="jd-btn--register"
                  key="submit"
                  onClick={() => props.form?.submit?.()}
                  loading={registerAjax.loading || isJumping}
                >
                  {isJumping ? '正在自动登录..' : '注册'}
                </Button>,
              ];
            },
          }}
          onFinish={handleRegister}
        >
          <ProFormText
            name="email"
            fieldProps={{
              size: 'large',
              prefix: <MailOutlined className={'prefixIcon'} />,
              maxLength: 50,
            }}
            placeholder={'请输入邮箱作为账号'}
            rules={[
              {
                required: true,
                whitespace: true,
                message: '请输入邮箱',
              },
              {
                type: 'email',
                message: langContext.lang.register.emailError,
              },
              {
                validator: handleVerifyAccount,
              },
            ]}
          />
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
              maxLength: 50,
            }}
            placeholder={'请输入用户名'}
            rules={[
              {
                required: true,
                whitespace: true,
                message: '请输入用户名',
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
              {
                pattern: REX_PWD,
                message: langContext.lang.register.pwdError,
              },
            ]}
          />
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <SafetyCertificateOutlined />,
              maxLength: 6,
            }}
            captchaProps={{
              size: 'large',
              className: 'jd-btn--code',
            }}
            phoneName="email"
            name="authCode"
            rules={[
              {
                required: true,
                whitespace: true,
                message: '请输入验证码',
              },
            ]}
            placeholder="请输入验证码"
            onGetCaptcha={handleGetCode}
          />
        </ProForm>
        <div className="register-login">
          <div>
            <span>{langContext.lang.register.hasAccount}</span>
            <span>，</span>
            <Button type="link" className="jd-link--blue" onClick={goLogin}>
              <span>{langContext.lang.register.login}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
