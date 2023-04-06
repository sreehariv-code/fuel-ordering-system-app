import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { Component, useState } from "react";
// import { TextInput } from "react-native-web";
import Button from "../components/Button";

export class Login extends Component {
  render() {
    return (
      <View style={styles.login}>
        <Text style={styles.heading}>Sign In</Text>
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Password" />
        <View style={styles.buttonSection}>
          <Button style={styles.button} text="Login" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    minWidth: 375,
    justifyContent: "center",

    // backgroundColor: "red",
  },
  heading: {
    textAlign: "center",
    fontFamily: "unbound-bold",
    fontSize: 40,
    color: "#003",
    marginVertical: 32,
  },
  input: {
    minWidth: 280,
    alignSelf: "center",
    padding: 11,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    marginVertical: 13,
  },
  buttonSection: {
    minWidth: 280,
    alignSelf: "center",
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "red",
  },
});

export default Login;
