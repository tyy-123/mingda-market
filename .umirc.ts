import { APP_NAME, TITLE } from './src/constants';
import { defineConfig } from 'umi';

export default defineConfig({
  title: TITLE,
  history: { type: 'hash' },
  nodeModulesTransform: {
    type: 'none',
  },
  terserOptions: {
    compress: {
      drop_console: true,
    },
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
});
