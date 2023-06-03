import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,
    Image,
    Button
} from 'react-native';

import { useTheme } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import { firebase } from '../../config/firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';

const DEFAULT_IMG = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIAAgAMBIgACEQEDEQH/xAAbAAEAAwADAQAAAAAAAAAAAAAABAUGAQIDB//EADcQAAICAQEFBAULBQAAAAAAAAABAgMEEQUGITFREhMiQTJCcYGhFiNSVGGCkZKx0fEVJDNi4f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+4AAAAAAAAAjZudRhx1tl4nyjHmyos3gtbfdUQS8u09QNADP17wWprvaItefZehbYOdRmxbql4lzi+aAlAAAAAAAAAAAAAB45mRHFxrLpcorgur6HsUu8tjVVNafpScn7v5Ao77p32ytsl2pSfFnmAVA703WUWxsql2Zx5M6ADaYeRHKxoXR9ZcV0fQ9il3Zsbpuqb9GSkvf/BdEUAAAAAAAAAAAot54v+3l5eJfoXpB2xivKwZxgtZx8UQMmACoAAC93Yi9MiXlrFfqXpB2PivFwoRmtJz8Ul9pOIoAAAAAAAAAAAOG0lq+CXNkG/a+HS9O87cukFr8eQETamxnbOV2J2VJ8ZVt6Jvqilsxcip6WUWR+6Xct4aU/DRY19rSOvyhr+rz/MgKavEyLXpXRY/uvQutmbGdU1dl6OS4xhzS9px8oa/q8/zI7R3hqb449iX2NAXIIFG2MO56d4630sWnx5E5NNap6rqgOQAAAAAAACNnZtWFV27Hq36MVzkyQ2km3yXMx2flTy8mdkm9NdIrogO+btDIzJfOS7MPKEeS/ciAFQAAAAACVh59+HL5qWsPOD5MigDX7Pzqs6vtQ4SXpQfNEsxeHkzxMiF0NfDzXVdDZwkpxjKL1TWqIrkAAAABF2pZ3Wz75efY0Xv4GPNRvBLTZskvWnFGXAAAqAAAAAAAABrtkz7zZ2PL/XT8OBkTUbvy12cl0nJEVZAAAAAK3eCLls6TXqzTZlzcW1wtrlXYtYyWjRnM7Yt9DcsdO2vyS9JfuBVA5acZOLTTXNM4KgAAAAAAAAafd+Ljs5a+tJtFRgbKvypKU066vOTXF+xGnoqhTVGutaQitEiK7gAAAAAAA8r8ajIWl1UJ+1EC3YWJN6w7yv2S1XxLQAUU93voZPulD/p5Pd/I8rqn+JogBnP6Bk+dtPxO8d3rfWyIL2RbNAAKevd+hf5LrJexJE7H2fiY+jrpj2vpS4slAAAAAAA//9k=';

const EditProfileScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [image, setImage] = useState(null);

    const [userInfo, setUserInfo] = useState({
        firstName: 'firstname',
        lastName: 'lastname',
        userName: 'username',
        state: 'state',
        imageUrl: DEFAULT_IMG,
        country: 'country',
        phoneNumber: 'phone no.',
        emailAddress: 'email',
        upvotes: '1,452',
        downVotes: '55',
        rating: '96%'
    });

    useEffect(() => {
        getUser()
            .then(user => JSON.parse(user))
            .then(user => {
                setUserInfo({
                    firstName: user.firstname,
                    lastName: user.lastname,
                    userName: user.username,
                    state: user.state,
                    country: user.country,
                    imageUrl: user.image,
                    phoneNumber: '+234 810 310 2363',
                    emailAddress: user.email,
                    upvotes: '1,452',
                    downVotes: '55',
                    rating: '96%'
                })
            })
    }, []);

    const getUser = async () => {
        console.log(1)
        try {
            const user = await AsyncStorage.getItem('user');
            return user;
        }
        catch (error) {
            console.log(error);
        }
    }

    const updateUser = async () => {
        try {
            const user = firebase.auth().currentUser;

            const userRef = firebase.firestore().collection('users').doc(`${user.uid}`);

            await userRef.set({
                firstname: userInfo.firstName,
                lastname: userInfo.lastName,
                username: userInfo.userName,
                image: image
            }, { merge: true })
                .then(async () => {
                    await AsyncStorage.setItem('user', JSON.stringify(userRef));
                    
                }).finally(() => navigation.navigate('Profile'));

        }
        catch (error) {
            console.log(error);
            return;
        }
    }


    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose your profile picture</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={() => openCamera()}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={() => pickImage()}>
                <Text style={styles.panelButtonTitle}>Choose from Library</Text>
                {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle}></View>
            </View>
        </View>
    )

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            //aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.uri);
            bs.current.snapTo(1);
        }
    };

    const openCamera = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.uri);
        }
    };


    const bs = React.useRef(null);
    const fall = new Animated.Value(1);
    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bs}
                snapPoints={[330, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
            />
            <Animated.View style={{
                margin: 20,
                opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
            }}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                        <View style={{
                            height: 100,
                            width: 100,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ImageBackground
                                source={{
                                    uri: userInfo.imageUrl
                                }}
                                style={{ height: 100, width: 100 }}
                                imageStyle={{ borderRadius: 15 }}
                            >
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon name='camera' size={35} color='#fff' style={{
                                        opacity: 0.7,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        borderRadius: 10
                                    }} />
                                </View>

                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
                        @{userInfo.userName}
                    </Text>
                </View>

                <View style={styles.action}>
                    <FontAwesome name='user-o' color={colors.text} size={20} />
                    <TextInput
                        placeholder='First Name'
                        placeholderTextColor='#666666'
                        value={userInfo.firstName}
                        onChangeText={(firstName) => setUserInfo({ ...userInfo, firstName })}
                        autoCorrect={false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name='user-o' color={colors.text} size={20} />
                    <TextInput
                        placeholder='Last Name'
                        placeholderTextColor='#666666'
                        value={userInfo.lastName}
                        onChangeText={(lastName) => setUserInfo({ ...userInfo, lastName })}
                        autoCorrect={false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name='user-o' color={colors.text} size={20} />
                    <TextInput
                        placeholder='Username'
                        placeholderTextColor='#666666'
                        value={userInfo.userName}
                        onChangeText={(userName) => setUserInfo({ ...userInfo, userName })}
                        autoCorrect={false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                    />
                </View>
                <View style={styles.action}>
                </View>
                <TouchableOpacity style={styles.commandButton} onPress={updateUser}>
                    <Text style={styles.panelButton}>Submit</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};



export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commandButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        // marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
});