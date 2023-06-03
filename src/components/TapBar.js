import { View, Text, TouchableOpacity } from "react-native";

import React from 'react'
import { TapBarView } from "./style";
import KeyboardAvoidingWrapper from "./KeyboardAvoidingWrapper";

const TapBar = ({ state, descriptors, navigation }) => {
    return (
        <KeyboardAvoidingWrapper>
            <TapBarView>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tapBarLabel !== undefined
                            ? options.tapBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({ name: route.name, merge: true });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key
                        });
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tapBarAccessibilityLabel}
                            testID={options.tapBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1 }}
                        >
                            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </TapBarView>
        </KeyboardAvoidingWrapper>
    );
}

export default TapBar