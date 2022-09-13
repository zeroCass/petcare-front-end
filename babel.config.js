module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin',
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@src': './src',
        '@components':'./src/components',
        '@navigation': './src/navigation',
        '@context': './src/context',
        '@screens': './src/screens'
      }
    }]
  ]
};
