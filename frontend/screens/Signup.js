import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { Component, useContext, useState } from "react";
import Button from "../components/Button";
import { UserContext } from "../context/userContext/context";

const Signup = () => {
  const { getUsers, createUser } = useContext(UserContext);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);
  return (
    <View style={styles.login}>
      <Text style={styles.heading}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(e) => setName(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(e) => setEmail(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        onChangeText={(e) => setPhoneNumber(e)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={(e) => setPassword(e)}
      />

      <View style={styles.buttonSection}>
        <Button
          style={styles.button}
          text="Register"
          onPress={() => {
            createUser(name, email, phoneNumber, password);
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
    minWidth: 280,
    alignSelf: "center",
  },
});

export default Signup;
