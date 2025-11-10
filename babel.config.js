module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
          },
        },
      ],
      [
        '@tamagui/babel-plugin',
        {
          components: ['@tamagui/core'],
          config: './tamagui.config.ts',
        },
      ],
    ],
  };
};
