import React, { useState } from 'react'
import Comments from '../components/Comments'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Keyboard
} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const CommentSreen = () => {
    const [comment, setComment] = useState('');

    const SubmitComment = (comment) => {
        return
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height: '100%', flex: 1 }}>
                <StatusBar backgroundColor='white' barStyle='dark-content' animated={true} />
                <ScrollView
                    style={{ flex: 1 }}>
                    <Comments />
                </ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={height * 0.1}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.commentInput}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='Add a comment'
                                    multiline
                                    value={comment}
                                    onChangeText={setComment}
                                />
                            </View>
                            <Ionicons name='ios-send-outline' size={25} onPress={() => { SubmitComment(comment) }} />
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    inputContainer: {
        backgroundColor: '',
        borderRadius: 5,
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        width: width * 0.8
    },
    commentInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 'auto',
        width: width * 1,
    },
    textInput: {
        width: '100%',
        fontSize: 20,
        opacity: 0.5
    }
})
export default CommentSreen