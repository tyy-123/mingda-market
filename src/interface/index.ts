export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface PageConfig {
  current: number;
  pageSize: number;
}
