import { Modal } from 'antd';

const { confirm } = Modal;

const useConfirm = () => {
  const deleteConfirm = (
    fn: () => void,
    loading: boolean,
    content = '确定删除选中记录？',
    title = '删除确认',
  ) => {
    confirm({
      title,
      content,
      okText: '确定',
      cancelText: '取消',
      okButtonProps: {
        loading,
      },
      centered: true,
      async onOk() {
        fn();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return { deleteConfirm };
};

export default useConfirm;
