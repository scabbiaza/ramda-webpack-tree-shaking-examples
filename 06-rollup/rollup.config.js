import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

var env = process.env.NODE_ENV

var config = {
  input: './src/index.js',
  output: {
  	file: './dist/index.js',
    format: 'umd',
    name: 'RollupExample',
    exports: 'named',
  },
  plugins: [
    nodeResolve(),
  ],
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    })
  )
}

export default config
