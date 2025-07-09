const babelOptions = {
  presets: [
    ['@babel/preset-env', { loose: true }],
    '@babel/preset-react',
    '@babel/preset-flow',
    'babel-preset-gatsby',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-syntax-flow',
    '@babel/plugin-transform-modules-commonjs',
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
  ],
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require('babel-jest').createTransformer(babelOptions)
