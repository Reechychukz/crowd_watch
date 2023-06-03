import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TapBar from '../components/TapBar';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

const TabStack = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            headerShown='true'

            tapBar={props => <TapBar {...props} />}>
            <Tab.Screen
                name='Home'
                component={HomeStack}
                options={{
                    headerShown: false,
                    headerShadowVisible: false,
                    tabBarLabel: 'Home',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    )
                }} />

            <Tab.Screen
                name='ProfileStack'
                component={ProfileStack}
                options={{
                    headerShown: false,
                    headerShadowVisible: false,
                    tabBarShowLabel: false,
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default TabStack;