import React from 'react';
import { Image, SafeAreaView, Text, View, Dimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import KeyboardAvoidingWrapper from './KeyboardAvoidingWrapper';

const { width, height } = Dimensions.get('window');

const Comments = () => {

    const DPImg = 'https://img.freepik.com/free-vector/flat-design-autumnal-background_52683-43406.jpg';

    const Comments = [
        {
            userDP: DPImg,
            userName: 'jondoe',
            comment: 'Thanks for the update',
        },
        {
            userDP: DPImg,
            userName: 'malik750',
            comment: "Wow... That's so sad",
        },
    ]

    return (
        <SafeAreaView style={{}}>
            <View style={{ flex: 1 }}>
                <Divider />
                {Comments.map((data, index) => {
                    return (
                        <View key={index} style={{
                            paddingBottom: 10,
                        }}>
                            <View style={
                                {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: 10
                                }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>

                                    <Image source={{ uri: data.userDP }}
                                        style={
                                            {
                                                width: 40,
                                                height: 40,
                                                borderRadius: 100
                                            }
                                        } />
                                    <View>
                                        <Text style=
                                            {
                                                {
                                                    fontSize: 15,
                                                    fontWeight: 'bold',
                                                    marginLeft: 10
                                                }
                                            }>
                                            {data.userName}
                                        </Text>
                                        <Text style=
                                            {
                                                {
                                                    fontSize: 15,
                                                    fontWeight: 'normal',
                                                    marginLeft: 10,
                                                    maxWidth: width * 0.8
                                                }
                                            }>
                                            {data.comment}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
        </SafeAreaView>
    )
}

export default Comments