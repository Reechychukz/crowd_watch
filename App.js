import React, { useEffect, useState } from 'react';

import RootStack from './src/navigators/RootStack';

import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';

import * as SplashScreen from 'expo-splash-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';

import "setimmediate";

import 'react-native-gesture-handler';

import { firebase } from './config/firebase';

import { CredentialsContext } from './src/components/CredentialsContext';
import DrawerStack from './src/navigators/DrawerStack';
import { NavigationContainer } from '@react-navigation/native';


function App() {
  const [initializing, setInitializing] = useState(true)
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");
  const [user, setUser] = useState()

  let [fontsLoaded] = useFonts({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf')
  })

  //Handle User state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // Keep the splash screen visible while we fetch resources
  //       await SplashScreen.preventAutoHideAsync();
  //       // Artificially delay for two seconds to simulate a slow loading
  //       // experience. Please remove this if you copy and paste the code!
  //       //await new Promise(resolve => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setAppReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);


  if (initializing) return null;

  if (!user) {
    return (
      <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
        <RootStack />
      </CredentialsContext.Provider>
    )
  }

  const checkLoginCredentials = () => {
    AsyncStorage
      .getItem('crowdWatchCredentials')
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          storedCredentials(null);
        }
      })
      .catch(error => console.log(error));
  }

  if (!appReady || !fontsLoaded) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => { setAppReady(true) }}
        onError={console.warn}
      />)
  }
  return (
    <CredentialsContext.Provider value={{ storedCredentials }}>
      <DrawerStack />
    </CredentialsContext.Provider>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}