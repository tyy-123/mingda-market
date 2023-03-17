import { BaseComponentProps } from '@/interface';
import { Button, Modal, Upload, message } from 'antd';
import './index.less';

export interface PostModalProps extends BaseComponentProps {
  visible: boolean;
  onCancel: () => void;
}
const PostModal: React.FC<PostModalProps> = ({
  visible,
  onCancel,
  ...rest
}) => {
  const columnTypes = [
    '二手闲置',
    '打听求助',
    '恋爱交友',
    '瓜田趣事',
    '兼职信息',
    '校园招聘',
  ];
  return (
    <Modal
      width={300}
      className="md__post-modal"
      title="选择栏目"
      {...rest}
      closable={false}
      open={visible}
      destroyOnClose={true}
      maskClosable={false}
      centered
      footer={
        <div className="modal-footer" onClick={onCancel}>
          取消
        </div>
      }
    >
      {columnTypes.map((type: string) => (
        <div className="type-item">{`${type}  >`}</div>
      ))}
    </Modal>
  );
};
export default PostModal;
