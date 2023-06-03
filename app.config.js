import 'dotenv/config';

export default {
  "expo": {
    "name": "crowd_watch",
    "slug": "crowd_watch",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.reechychukz.crowdwatch"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.reechychukz.crowdwatch",
      "googleServicesFile": "./google-services.json"
    },
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "Allow Crowd Watch to access your photos",
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
          "microphonePermission": "Allow Crowd Watch to access your microphone"
        }
      ],
      [
        "expo-media-library",
        {
          "photosPermission": "Allow Crowd Watch to access your photos.",
          "savePhotosPermission": "Allow Crowd Watch to save photos.",
          "isAccessMediaLocationEnabled": true
        }
      ],
      // [
      //   "expo-notifications",
      //   {
      //     "icon": "./assets/img/icon.png",
      //     "color": "#ffffff",
      //   }
      // ]
    ],
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      mapBoxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
      "eas": {
        "projectId": "f9713af7-7f31-4727-96b7-49b4dcfc2f42"
      }
    },
  }
}
