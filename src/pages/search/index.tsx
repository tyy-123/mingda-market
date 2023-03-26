import { Input } from 'antd';
import './index.less';
const { Search } = Input;

const Index = () => {
  const handleSearch = (value: string) => {
    console.log(value);
  };
  return (
    <div className="md__search-note">
      <div className="search-input">
        <Search
          placeholder="请输入搜索关键词"
          allowClear
          onSearch={handleSearch}
          style={{ width: '80%' }}
        />
        <span className='search-tip'>搜索</span>
      </div>
      <div className="note-list"></div>
    </div>
  );
};
export default Index;
