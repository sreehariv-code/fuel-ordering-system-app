import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import Profilebtn from "../Profilebtn";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.welcomeContainer}>
      <Profilebtn navigation={navigation} />
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>Welcome, User</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingTop: 10,
  },
  usernameContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 18,
  },
  username: {
    fontFamily: "IBMPlexSans-Bold",
    fontWeight: "bold",
    fontSize: 20,
  },
});
export default Welcome;
