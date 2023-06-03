import React from 'react';

import { Colors } from '../components/style';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Login from '../screens/Login';
import Signup from '../screens/SignUp';

const { primary, tertiary } = Colors;

const Stack = createNativeStackNavigator();

//Credentials context

import { CredentialsContext } from '../components/CredentialsContext';

const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            {({ storedCredentials }) => (
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: 'transparent'
                            },
                            headerTintColor: tertiary,
                            headerTransparent: true,
                            headerTitle: '',
                            headerLeftContainerStyle: {
                                paddingLeft: 20
                            }

                        }}
                        initialRouteName='Login'
                    >
                        {storedCredentials ?
                            <Stack.Screen options={{ headerTintColor: primary }} 
                            name="Signup" component={Signup} />
                            : <>
                                <Stack.Screen name="Login" component={Login} />
                                <Stack.Screen name="Signup" component={Signup} />
                            </>
                        }

                    </Stack.Navigator>
            )}
        </CredentialsContext.Consumer>

    )
}
export default RootStack;