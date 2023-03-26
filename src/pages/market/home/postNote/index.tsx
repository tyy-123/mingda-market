import { ModelTypeMap } from '@/components/noteShow';
import useUrlState from '@ahooksjs/use-url-state';
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import './index.less';
const { TextArea } = Input;
const Index: React.FC = () => {
  const [state, setState] = useUrlState();
  console.log(state.modelId);

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
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
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
      </Form>
    </div>
  );
};
export default Index;
