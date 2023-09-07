import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.cjs',
    format: 'cjs',
  },
  plugins: [
    // 压缩代码
    terser(),
    // 识别和处理依赖项
    nodeResolve(),
    commonjs(),
    json(),
  ],
};
