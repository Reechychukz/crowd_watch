const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
console.log(__dirname);
defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;
