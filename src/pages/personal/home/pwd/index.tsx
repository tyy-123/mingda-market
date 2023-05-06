import { apiUser, jdMixAjax } from '@/services';
import { Button, Form, message, Space } from 'antd';
import classNames from 'classnames';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { REX_PWD } from '@/common/utils';
import { useContext } from 'react';
import { LangContext } from '@/context';
import { getInitialState } from '@/app';
import useWhere2go from '@/hooks/useWhere2go';
import useAuth from '@/hooks/useAuth';
import './index.less';
import ReturnHeader from '@/components/returnHeader';
export interface PwdProps {}

type FormData = {
  username: string;
  oldPassword: string;
  newPassword: string;
};

const Pwd: React.FC<PwdProps> = () => {
  const langContext: any = useContext(LangContext);

  const [form] = Form.useForm();

  const { goBack } = useWhere2go();
  const { forcedOffline } = useAuth();

  const updatePasswordAjax = jdMixAjax(apiUser.updateUserPassword);

  /**
   * 提交表单
   * @param values 表单值
   */
  const handlePasswordSet = async (formData: FormData) => {
    const { user } = await getInitialState();
    const { oldPassword, newPassword } = formData;
    console.log(user.userId, oldPassword, newPassword);
    try {
      const result = await updatePasswordAjax.run({
        params: {
          userId: user.userId,
          oldPassword,
          newPassword,
        },
      });
      console.log(result);
      message.success('密码修改成功，即将退出重新登录', 1);
      setTimeout(() => {
        forcedOffline();
      }, 1000);
      return true;
    } catch (error) {
      // message.error('修改失败');
      return false;
    }
  };

  /**
   * 返回
   */
  const handleBack = () => {
    goBack();
  };

  const renderFormItems = () => {
    return (
      <div className="form-content">
        <ProFormText.Password
          name="newPassword"
          label="新密码"
          fieldProps={{
            maxLength: 16,
          }}
          rules={[
            {
              required: true,
              whitespace: true,
            },
            {
              pattern: REX_PWD,
              message: langContext.lang.register.pwdError,
            },
          ]}
        />
        <ProFormText.Password
          name="oldPassword"
          label="旧密码"
          rules={[
            {
              required: true,
              whitespace: true,
            },
          ]}
          fieldProps={{
            minLength: 6,
            maxLength: 16,
          }}
        />
        <ProFormText.Password
          name="reNewPassword"
          dependencies={['password']}
          label="确认密码"
          rules={[
            {
              required: true,
              whitespace: true,
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('新密码与确认新密码不同');
              },
            }),
          ]}
          fieldProps={{
            maxLength: 16,
          }}
        />
      </div>
    );
  };

  const cls = classNames('md__pwd-page');
  return (
    <div className={cls}>
      <ReturnHeader />
      <ProForm<FormData>
        form={form}
        labelCol={{ span: 4, offset: 3 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
        submitter={{
          render: (props, doms) => {
            return [
              <Space size={24}>
                <Button onClick={handleBack} className="md-btn--white">
                  返回
                </Button>
                <Button
                  className="md-btn--green"
                  key="submit"
                  loading={updatePasswordAjax.loading}
                  onClick={() => props.form?.submit?.()}
                >
                  确定
                </Button>
                ,
              </Space>,
            ];
          },
        }}
        onFinish={handlePasswordSet}
        params={{}}
      >
        {renderFormItems()}
      </ProForm>
    </div>
  );
};
export default Pwd;
