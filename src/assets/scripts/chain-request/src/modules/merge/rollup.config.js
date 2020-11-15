import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: 'index.js',
  output: {
    name: 'merge',
    file: 'dist/index.js',
    format: 'umd',
  },
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          "@babel/preset-env",
          {
            useBuiltIns: 'usage'
          }
        ]
      ]
    })
  ],
};