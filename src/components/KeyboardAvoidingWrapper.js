import React from 'react';

//Keyboard Avoiding View
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const KeyboardAvoidingWrapper = ({ children }) => {
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={height * 0.1} style={{ flex: 1 }}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default KeyboardAvoidingWrapper;