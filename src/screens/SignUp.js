import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import { Picker } from "@react-native-picker/picker";

import { firebase } from '../../config/firebase'

//icons
import { Octicons, Ionicons, Fontisto, AntDesign } from '@expo/vector-icons';

//Keyboard Avoiding View
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from "../components/style";

import AsyncStorage from "@react-native-async-storage/async-storage";

//Colors(
const { brand, darkLight, primary, secondary } = Colors;

const Signup = ({ navigation }) => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const defaultSelectedCountry = countries[0] || { label: "", value: "" };
    const [selectedCountry, setSelectedCountry] = useState(defaultSelectedCountry);
    const [selectedState, setSelectedState] = useState('');

    const [loading, setLoading] = useState(false);

    const [hidePassword, setHidePassword] = useState(true);

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();


    useEffect(() => {
        fetch('https://geo-info.herokuapp.com/v1/countries')
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.error(error));
    }, []);


    const handleCountryChange = (countryValue, countryIndex) => {
        const countryLabel = countries[countryIndex].label;
        setSelectedCountry({ label: countryLabel, value: countryValue });
        console.log(selectedCountry.value)
        console.log(selectedState)
        fetch(`https://geo-info.herokuapp.com/v1/countries/${countryValue}/states/`)
            .then((response) => {
                console.log(response)
                if (response.status === 404) {
                    throw new Error('Resource not found');
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json()
            })
            .then(data => setStates(data))
            .catch(error => console.error(error));
    };


    const handleSignup = async () => {
        setLoading(true);
        handleMessage(null);

        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    firebase.firestore().collection('users')
                        .doc(user.uid)
                        .set({
                            email: email,
                            username: userName,
                            country: selectedCountry.value,
                            state: selectedState
                        })
                        .then(async () => {
                            const userRef = firebase.firestore().collection('users').doc(user.uid);
                            const userDoc = await userRef.get();
                            const userObj = userDoc.data();
                            await AsyncStorage.setItem('user', JSON.stringify(userObj));
                            console.log('Document successfully written!');
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.error('Error writing document: ', error);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    handleMessage(errorMessage);
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);

            handleMessage(error.message);
        }
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle>Crowd Watch</PageTitle>
                    <SubTitle>User Account Signup</SubTitle>

                    <StyledFormArea>
                        <MyTextInput
                            label="Email Address"
                            icon="mail"
                            placeholder="johndoe@mail.com"
                            placeholderTextColor={darkLight}
                            onChangeText={setEmail}
                            value={email}
                            keyboardType="email-address"
                        />

                        <MyTextInput
                            label="Username"
                            icon="person"
                            placeholder="johndoe123"
                            placeholderTextColor={darkLight}
                            onChangeText={setUserName}
                            value={userName}
                        />

                        <View>
                            <LeftIcon>
                                <Octicons name='globe' size={30} color={brand} />
                            </LeftIcon>
                            <StyledInputLabel>Country</StyledInputLabel>
                            <Picker
                                style={styles.dropdown}
                                selectedValue={selectedCountry.value}
                                onValueChange={handleCountryChange}
                                mode="dropdown"
                            >
                                <Picker.Item label="         Select a country" value="" style={{ color: darkLight }} />
                                {countries.map((country, index) => (
                                    <Picker.Item key={index} label={country.name} value={country.short} />
                                ))}
                            </Picker>
                        </View>

                        <View>
                            <LeftIcon>
                                <Octicons name='globe' size={30} color={brand} />
                            </LeftIcon>
                            <StyledInputLabel>State</StyledInputLabel>
                            <Picker
                                style={styles.dropdown}
                                selectedValue={selectedState}
                                onValueChange={(itemValue) => {
                                    setSelectedState(itemValue)
                                    console.log(selectedCountry.label)
                                }}
                                mode="dropdown"
                            >
                                <Picker.Item label="         Select a state" value="" style={{ color: darkLight }} />

                                {states?.map((state, index) => (
                                    <Picker.Item key={index} label={state.name} value={state.name} />
                                ))}
                            </Picker>
                        </View>

                        <MyTextInput
                            label="Password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />

                        <MyTextInput
                            label="Confirm Password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <MsgBox type={messageType}>{message}</MsgBox>

                        {!loading && (
                            <StyledButton onPress={handleSignup}>
                                <ButtonText>Sign up</ButtonText>
                            </StyledButton>
                        )}

                        {loading && (
                            <StyledButton disabled={true}>
                                <ActivityIndicator size="large" color={primary} />
                            </StyledButton>
                        )}

                        <Line />
                        <StyledButton google={true} onPress={handleSignup}>
                            <Fontisto name="google" color={primary} size={25} />
                            <ButtonText google={true}>Sign in with Google</ButtonText>
                        </StyledButton>
                        <ExtraView>
                            <ExtraText>Already have an account? </ExtraText>
                            <TextLink onPress={() => navigation.navigate('Login')}>
                                <TextLinkContent>Login</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    )
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    dropdown: {
        backgroundColor: secondary,
        padding: 15,
        paddingLeft: 55,
        paddingRight: 15,
        borderRadius: 5,
        height: 60,
        marginVertical: 3,
        marginBottom: 10
    },
    icon: {
        right: '15px',
        top: '38px',
        position: 'absolute',
        zIndex: 1
    },
    label: {
        position: 'absolute',
        backgroundColor: secondary,
        left: 22,
        top: 8,
        zIndex: 100,
        paddingHorizontal: 8,
        fontSize: 14,
        placeholderTextColor: "#9CA3AF"
    },
    placeholderStyle: {
        fontSize: 16,
        color: "#9CA3AF",
        placeholderTextColor: "#9CA3AF"
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default Signup;