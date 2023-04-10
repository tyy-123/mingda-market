export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface PageConfig {
  current: number;
  pageSize: number;
}

export interface NoteMsg {
  avatar: string;
  commentCount: number;
  content: string;
  imgs: Array<string>;
  modelId: number;
  noteId: number;
  releaseTime: string;
  userId: number;
  username: string;
}

export enum ModelType {
  USEDIDLE = 0, //二手闲置
  ASKFORHELP,//打听求助
  LOVEMAKEFRIENDS,//恋爱交友
  INTERESTFACTS,//瓜田趣事
  TEACHERMSGS,//兼职信息
  SCHOOLWORK,//校园招聘
}
