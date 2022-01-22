const typescript = require('@rollup/plugin-typescript');

export default {
  external: ['koa'],
  input: './src/index.ts',
  output: {
    file: './build/index.js',
    format: 'cjs',
    exports: 'auto',
  },
  plugins: [typescript({ composite: false })],
  watch: {
    include: 'src/**',
    clearScreen: false,
  },
};
