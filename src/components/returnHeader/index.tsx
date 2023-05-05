import useWhere2go from '@/hooks/useWhere2go';
import './index.less'
const Index = () => {
  const { goBack } = useWhere2go();
  return <div className="return-header-component" onClick={goBack}>{`< 返回`}</div>;
};
export default Index;
