import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { Component, useContext, useState } from "react";
import Button from "../components/Button";
import { UserContext } from "../context/userContext/context";

const Login = ({ navigation }) => {
  const { loginUser, token } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.login}>
      <Text style={styles.heading}>Sign In</Text>
      <TextInput
        onChangeText={(e) => setEmail(e)}
        style={styles.input}
        placeholder="Username"
        keyboardType="email-address"
      />
      <TextInput
        onChangeText={(e) => setPassword(e)}
        textContentType="password"
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
      />
      <View style={styles.buttonSection}>
        <Button
          style={styles.button}
          text="Login"
          onPress={() => {
            loginUser(email, password);
          }}
        />
        <Button
          style={styles.button}
          text="Register"
          onPress={() => {
            navigation.push("Signup");
          }}
        />
      </View>
    </View>
  );
};

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
    flex: 0.1,
    // backgroundColor: "red",
    minWidth: 280,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Login;
