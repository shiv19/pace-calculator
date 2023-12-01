import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.PaceCalc',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--nolazy --expose_gc',
    maxLogcatObjectSize: 2048,
    markingMode: 'none'
  },
  discardUncaughtJsExceptions: true,
} as NativeScriptConfig;