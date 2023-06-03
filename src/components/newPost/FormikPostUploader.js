import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Pressable,
    Platform
} from 'react-native';
import { Colors } from '../style';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { Divider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
// import { setGoogleApiKey } from 'expo-location';
import Constants from 'expo-constants';

import { firebase } from '../../../config/firebase';

// import * as Notifications from 'expo-notifications';

// import Mapbox from '@rnmapbox/maps';
// import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const { brand, primary } = Colors;

const PLACEHOLDER_IMG = 'https://www.brownweiraub.com/wp-content/uploads/2017/09/placeholder'

// Mapbox.setAccessToken(Constants.manifest?.extra?.mapBoxAccessToken);

// const mapboxClient = MapboxClient({ accessToken: Constants.manifest?.extra?.mapBoxAccessToken });

// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//     }),
// });

const FormikPostUploader = () => {

    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [mediaUrl, setMediaUrl] = useState([]);
    const [address, setAddress] = useState('');
    const [caption, setCaption] = useState('');
    const [region, setRegion] = useState(null);
    const [showMap, setShowMap] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [loading, setLoading] = useState(false);

    let isValid = true;
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    // useEffect(() => {
    //     const getCoordinates = async () => {
    //         const result = await geocodeAsync(address);
    //         if (result.length > 0) {
    //             const { latitude, longitude } = result[0];
    //             setRegion({
    //                 latitude,
    //                 longitude,
    //                 latitudeDelta: 0.0922,
    //                 longitudeDelta: 0.0421,
    //             });
    //         }
    //     };
    //     getCoordinates();
    // }, [address]);

    // useEffect(() => {
    //     registerForPushNotificationsAsync();
    // }, []);

    // async function registerForPushNotificationsAsync() {
    //     let token;

    //     if (Platform.OS === 'android') {
    //         await Notifications.setNotificationChannelAsync('default', {
    //             name: 'default',
    //             importance: Notifications.AndroidImportance.MAX,
    //             vibrationPattern: [0, 250, 250, 250],
    //             lightColor: '#FF231F7C',
    //         });
    //     }

    //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
    //     let finalStatus = existingStatus;
    //     if (existingStatus !== 'granted') {
    //         const { status } = await Notifications.requestPermissionsAsync();
    //         finalStatus = status;
    //     }
    //     if (finalStatus !== 'granted') {
    //         alert('Failed to get push token for push notification!');
    //         return;
    //     }
    //     token = (await Notifications.getExpoPushTokenAsync()).data;
    //     firebase
    //         .database()
    //         .ref(`users/${firebase.auth().currentUser.uid}`)
    //         .update({
    //             expoPushToken: token,
    //         });
    //     console.log(token);

    // }


    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }
    const getThumbnailUri = async (mediaArray) => {
        if (mediaArray.length > 0) {
            if (mediaArray[0].type.includes('video')) {
                try {
                    const uri = mediaArray[0].uri;
                    setThumbnailUrl(uri);
                } catch (error) {
                    console.log(error);
                    return null;
                }
            } else {
                try {
                    const uri = mediaArray[0].uri;
                    setThumbnailUrl(uri);
                } catch (error) {
                    console.log(error);
                    return null;
                }
            }
        }
        return null;
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
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false || permissionResult.canAskAgain == false) {
            setThumbnailUrl(null);
            alert('Permission to access camera roll is required!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            orderedSelection: true,
            selectionLimit: true,
            //aspect: [4, 3],
            quality: 1,
        });

        if (result.canceled === true) {
            console.log('pickerResult is canceled');
            return;
        }

        if (!result.canceled) {
            const newMediaList = [];
            for (const item of result.assets) {
                const response = await fetch(item.uri);
                const blob = await response.blob();
                const type = blob.type;
                newMediaList.push({ type, uri: item.uri });
            }
            setMediaUrl(newMediaList);
            getThumbnailUri(newMediaList);
            bs.current.snapTo(1);
        }
    };

    const openCamera = async () => {
        // No permissions request is necessary for launching the image library
        if (!status.granted) {
            requestPermission()
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

            if (permissionResult.granted === false) {
                setThumbnailUrl(null);
                alert('Permission to access camera roll is required!');
                return;
            }
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const newMediaList = [];
            for (const item of result.assets) {
                const response = await fetch(item.uri);
                const blob = await response.blob();
                const type = blob.type;
                newMediaList.push({ type, uri: item.uri });
            }
            setMediaUrl(newMediaList);
            getThumbnailUri(newMediaList);
            bs.current.snapTo(1);
        }
    };

    const handleGeocode = async () => {
        try {
            const response = await geocodingService.forwardGeocode({
                query: address,
                countries: ['NG'],
                limit: 1,
            }).send();
            const result = response.body.features[0];
            setCoordinates(result.center);
        } catch (error) {
            console.log('Error geocoding address:', error);
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            handleMessage(errorMessage);
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        handleMessage(null);

        if (!caption || !address || !mediaUrl) {
            console.log(postData.address)
            setLoading(false);
            handleMessage('Fill all details');
            return;
        }
        try {

            const postRef = firebase.database().ref('posts').push();
            const postId = postRef.key;
            const postData = {
                caption: caption,
                address: address,
                mediaurl: mediaUrl,
                userid: firebase.auth().currentUser.uid,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            };
            await postRef.set(postData);


            // await firebase.firestore().collection('posts').add(postData)
            //     .catch((error) => {
            //         console.error('Error writing document: ', error);
            //         const errorCode = error.code;
            //         const errorMessage = error.message;
            //         console.log(errorCode, errorMessage);
            //         handleMessage(errorMessage);
            //         setLoading(false);
            //     });

            // Send a push notification to other users
            const otherUserTokens = [];
            const databaseRef = firebase.database().ref(`posts/${postId}/users`);
            const snapshot = await databaseRef.once('value');
            snapshot.forEach((childSnapshot) => {
                const token = childSnapshot.val().expoPushToken;
                if (token) {
                    otherUserTokens.push(token);
                }
            });

            const message = {
                to: otherUserTokens,
                sound: 'default',
                title: 'There is an emergency close by!',
                body: `Check out the emergency report by ${firebase.auth().currentUser.displayName}`,
                data: { postId: postId },
                _displayInForeground: true,
            };

            await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });

            alert('Post added successfully!');

            setLoading(false);
            navigation.navigate('home')
        }
        catch (error) {
            console.log(error);
            setLoading(false);
            handleMessage('Failed to add post. Please try again.');
        }
    }

    const bs = React.useRef(null);
    const fall = new Animated.Value(1);

    return (
        <View>
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

                <View style={{
                    margin: 20,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                        {thumbnailUrl ? (
                            <Image
                                source={{ uri: thumbnailUrl ? thumbnailUrl : PLACEHOLDER_IMG }}
                                style={{ width: 100, height: 100 }}
                            />
                        ) : (
                            <Image
                                source={require('../../../assets/img/new-post.jpg')}
                                style={{ width: 100, height: 100, opacity: 0.4 }}
                            />
                        )}
                    </TouchableOpacity>

                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <TextInput
                            style={{ color: 'black', fontSize: 16 }}
                            placeholder='Write a caption...'
                            placeholderTextColor='gray'
                            multiline={true}
                            onChangeText={(text) => setCaption(text)}
                            //onBlur={handleBlur('caption')}
                            value={caption}
                        />
                    </View>
                </View>
                <Divider width={0.2} orientation='vertical' />
                <View style={{ marginLeft: 12, marginBottom: 490 }}>
                    <TextInput
                        placeholder="Enter address"
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                        onFocus={() => setShowMap(true)}
                        onBlur={() => setShowMap(false)}
                        onSubmitEditing={(event) => handleGeocode(event.nativeEvent.text)}
                    />
                    {/* {showMap && (
                        <View style={styles.mapContainer}>
                            <Mapbox.MapView style={styles.map}>
                                {coordinates && (
                                    <Mapbox.Annotation id='pointAnnnotation' coordinates={coordinates}>
                                        <Mapbox.Callout title='Geocoded address' />
                                    </Mapbox.Annotation>
                                )}
                            </Mapbox.MapView>

                        </View>
                    )} */}

                    {!loading && (
                        <Pressable onPress={handleSubmit} style={styles.button} >
                            <Text style={{ color: 'white' }}>
                                Share
                            </Text>
                        </Pressable>
                    )}

                    {loading && (
                        <Pressable disabled={true} style={styles.button} >
                            <ActivityIndicator size={23} color={primary} />
                        </Pressable>

                    )}

                </View>

            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: brand,
        marginTop: 10
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    container: {
        flex: 1
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        elevation: 5,
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
        backgroundColor: brand,
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    mapContainer: {
        height: 300,
        width: 300
    },
    map: {
        flex: 1
    }
});
export default FormikPostUploader