import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Profile from '../screens/Profile';
import EditProfileScreen from '../screens/EditProfileScreen';

import { Colors } from '../components/style';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';

import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

const { tertiary } = Colors;

const Stack = createNativeStackNavigator();

const ProfileStack = ({ navigation }) => {
    const colors = useTheme();
    return (
        <Stack.Navigator
            initialRouteName='Profile'
        >
            <Stack.Screen
                name='Profile'
                component={Profile}


                options={{
                    headerLeft: () => (
                        <View style={{ paddingLeft: 15 }}>
                            <FontAwesome
                                name="navicon"
                                size={24}
                                backgroundColor='transparent'
                                color="black"
                                onPress={() => navigation.openDrawer()} />
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ marginRight: 15 }}>
                            <MaterialCommunityIcons
                                name='account-edit'
                                size={25}
                                backgroundColor='transparent'
                                color="black"
                                onPress={() => navigation.navigate('EditProfile')}
                            />
                        </View>
                    ),
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="EditProfile"
                options={{
                    title: 'Edit Profile',
                }}
                component={EditProfileScreen}
            />
        </Stack.Navigator>
    )
}

export default ProfileStack