import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import color from "../config/color";
import Ionicons from "@expo/vector-icons/Ionicons";

const Statusbar = ({ heading, condition }) => {
  let component = null;
  if (condition == "1") {
    component = (
      <Ionicons
        
        name="arrow-back-circle-outline"
        size={40}
        color={color.secondary}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>{heading}</Text>
      <TouchableOpacity style={styles.iconstyle}>{component}</TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.primary,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  Heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: color.secondary,
  },
  iconstyle: {
    position: "absolute",
    left: 10,
  },
});

export default Statusbar;
