import { APP_NAME, TITLE } from './src/constants';
import { defineConfig } from 'umi';

const path = ['/api'];

const getProxy = () => {
  const map: any = {};
  path.forEach((item) => {
    map[item] = {
      target: 'http://localhost:8001/',
      changeOrigin: true,
    };
  });
  return map;
};

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
  proxy: {
    ...getProxy(),
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  chainWebpack(config: any) {
    config.module
      .rule('fonts')
      .test(/\.(otf|ttc|ttf|eot|svg|woff(2)?)(\?[a-z\d]+)?$/)
      .use('file-loader')
      .loader('file-loader');

    // config.module
    //   .rule('svg')
    //   .test(/.svg(\?v=\d+.\d+.\d+)?$/)
    //   .use([
    //     {
    //       loader: 'babel-loader',
    //     },
    //     {
    //       loader: '@svgr/webpack',
    //       options: {
    //         babel: false,
    //         icon: true,
    //       },
    //     },
    //   ])
    //   .loader(require.resolve('@svgr/webpack'));

    config.module
      .rule('bpmn')
      .test(/\.bpmn$/)
      .use('raw-loader')
      .loader('raw-loader');
    config.module
      .rule('jsx')
      .test(/\.m?js$/)
      .exclude.add(/node_modules/)
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        plugins: [
          [
            '@babel/plugin-transform-react-jsx',
            {
              importSource: '@bpmn-io/properties-panel/preact',
              runtime: 'automatic',
            },
          ],
        ],
      });
  },
});
