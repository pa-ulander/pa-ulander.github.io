const babelOptions = {
  presets: [
    '@babel/env',
    '@babel/react',
    '@babel/preset-flow',
    'babel-preset-gatsby',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-syntax-flow',
    '@babel/plugin-transform-modules-commonjs',
  ],
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require('babel-jest').createTransformer(babelOptions)
