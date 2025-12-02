const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Prevent deep folder traversal
config.projectRoot = __dirname;

// Only watch the project folder (disable symlink traversal)
config.watchFolders = [__dirname];


// ✅ Enable require.context for Expo Router
config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
  // ✅ Add support for react-native-svg-transformer
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

// ✅ Extend resolver to handle SVGs correctly
config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
};

// Disable global hotkeys (fixes Windows-specific Metro bugs)
config.server = {
  ...config.server,
  useGlobalHotkey: false,
  rewriteRequestUrl: (url) => url,
};

// Reset Metro cache each run (prevents stale file errors)
config.resetCache = true;

// Normalize Windows backslashes → POSIX slashes
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (typeof moduleName === 'string') {
    moduleName = moduleName.replace(/\\/g, '/');
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
