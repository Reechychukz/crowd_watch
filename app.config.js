import * as dotenv from 'dotenv';
dotenv.config();

export default {
  "expo": {
    "name": "Crowd Watch",
    "slug": "crowd_watch",
    "scheme": "crowdwatch",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#000000"
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
        "foregroundImage": "./assets/icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.reechychukz.crowdwatch",
      "googleServicesFile": "./google-services.json",
      "permissions": [],
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "https",
              "host": "*.myapp.io",
              "pathPrefix": "/records"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
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
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow Crowd Watch access your location."
        }
      ]
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
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      "eas": {
        "projectId": "ae7a9e9c-32bb-43a9-96cc-da9c8c3bb1cc"
      }
    },
  }
}
