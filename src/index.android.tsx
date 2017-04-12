import React, { Component } from "react";
import {TextStyle, ViewStyle, View, Text, StyleSheet } from "react-native";

import RootContainer from "./components/RootContainer/index";

interface Props {

}

interface State {

}

export default class App extends Component<Props, State> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Shake or press menu button for dev menu
                </Text>

                <RootContainer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    } as ViewStyle,

    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    } as TextStyle,

    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    } as TextStyle,

    RootContainer: {
        marginVertical: 15,
    } as ViewStyle,
});
