import React, {Component} from "react";
import {ViewStyle, View, Text, StyleSheet} from "react-native";

import RootContainer from "./components/RootContainer/index";

export default class App extends Component<{}, {}> {
  render() {
    return (
      <View style={styles.container}>
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
  } as ViewStyle
});
