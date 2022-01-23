const { nodeResolve } = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');

export default {
  external: ['co-body', 'formidable', 'type-is'],
  input: './src/index.ts',
  output: {
    file: './build/index.js',
    format: 'cjs',
    exports: 'auto',
  },
  plugins: [typescript({ composite: false }), nodeResolve()],
  watch: {
    include: 'src/**',
    clearScreen: false,
  },
};
