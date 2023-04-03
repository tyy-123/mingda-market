import { ModelTypeMap } from '@/components/noteShow';
import useUrlState from '@ahooksjs/use-url-state';
import React from 'react';
import { Button, FloatButton, Form, Input } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import useWhere2go from '@/hooks/useWhere2go';
import './index.less';
const { TextArea } = Input;
const Index: React.FC = () => {
  const [state, setState] = useUrlState();
  console.log(state.modelId);

  const { goHome } = useWhere2go();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="md__post-note">
      {ModelTypeMap.get(Number(state.modelId))}
      <Form
        name="note"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="帖子内容"
          name="content"
          rules={[{ required: true, message: '请输入你的帖子信息' }]}
        >
          <TextArea placeholder="请输入你的帖子信息" />
        </Form.Item>
        <Form.Item label="图片上传" name="imgs"></Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            发布
          </Button>
        </Form.Item>
      </Form>
      <FloatButton
        icon={<HomeOutlined />}
        description={'首页'}
        onClick={goHome}
      />
    </div>
  );
};
export default Index;
