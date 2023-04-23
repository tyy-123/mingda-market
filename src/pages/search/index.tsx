import { Input } from 'antd';
import './index.less';
import { apiNote, jdMixAjax } from '@/services';
import { NoteMsg } from '@/interface';
import { useState } from 'react';
import NoteShow from '@/components/noteShow';
const { Search } = Input;

const Index = () => {
  const [notes, setNotes] = useState<NoteMsg[]>();


  const getQueryNoteAjax = jdMixAjax(apiNote.getQueryNote_get);
  const handleSearch = async (value: string) => {
    console.log(value);
    const result=await getQueryNoteAjax.run({
      params:{
        query:value
      }
    })
    console.log(result);
    setNotes(result)
    
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
        <span className="search-tip">搜索</span>
      </div>
      <div className="note-list">
      {notes?.map((item) => (
          <NoteShow noteMSg={item} />
        ))}
      </div>
    </div>
  );
};
export default Index;
