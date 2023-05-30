import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import color from "../config/color";

const DriverBox = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.firstc}>
        <Image
          source={{ uri: "https://source.unsplash.com/featured/100x103" }}
          style={styles.profileimg}
        />
        <Text style={styles.data}>Name</Text>
      </View>
      <View style={styles.secondc}>
        <Text>Phone :</Text>
        <Text>Email :</Text>
        <Text>Status :</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.secondary,
    height: 140,
    margin: 15,
    borderRadius: 15,
    flexDirection: "row",
    
  },
  firstc: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  profileimg: {
    height: 75,
    width: 75,
    borderRadius: 100,
    margin: 8,
  },
  secondc: {
    justifyContent: "center",
    width: "50%",
    marginLeft: 10,
  },
  line: {
    backgroundColor: color.primary,
    width: "0.5%",
    height: "75%",
    position: "absolute",
    left: "49%",
    top: "12%",
  },
});

export default DriverBox;
