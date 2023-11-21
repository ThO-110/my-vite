import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { themePreprocessorPlugin } from '@zougt/vite-plugin-theme-preprocessor'
// import { viteThemePlugin } from "@kirklin/vite-plugin-vben-theme";
import legacyPlugin from '@vitejs/plugin-legacy'
import Markdown from 'vite-plugin-md'
// import { nodePolyfills } from "vite-plugin-node-polyfills";
import eslintPlugin from 'vite-plugin-eslint'

import { modifyVars } from './src/utils/theme/themeUtil'

const root = process.cwd()
const pathResolve = (pathname: string) => resolve(root, '.', pathname)

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    vueJsx(),
    Markdown(),
    // 兼容低版本浏览器
    legacyPlugin({
      targets: ['defaults', 'not IE 11']
    }),
    // // 暗黑主题
    // viteThemePlugin({
    //   fileName: "css/theme-colors-[contenthash:8].css",
    //   colorVariables: getThemeColors(),
    // }),
    // // 引入node环境
    // nodePolyfills({
    //   protocolImports: true,
    //   exclude: ["module", "child_process", "dns", "fs"],
    // }),
    themePreprocessorPlugin({
      less: {
        // 是否启用任意主题色模式
        arbitraryMode: false,
        // 提供多组变量文件
        multipleScopeVars: [
          {
            scopeName: 'theme-default',
            path: resolve('src/styles/theme/default.less')
          },
          {
            scopeName: 'theme-dark',
            path: resolve('src/styles/theme/dark.less')
          }
        ],
        // css中不是由主题色变量生成的颜色，也让它抽取到主题css内，可以提高权重
        includeStyleWithColors: [
          // {
          // color: "#ffffff",
          // 此类颜色的是否跟随主题色梯度变化，默认false
          // inGradient: true,
          // },
        ],
        // 默认取 multipleScopeVars[0].scopeName
        defaultScopeName: '',
        // 在生产模式是否抽取独立的主题css文件，extract为true以下属性有效
        extract: false,
        // 独立主题css文件的输出路径，默认取 viteConfig.build.assetsDir 相对于 (viteConfig.build.outDir)
        outputDir: '',
        // 会选取defaultScopeName对应的主题css文件在html添加link
        themeLinkTagId: 'theme-link-tag',
        // "head"||"head-prepend" || "body" ||"body-prepend"
        themeLinkTagInjectTo: 'head',
        // 是否对抽取的css文件内对应scopeName的权重类名移除
        removeCssScopeName: false,
        // 可以自定义css文件名称的函数
        customThemeCssFileName: (scopeName) => scopeName
      }
    }),
    eslintPlugin()
  ],
  resolve: {
    /** 定义全局别名 */
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
      },
      // @/xxxx => src/xxxx
      {
        find: /^@\//,
        replacement: pathResolve('src') + '/'
      },
      // /#/xxxx => types/xxxx
      {
        find: /^api\//,
        replacement: pathResolve('src/api') + '/'
      },
      // #/xxxx => types/xxxx
      {
        find: /^types\//,
        replacement: pathResolve('src/types') + '/'
      },
      // #/xxxx => utils/xxxx
      {
        find: /^utils\//,
        replacement: pathResolve('src/utils') + '/'
      },
      // #/xxxx => components/xxxx
      {
        find: /^components\//,
        replacement: pathResolve('src/components') + '/'
      },
      {
        find: /^~/,
        replacement: ''
      }
    ]
  },
  define: {
    // TODO: 临时解决 vite-plugin-theme 缺省定义以下常量问题
    __COLOR_PLUGIN_OUTPUT_FILE_NAME__: undefined,
    __PROD__: true,
    __COLOR_PLUGIN_OPTIONS__: {}
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: modifyVars(),
        javascriptEnabled: true
      }
    }
  },
  // optimizeDeps: {
  //   include: [],
  // },
  assetsInclude: ['**/*.md']
})
