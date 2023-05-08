import useUrlState from '@ahooksjs/use-url-state';
import React, { useState } from 'react';
import { Button, FloatButton, Form, Input, Upload, Tag } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { HomeOutlined } from '@ant-design/icons';
import useWhere2go from '@/hooks/useWhere2go';
import { PlusOutlined } from '@ant-design/icons';
import './index.less';
import { apiNote, jdAjax, jdMixAjax } from '@/services';
import useNote from '@/hooks/useNote';
import useUser from '@/hooks/useUser';
import { ModelTypeMap } from '@/components/noteShow';
const { TextArea } = Input;
const Index: React.FC = () => {
  const postNoteAjax = jdMixAjax(apiNote.postNote_post);
  const uploadAjax = jdMixAjax({
    ...apiNote.uploadImage_post,
    options: {
      ...apiNote.uploadImage_post.options,
      headers: {},
      requestType: 'form',
    },
  });
  const [fileList, setFileList] = useState<any[]>([]);
  const [state, setState] = useUrlState();
  const { userInfo } = useUser();
  console.log(userInfo);

  const { goHome } = useWhere2go();
  const { getImgUrlUploadImage } = useNote();

  /**
   * 发布帖子
   * @param values 帖子内容
   */
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const { content } = values;
    let imgList: string = '';
    for (let i = 0; i < fileList.length; i++) {
      const imgUrl = await getImgUrlUploadImage(fileList[i]);
      console.log(imgUrl);
      imgList += imgUrl + '*';
    }
    await postNoteAjax.run({
      data: {
        userId: userInfo.userId,
        content,
        imgs: imgList,
        modelId: state.modelId,
      },
    });
    goHome()
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange: any = ({ fileList: newFileList }: any) => {
    /**
     * 文件列表
     */
    // console.log(newFileList);

    setFileList(newFileList);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="md__post-note">
      <Form
        name="note"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
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
        <Form.Item label="图片上传" name="imgs">
          <Upload
            // action="http://172.17.195.166:8000/api/uploadImage"
            showUploadList={{
              showPreviewIcon: false,
            }}
            listType="picture-card"
            fileList={fileList}
            // onPreview={handlePreview}
            onChange={handleChange}
          >
            {/* {fileList.length >= 8 ? null : uploadButton}
             */}
            {uploadButton}
          </Upload>
        </Form.Item>
        <div className="model-type">
          <Tag color="#f6f6f6">#{ModelTypeMap.get(Number(state.modelId))}</Tag>
        </div>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="md-btn--green" htmlType="submit">
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
