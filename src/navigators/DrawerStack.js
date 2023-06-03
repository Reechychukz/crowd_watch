import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import 'react-native-gesture-handler';

import TabStack from './TabStack';
import { DrawerContent } from '../screens/DrawerContent';

const Drawer = createDrawerNavigator();


const DrawerStack = () => {
  return (
    //<NavigationContainer>
      <Drawer.Navigator
        screenOptions={{ headerShown: false }} drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name='DrawerStack' component={TabStack} />
      </Drawer.Navigator>
    //</NavigationContainer>
  )
}

export default DrawerStack