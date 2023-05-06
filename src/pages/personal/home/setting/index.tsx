import { REX_NAME, REX_PHONE } from '@/common/utils';
import { LangContext } from '@/context';
import {
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { Button, Col, Form, message, Space, Spin } from 'antd';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import './index.less';
import { useEffect } from 'react';
import { apiUser, jdMixAjax } from '@/services';
import useUser from '@/hooks/useUser';
import useWhere2go from '@/hooks/useWhere2go';
import ReturnHeader from '@/components/returnHeader';
import useNote from '@/hooks/useNote';

type FormData = {
  userId: number;
  /**
   * 账号
   */
  username: string;
  /**
   * 姓名
   */
  upload: any;
  /**
   * 上传头像
   */
};

export interface SettingsProps {}
const Settings: React.FC<SettingsProps> = () => {
  const langContext: any = useContext(LangContext);

  const [form] = Form.useForm();

  const getUserMsgAjax = jdMixAjax(apiUser.getLoginUser_get);
  const editAjax = jdMixAjax(apiUser.getLoginUser_get);

  const { refreshUser } = useUser();

  const { goBack } = useWhere2go();

  const [fileList, setFileList] = useState<any[]>([]);

  const init = async () => {
    const user = await getUserMsgAjax.run({});
    form.setFieldsValue({ ...user });
  };

  const { getImgUrlUploadImage } = useNote();

  /**
   * 提交表单
   * @param values 表单值
   */
  const handlePersonalSet = async (personalMsg: FormData) => {
    console.log(personalMsg);
    const { upload } = personalMsg;
    const imgUrl = await getImgUrlUploadImage(upload[0]);
    console.log(imgUrl);

    // try {
    //   await editAjax.run({
    //     data: {
    //       ...personalMsg,
    //     },
    //   });
    //   await refreshUser();
    //   message.success('修改成功');
    //   return true;
    // } catch (error) {
    //   message.error('修改失败');
    //   return false;
    // }
  };

  /**
   * 返回
   */
  const handleBack = () => {
    goBack();
  };

  useEffect(() => {
    init();
  }, []);

  /**
   * 表单项
   * @returns
   */
  const renderFormItems = () => {
    return (
      <div className="form-content">
        <ProFormText name="userId" hidden />
        <ProFormText
          name="account"
          label="账号"
          disabled={true}
          fieldProps={{
            maxLength: 50,
          }}
          rules={[
            {
              required: true,
              whitespace: true,
            },
          ]}
        />
        <ProFormText
          name="username"
          label="姓名"
          rules={[
            {
              required: true,
              whitespace: true,
            },
            {
              pattern: REX_NAME,
              message: langContext.lang.register.nameError,
            },
          ]}
          fieldProps={{
            maxLength: 50,
          }}
        />
        <ProFormUploadButton
          name="upload"
          label="头像"
          title="更换头像"
          max={1}
          fieldProps={{
            fileList: fileList,
            onChange: ({ fileList: newFileList }: any) => {
              console.log(newFileList);
              setFileList(newFileList);
            },
          }}
        />
      </div>
    );
  };
  const cls = classNames('md__settings-page');
  return (
    <div className={cls}>
      <ReturnHeader />
      <Spin spinning={getUserMsgAjax.loading}>
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
                    loading={editAjax.loading}
                    onClick={() => props.form?.submit?.()}
                  >
                    确定
                  </Button>
                  ,
                </Space>,
              ];
            },
          }}
          onFinish={handlePersonalSet}
        >
          {renderFormItems()}
        </ProForm>
      </Spin>
    </div>
  );
};
export default Settings;
