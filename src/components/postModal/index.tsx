import { BaseComponentProps, ModelType } from '@/interface';
import { Button, Modal, Upload, message } from 'antd';
import { ModelTypeMap } from '../noteShow';
import './index.less';
import useWhere2go from '@/hooks/useWhere2go';

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
    ModelType.USEDIDLE,
    ModelType.ASKFORHELP,
    ModelType.LOVEMAKEFRIENDS,
    ModelType.INTERESTFACTS,
    ModelType.TEACHERMSGS,
    ModelType.SCHOOLWORK,
  ];

  const { goPostNote } = useWhere2go();

  /**
   * 发布帖子
   * @param modelId 帖子类型Id
   */
  const handlePostNote = (modelId: number) => {
    goPostNote(modelId);
  };
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
      {columnTypes.map((typeId: number) => (
        <div
          className="type-item"
          onClick={() => handlePostNote(typeId)}
        >{`${ModelTypeMap.get(typeId)}  >`}</div>
      ))}
    </Modal>
  );
};
export default PostModal;
