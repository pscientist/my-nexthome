const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const { withTamagui } = require('@tamagui/metro-plugin');

const config = getDefaultConfig(__dirname);

// Apply NativeWind first, then Tamagui
const configWithNativeWind = withNativeWind(config, { input: './global.css' });
module.exports = withTamagui(configWithNativeWind, {
    components: ['@tamagui/core'],
    config: './tamagui.config.ts',
});
