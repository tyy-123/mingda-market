import { Input } from 'antd';
import './index.less';
import { apiNote, jdMixAjax } from '@/services';
import { NoteMsg } from '@/interface';
import { useState } from 'react';
import NoteShow from '@/components/noteShow';
const { Search } = Input;

const Index = () => {
  const [notes, setNotes] = useState<NoteMsg[]>();
  const [kw, setKw] = useState('');
  const getQueryNoteAjax = jdMixAjax(apiNote.getQueryNote_get);
  /**
   * 搜索
   * @param value 查询值
   */
  const handleSearch = async (value: string) => {
    console.log(value);
    const result = await getQueryNoteAjax.run({
      params: {
        query: value,
      },
    });
    setNotes(result);
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    setKw(value);
  };
  return (
    <div className="md__search-note">
      <div className="search-input">
        <Search
          placeholder="请输入搜索关键词"
          allowClear
          onSearch={handleSearch}
          style={{ width: '80%' }}
          onChange={handleChange}
        />
        <span className="search-tip" onClick={()=>{handleSearch(kw)}}>搜索</span>
      </div>
      <div className="note-list">
        {notes?.map((item) => (
          <NoteShow noteMSg={item} kw={kw} />
        ))}
      </div>
    </div>
  );
};
export default Index;
