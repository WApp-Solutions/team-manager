import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.wappsolutions.teammanager",
  appName: "team-manager",
  bundledWebRuntime: false,
  webDir: "build",
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  },
  cordova: {}
}

export default config;