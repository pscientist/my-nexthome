module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      // NativeWind v4 usually works without this, but adding it avoids edge cases:
      // 'nativewind/babel',
    ],
  };
};
